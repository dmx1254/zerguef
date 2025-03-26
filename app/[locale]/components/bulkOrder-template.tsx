import { getScopedI18n } from "@/locales/server";
import * as React from "react";

interface BulkOrderData {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  paymentMethod: string;
  products: string[];
  quantity: string;
  barcode?: string;
  additionalProducts?: string;
  fileUrls?: string[];
}

interface BulkOrderTemplateProps {
  data: BulkOrderData;
  isAdmin?: boolean;
}

export const BulkOrderTemplate = async ({
  data,
  isAdmin = false,
}: BulkOrderTemplateProps) => {
  const tScope = await getScopedI18n("bulkOrderEmail");
  const {
    fullName,
    companyName,
    email,
    phone,
    country,
    city,
    paymentMethod,
    products,
    quantity,
    barcode,
    additionalProducts,
    fileUrls,
  } = data;

  return (
    <div style={mainContainer}>
      <div style={container}>
        {/* Header */}
        <div style={header}>
          <div style={{ textAlign: "center" }}>
            <img
              src="https://zarguef.com/ibennewapp-logo.png"
              alt="Logo"
              style={{
                width: "100px",
                height: "70px",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
          <h1 style={headerTitle}>{tScope("title")}</h1>
          <p style={headerSubtitle}>
            {isAdmin
              ? "Une nouvelle commande en gros a été reçue"
              : tScope("greeting")}
          </p>
        </div>

        {/* Main Content */}
        <div style={content}>
          {/* Customer Information */}
          <div style={section}>
            <h2 style={sectionTitle}>{tScope("customerInfo")}</h2>
            <div style={row}>
              <div style={column}>
                <p style={label}>{tScope("name")}</p>
                <p style={value}>{fullName}</p>
              </div>
              {companyName && (
                <div style={column}>
                  <p style={label}>{tScope("company")}</p>
                  <p style={value}>{companyName}</p>
                </div>
              )}
            </div>
            <div style={row}>
              <div style={column}>
                <p style={label}>{tScope("email")}</p>
                <p style={value}>{email}</p>
              </div>
              <div style={column}>
                <p style={label}>{tScope("phone")}</p>
                <p style={value}>{phone}</p>
              </div>
            </div>
            <div style={row}>
              <div style={column}>
                <p style={label}>{tScope("country")}</p>
                <p style={value}>{country}</p>
              </div>
              <div style={column}>
                <p style={label}>{tScope("city")}</p>
                <p style={value}>{city}</p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div style={section}>
            <h2 style={sectionTitle}>{tScope("orderDetails")}</h2>
            <div style={row}>
              <div style={column}>
                <p style={label}>{tScope("products")}</p>
                <p style={value}>
                  {products.map((product, index) => (
                    <span key={index}>
                      • {product}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
              <div style={column}>
                <p style={label}>{tScope("quantity")}</p>
                <p style={value}>{quantity}</p>
              </div>
            </div>
            {barcode && (
              <div style={row}>
                <div style={column}>
                  <p style={label}>{tScope("barcode")}</p>
                  <p style={value}>{barcode}</p>
                </div>
              </div>
            )}
            {additionalProducts && (
              <div style={row}>
                <div style={column}>
                  <p style={label}>{tScope("additionalProducts")}</p>
                  <p style={value}>{additionalProducts}</p>
                </div>
              </div>
            )}
            <div style={row}>
              <div style={column}>
                <p style={label}>{tScope("paymentMethod")}</p>
                <p style={value}>{paymentMethod}</p>
              </div>
            </div>
          </div>

          {/* Files Section */}
          {fileUrls && fileUrls.length > 0 && (
            <div style={section}>
              <h2 style={sectionTitle}>{tScope("uploadedFiles")}</h2>
              <p style={value}>
                {fileUrls.map((url, index) => (
                  <a key={index} href={url} style={link}>
                    {tScope("file")} {index + 1}
                  </a>
                ))}
              </p>
            </div>
          )}

          {/* Admin Actions */}
          {isAdmin && (
            <div style={section}>
              <h2 style={sectionTitle}>Actions Requises</h2>
              <p style={value}>
                • Vérifier les informations du client
                <br />
                • Calculer le montant total de la commande
                <br />
                • Envoyer une confirmation avec les détails de paiement
                <br />• Préparer la commande pour l&apos;expédition
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={footer}>
          <p style={footerText}>
            {isAdmin
              ? "Merci de traiter cette commande dans les plus brefs délais."
              : tScope("contactInfo")}
          </p>
          <a href="https://zarguef.com" style={footerLink}>
            {tScope("visitWebsite")}
          </a>
        </div>
      </div>
    </div>
  );
}

// Styles
const mainContainer = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: "20px",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  maxWidth: "600px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  overflow: "hidden",
};

const header = {
  padding: "24px 48px",
  borderBottom: "1px solid #eaeaea",
  textAlign: "center" as const,
  backgroundColor: "#18191A",
};

const headerTitle = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
  padding: "0",
};

const headerSubtitle = {
  color: "#cccccc",
  fontSize: "16px",
  margin: "12px 0 0",
};

const content = {
  padding: "24px 48px",
};

const section = {
  marginBottom: "32px",
};

const sectionTitle = {
  color: "#18191A",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0 0 16px",
  padding: "0",
};

const row = {
  display: "flex",
  flexDirection: "row" as const,
  justifyContent: "space-between",
  marginBottom: "16px",
};

const column = {
  flex: 1,
  padding: "0 8px",
};

const label = {
  color: "#666666",
  fontSize: "14px",
  margin: "0 0 4px",
};

const value = {
  color: "#18191A",
  fontSize: "16px",
  margin: "0",
  lineHeight: "1.5",
};

const link = {
  color: "#ca8a04",
  textDecoration: "underline",
  marginRight: "12px",
};

const footer = {
  padding: "24px 48px",
  borderTop: "1px solid #eaeaea",
  textAlign: "center" as const,
  backgroundColor: "#f8f9fa",
};

const footerText = {
  color: "#666666",
  fontSize: "14px",
  margin: "0 0 12px",
};

const footerLink = {
  color: "#ca8a04",
  fontSize: "14px",
  textDecoration: "underline",
};
