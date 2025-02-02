"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [base64Image, setBase64Image] = useState<string>("");

  const categories = [
    "djellabas",
    "caftans",
    "gandouras",
    "mikhwar",
    "parfums",
    "or",
  ];
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

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
        // Créer une URL pour la prévisualisation
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        // Convertir l'image en base64
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
    const productData = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price") as string),
      image: base64Image, // Utiliser l'image en base64
      description: formData.get("description"),
      category: formData.get("category"),
      details: {
        material: formData.get("material"),
        origin: formData.get("origin"),
        care: formData.get("care"),
        sizes: selectedSizes,
      },
      discount: formData.get("discount")
        ? parseFloat(formData.get("discount") as string)
        : undefined,
      stock: parseInt(formData.get("stock") as string),
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du produit");
      }

      const res = await response.json();
      if (res) {
        toast.success("Produit ajouté avec succès !", {
          style: {
            color: "#22c55e",
          },
        });
      }

      // Réinitialiser le formulaire et les états
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de l'ajout du produit", {
        style: {
          color: "#ef4444",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Ajouter un nouveau produit</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name">Nom du produit</label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="price">Prix</label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Section image avec prévisualisation */}
            <div className="space-y-2">
              <label>Image du produit</label>
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
              <Textarea id="description" name="description" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="category">Catégorie</label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="capitalize"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="stock">Stock</label>
                <Input id="stock" name="stock" type="number" min="0" required />
              </div>
            </div>

            <div className="space-y-2">
              <label>Tailles disponibles</label>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant={
                      selectedSizes.includes(size) ? "default" : "outline"
                    }
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="material">Matériau</label>
                <Input id="material" name="material" />
              </div>
              <div className="space-y-2">
                <label htmlFor="origin">Origine</label>
                <Input id="origin" name="origin" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="care">Entretien</label>
                <Input id="care" name="care" />
              </div>
              <div className="space-y-2">
                <label htmlFor="discount">Remise (%)</label>
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !base64Image}
            >
              {isLoading ? "Ajout en cours..." : "Ajouter le produit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
