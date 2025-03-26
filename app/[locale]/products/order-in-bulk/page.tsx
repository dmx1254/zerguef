"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  Loader2,
  Package,
  Building2,
  CreditCard,
  Globe,
  MapPin,
  User,
  Mail,
  Phone,
  Building,
  Map,
  Wallet,
  AlertCircle,
  Info,
} from "lucide-react";
import { useScopedI18n } from "@/locales/client";



const countries = [
  { value: "morocco", label: "Maroc" },
  { value: "algeria", label: "Algérie" },
  { value: "tunisia", label: "Tunisie" },
  { value: "egypt", label: "Égypte" },
  { value: "uae", label: "Émirats Arabes Unis" },
];

const paymentMethods = [
  { value: "cih", label: "CIH" },
  { value: "attijariwafabank", label: "Attijariwafabank" },
  { value: "bmce", label: "BMCE" },
  { value: "bmci", label: "BMCI" },
  { value: "cdm", label: "CDM" },
  { value: "chaabi", label: "Chaabi" },
  { value: "sgmb", label: "SGMB" },
  { value: "barid", label: "Barid Bank" },
  { value: "emirates", label: "Virement Emirates" },
  { value: "credit", label: "Carte de crédit" },
  { value: "paypal", label: "PayPal" },
];

const products = [
  { value: "mikhwar", label: "Mikhwar" },
  { value: "perfumes", label: "Parfums" },
  { value: "accessories", label: "Accessoires" },
  { value: "abayas", label: "Abayas" },
  { value: "scarves", label: "Écharpes" },
];

export default function OrderInBulk() {
  const tScope = useScopedI18n("bulkOrder");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => setFiles(acceptedFiles),
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 5,
  });

  const formSchema = z.object({
    fullName: z.string().min(2, tScope("fullName.min")),
    companyName: z.string().optional(),
    email: z.string().email(tScope("email.invalid")),
    phone: z
      .string()
      .min(10, tScope("phone.min")),
    country: z.string().min(1, tScope("country.required")),
    city: z.string().min(1, tScope("city.required")),
    paymentMethod: z
      .string()
      .min(1, tScope("paymentMethod.required")),
    products: z
      .array(z.string())
      .min(1, tScope("products.required")),
    quantity: z.string().min(1, tScope("quantity.required")),
    barcode: z.string().optional(),
    additionalProducts: z.string().optional(),
    totalQuantity: z.string(),
  });
  
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      paymentMethod: "",
      products: [],
      quantity: "",
      barcode: "",
      additionalProducts: "",
      totalQuantity: "0",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      const response = await fetch("/api/user/order-in-bulk", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Échec de la soumission de la commande");
      }

      toast.success("Commande soumise avec succès!", {
        style: {
          backgroundColor: "#16a34a",
          color: "#fff",
        },
      });
      form.reset();
      setFiles([]);
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error("Échec de la soumission. Veuillez réessayer.", {
        style: {
          backgroundColor: "#dc2626",
          color: "#fff",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Card */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white rounded-[6px]">
              <CardHeader className="bg-[#18191A] text-white border-b">
                <CardTitle className="text-2xl font-bold">
                  {tScope("formTitle")}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {tScope("formSubtitle")}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    {/* Customer Information Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-[#ca8a04]" />
                        <h3 className="text-xl font-semibold text-[#18191A]">
                          {tScope("customerInfo")}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{tScope("fullName")}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                  <Input
                                    placeholder={tScope("fullNamePlaceholder")}
                                    className="bg-white pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {tScope("companyName")}
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                  <Input
                                    placeholder={tScope("companyNamePlaceholder")}
                                    className="bg-white pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{tScope("email")}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                  <Input
                                    type="email"
                                    placeholder={tScope("emailPlaceholder")}
                                    className="bg-white pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{tScope("phone")}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                  <Input
                                    type="tel"
                                    placeholder={tScope("phonePlaceholder")}
                                    className="bg-white pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{tScope("country")}</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <SelectTrigger className="bg-white pl-10">
                                      <SelectValue placeholder={tScope("countryPlaceholder")} />
                                    </SelectTrigger>
                                  </div>
                                </FormControl>
                                <SelectContent>
                                  {countries.map((country) => (
                                    <SelectItem
                                      key={country.value}
                                      value={country.value}
                                    >
                                      {country.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{tScope("city")}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                  <Input
                                    placeholder={tScope("cityPlaceholder")}
                                    className="bg-white pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="paymentMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{tScope("paymentMethod")}</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <div className="relative">
                                    <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <SelectTrigger className="bg-white pl-10">
                                      <SelectValue placeholder={tScope("paymentMethodPlaceholder")} />
                                    </SelectTrigger>
                                  </div>
                                </FormControl>
                                <SelectContent>
                                  {paymentMethods.map((method) => (
                                    <SelectItem
                                      key={method.value}
                                      value={method.value}
                                    >
                                      {method.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Order Details Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-[#ca8a04]" />
                        <h3 className="text-xl font-semibold text-[#18191A]">
                          {tScope("orderDetails")}
                        </h3>
                      </div>
                      <FormField
                        control={form.control}
                        name="products"
                        render={() => (
                          <FormItem>
                            <FormLabel>{tScope("selectProducts")}</FormLabel>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {products.map((product) => (
                                <FormField
                                  key={product.value}
                                  control={form.control}
                                  name="products"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={product.value}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              product.value
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value || []),
                                                    product.value,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== product.value
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                          <FormLabel>{product.label}</FormLabel>
                                        </div>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{tScope("quantity")}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                  <Input
                                    type="number"
                                    placeholder={tScope("quantityPlaceholder")}
                                    className="bg-white pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="barcode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {tScope("barcode")}
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Info className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                  <Input
                                    placeholder={tScope("barcodePlaceholder")}
                                    className="bg-white pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="additionalProducts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {tScope("additionalProducts")}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={tScope("additionalProductsPlaceholder")}
                                className="bg-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <FormLabel>
                          {tScope("uploadImages")}
                        </FormLabel>
                        <div
                          {...getRootProps()}
                          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                            isDragActive
                              ? "border-[#ca8a04] bg-[#ca8a04]/10"
                              : "border-gray-300 hover:border-[#ca8a04]"
                          }`}
                        >
                          <input {...getInputProps()} />
                          <Upload className="mx-auto h-12 w-12 text-[#ca8a04]" />
                          <p className="mt-2 text-sm text-gray-600">
                            {isDragActive
                              ? tScope("uploadActive")
                              : tScope("uploadText")}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {tScope("uploadMaxFiles")}
                          </p>
                        </div>
                        {files.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-medium">
                              {tScope("selectedFiles")}
                            </p>
                            <ul className="mt-2 space-y-1">
                              {files.map((file, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-gray-600 flex items-center"
                                >
                                  <span className="mr-2">•</span>
                                  {file.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#ca8a04] hover:bg-[#ca8a04]/90 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {tScope("submitting")}
                        </>
                      ) : (
                        tScope("submitButton")
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Info Card */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-20 bg-white">
              <CardHeader className="bg-[#18191A] text-white border-b">
                <CardTitle className="text-xl font-bold">
                  {tScope("infoTitle")}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {tScope("infoSubtitle")}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#ca8a04]/10 rounded-full">
                    <AlertCircle className="h-6 w-6 text-[#ca8a04]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#18191A]">
                      {tScope("requiredDeposit")}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {tScope("depositInfo")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#ca8a04]/10 rounded-full">
                    <Package className="h-6 w-6 text-[#ca8a04]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#18191A]">
                      {tScope("wholesalePricing")}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {tScope("pricingInfo")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#ca8a04]/10 rounded-full">
                    <CreditCard className="h-6 w-6 text-[#ca8a04]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#18191A]">
                      {tScope("flexiblePayment")}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {tScope("paymentInfo")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#ca8a04]/10 rounded-full">
                    <Globe className="h-6 w-6 text-[#ca8a04]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#18191A]">
                      {tScope("worldwideShipping")}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {tScope("shippingInfo")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#ca8a04]/10 rounded-full">
                    <MapPin className="h-6 w-6 text-[#ca8a04]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#18191A]">
                      {tScope("localSupport")}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {tScope("supportInfo")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
