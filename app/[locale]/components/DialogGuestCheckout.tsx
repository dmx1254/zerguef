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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useScopedI18n } from "@/locales/client";
import { Loader } from "lucide-react";

export function DialogCheckout({
  open,
  setOpen,
  shippingRegion,
  setShippingRegion,
  onGuestCheckout,
  onLogin,
  isAuthenticated,
  isOrderLoading,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  shippingRegion: string;
  setShippingRegion: (val: string) => void;
  onGuestCheckout: (guestData: any) => void;
  onLogin: () => void;
  isAuthenticated: boolean;
  isOrderLoading: boolean;
}) {
  const tScope = useScopedI18n("cart");
  const tScope2 = useScopedI18n("signup");
  const [guestData, setGuestData] = useState({
    email: "",
    name: "",
    city: "",
    address: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGuestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingSave = () => {
    if (isAuthenticated) {
      // Si l'utilisateur est connecté, on sauvegarde juste la région
      setOpen(false);
    } else {
      // Si l'utilisateur n'est pas connecté, on procède avec les infos invité
      if (validateGuestData()) {
        onGuestCheckout({ ...guestData, shippingRegion });
      }
    }
  };

  const validateGuestData = () => {
    return (
      guestData.email &&
      guestData.name &&
      guestData.city &&
      guestData.address &&
      guestData.phone &&
      shippingRegion
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] bg-[#2a2d30] text-white/80 border-[#595a5a]">
        <DialogHeader>
          <DialogTitle>
            {isAuthenticated
              ? tScope("dialogTitle")
              : tScope("guestCheckoutTitle")}
          </DialogTitle>
          <DialogDescription className="text-white/80">
            {isAuthenticated
              ? tScope("dialogDesc")
              : tScope("guestCheckoutDesc")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          {/* Sélection de région de livraison */}
          <div className="space-y-2 text-white/80">
            <Label>{tScope("shippingRegion")}</Label>
            <RadioGroup
              value={shippingRegion}
              onValueChange={setShippingRegion}
              className="gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="casablanca"
                  id="casablanca"
                  className="border-white/60"
                />
                <Label htmlFor="casablanca" className="flex flex-col">
                  <span className="font-medium">{tScope("dialogCa")}</span>
                  <span className="text-sm">{tScope("dialogCaHours")}</span>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="hors-casablanca"
                  id="hors-casablanca"
                  className="border-white/60"
                />
                <Label htmlFor="hors-casablanca" className="flex flex-col">
                  <span className="font-medium">{tScope("dialogHorsCa")}</span>
                  <span className="text-sm">{tScope("dialogHorsCaHours")}</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Formulaire invité si non authentifié */}
          {!isAuthenticated && (
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{tScope("fullName")}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={guestData.name}
                    onChange={handleInputChange}
                    placeholder={tScope("fullName")}
                    required
                    className="bg-[#3a3b3b] text-white/80 border-[#595a5a]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{tScope2("email.label")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={guestData.email}
                    onChange={handleInputChange}
                    placeholder={tScope2("email.label")}
                    required
                    className="bg-[#3a3b3b] text-white/80 border-[#595a5a]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">{tScope2("address.label")}</Label>
                <Input
                  id="address"
                  name="address"
                  value={guestData.address}
                  onChange={handleInputChange}
                  required
                  placeholder={tScope2("address.label")}
                  className="bg-[#3a3b3b] text-white/80 border-[#595a5a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">{tScope2("city.label")}</Label>
                  <Input
                    id="city"
                    name="city"
                    value={guestData.city}
                    onChange={handleInputChange}
                    required
                    placeholder={tScope2("city.label")}
                    className="bg-[#3a3b3b] text-white/80 border-[#595a5a]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{tScope2("phone.label")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={guestData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder={tScope2("phone.label")}
                    className="bg-[#3a3b3b] text-white/80 border-[#595a5a]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {!isAuthenticated && (
            <Button
              variant="outline"
              onClick={onLogin}
              className="sm:order-first text-black"
            >
              {tScope("loginInstead")}
            </Button>
          )}
          <Button
            type="submit"
            onClick={handleShippingSave}
            disabled={
              !shippingRegion || (!isAuthenticated && !validateGuestData())
            }
            className="sm:ml-auto text-white"
          >
            {isAuthenticated ? (
              tScope("dialogBtn")
            ) : isOrderLoading ? (
              <Loader size={24} className="text-white animate-spin" />
            ) : (
              tScope("continueAsGuest")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
