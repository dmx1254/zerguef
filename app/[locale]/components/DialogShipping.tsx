"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useScopedI18n } from "@/locales/client";

export function DialogShipping({
  open,
  setOpen,
  shippingRegion,
  setShippingRegion,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  shippingRegion: string;
  setShippingRegion: (val: string) => void;
}) {
  const tScope = useScopedI18n("cart");
  const handleSave = () => {
    // Ici vous pouvez ajouter la logique pour sauvegarder le mode de livraison
    console.log("Mode de livraison sélectionné:", shippingRegion);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{tScope("dialogTitle")}</DialogTitle>
          <DialogDescription>{tScope("dialogDesc")}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <RadioGroup
            value={shippingRegion}
            onValueChange={setShippingRegion}
            className="gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="casablanca" id="casablanca" />
              <Label htmlFor="casablanca" className="flex flex-col">
                <span className="font-medium">{tScope("dialogCa")}</span>
                <span className="text-sm text-muted-foreground">
                  {tScope("dialogCaHours")}
                </span>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hors-casablanca" id="hors-casablanca" />
              <Label htmlFor="hors-casablanca" className="flex flex-col">
                <span className="font-medium">{tScope("dialogHorsCa")}</span>
                <span className="text-sm text-muted-foreground">
                  {tScope("dialogHorsCaHours")}
                </span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleSave} disabled={!shippingRegion}>
            {tScope("dialogBtn")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
