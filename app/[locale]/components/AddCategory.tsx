"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";

const AddCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [base64Image, setBase64Image] = useState<string>("");

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        const base64 = await convertToBase64(file);
        setBase64Image(base64);
      } catch (error) {
        console.error("Erreur lors de la conversion de l'image:", error);
        toast.error("Erreur lors du chargement de l'image");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    const categoryData = {
      name: name,
      image: base64Image,
      description: formData.get("description"),
      slug: `${name.toLowerCase().replace(/\s+/g, "-")}`,
    };

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la catégorie");
      }

      const res = await response.json();
      if (res) {
        toast.success("Catégorie ajoutée avec succès !", {
          style: {
            color: "#22c55e",
          },
        });
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de l'ajout de la catégorie", {
        style: {
          color: "#ef4444",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Ajouter une nouvelle catégorie</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name">Nom de la catégorie</label>
              <Input id="name" name="name" required />
            </div>

            <div className="space-y-2">
              <label>Image de la catégorie</label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                  required
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Prévisualisation"
                        className="max-h-48 mx-auto rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Cliquez pour changer l'image
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <ImagePlus className="w-12 h-12 text-gray-400" />
                      <p className="mt-2">Cliquez pour ajouter une image</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                name="description"
                placeholder="Décrivez brièvement cette catégorie"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !base64Image}
            >
              {isLoading ? "Ajout en cours..." : "Ajouter la catégorie"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCategory;
