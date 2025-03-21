import { CartItem } from "@/lib/manage";
import * as React from "react";

interface OrderNotificationEmailProps {
  orderNumber: string;
  items: CartItem[];
  total: number;
  shipping: number;
  paymentMethod: string;
  shippingRegion: string;
  customerEmail?: string;
  customerName?: string;
  guest: boolean;
}

export const OrderNotificationEmail: React.FC<OrderNotificationEmailProps> = ({
  orderNumber,
  items,
  total,
  shipping,
  paymentMethod,
  shippingRegion,
  customerEmail,
  customerName,
  guest = false,
}) => {
  // Formatage du prix avec 2 décimales et symbole €
  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} MAD`;
  };

  const subtotal = total - shipping;

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#333",
        backgroundColor: "#f4f4f4",
        padding: "10px",
      }}
    >
      <table
        role="presentation"
        width="100%"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <tr>
          <td
            style={{
              backgroundColor: "#363A3D",
              padding: "10px",
              textAlign: "center",
              fontSize: "24px",
              color: "#ffffff",
            }}
          >
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
          </td>
        </tr>

        {/* Main content */}
        <tr>
          <td style={{ padding: "40px 30px" }}>
            <h2
              style={{
                color: "#333333",
                fontSize: "24px",
                marginBottom: "20px",
              }}
            >
              {guest
                ? "Nouvelle Commande Invitée Reçue"
                : "Nouvelle Commande Reçue"}
            </h2>
            <p
              style={{
                color: "#666666",
                fontSize: "16px",
                lineHeight: "1.5",
                marginBottom: "20px",
              }}
            >
              Une nouvelle commande vient d'être passée sur votre boutique.
              Voici les détails:
            </p>

            {/* Order Info Section */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "30px",
              }}
            >
              <tr>
                <td
                  style={{
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                    fontWeight: "bold",
                    border: "1px solid #dee2e6",
                  }}
                >
                  Numéro de commande
                </td>
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                  {orderNumber}
                </td>
              </tr>

              {customerName && (
                <tr>
                  <td
                    style={{
                      padding: "10px",
                      backgroundColor: "#f8f9fa",
                      fontWeight: "bold",
                      border: "1px solid #dee2e6",
                    }}
                  >
                    Nom du client
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    {customerName}
                  </td>
                </tr>
              )}
              {customerEmail && (
                <tr>
                  <td
                    style={{
                      padding: "10px",
                      backgroundColor: "#f8f9fa",
                      fontWeight: "bold",
                      border: "1px solid #dee2e6",
                    }}
                  >
                    Email du client
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    {customerEmail}
                  </td>
                </tr>
              )}
              <tr>
                <td
                  style={{
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                    fontWeight: "bold",
                    border: "1px solid #dee2e6",
                  }}
                >
                  Méthode de paiement
                </td>
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                  {paymentMethod}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                    fontWeight: "bold",
                    border: "1px solid #dee2e6",
                  }}
                >
                  Région de livraison
                </td>
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                  {shippingRegion}
                </td>
              </tr>
            </table>

            {/* Items Section */}
            <h3
              style={{
                color: "#333333",
                fontSize: "20px",
                marginBottom: "15px",
              }}
            >
              Articles Commandés
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "30px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "10px",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                      textAlign: "left",
                    }}
                  >
                    Produit
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                      textAlign: "center",
                    }}
                  >
                    Quantité
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                      textAlign: "right",
                    }}
                  >
                    Prix unitaire
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                      textAlign: "right",
                    }}
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #dee2e6",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            marginRight: "10px",
                            display: "inline-block",
                          }}
                        />
                      )}
                      <div style={{ display: "inline-block" }}>
                        <div>{item.name}</div>
                        {item.size && <div>Taille: {item.size}</div>}
                        {item.volume && <div>Volume: {item.volume}</div>}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #dee2e6",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #dee2e6",
                        textAlign: "right",
                      }}
                    >
                      {formatPrice(item.price)}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #dee2e6",
                        textAlign: "right",
                      }}
                    >
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals Section */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "30px",
              }}
            >
              <tr>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "right",
                    fontWeight: "bold",
                    border: "1px solid #dee2e6",
                  }}
                >
                  Sous-total:
                </td>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "right",
                    border: "1px solid #dee2e6",
                    width: "120px",
                  }}
                >
                  {formatPrice(subtotal)}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "right",
                    fontWeight: "bold",
                    border: "1px solid #dee2e6",
                  }}
                >
                  Frais de livraison:
                </td>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "right",
                    border: "1px solid #dee2e6",
                  }}
                >
                  {formatPrice(shipping)}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "right",
                    fontWeight: "bold",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #dee2e6",
                  }}
                >
                  Total:
                </td>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "right",
                    fontWeight: "bold",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #dee2e6",
                  }}
                >
                  {formatPrice(total)}
                </td>
              </tr>
            </table>

            {/* Call to action */}
            <div style={{ textAlign: "center", margin: "30px 0" }}>
              <a
                href={`https://votresite.com/admin/commandes/${orderNumber}`}
                style={{
                  backgroundColor: "#d97706",
                  color: "#ffffff",
                  padding: "12px 24px",
                  textDecoration: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Voir les détails de la commande
              </a>
            </div>
          </td>
        </tr>

        {/* Footer */}
        <tr>
          <td
            style={{
              padding: "30px",
              backgroundColor: "#f8f9fa",
              textAlign: "center",
            }}
          >
            <p
              style={{ color: "#999999", fontSize: "14px", margin: "0 0 10px" }}
            >
              © 2024 JBK Services INTERNATIONAL FZ-LLC. Tous droits réservés.
            </p>

            <div style={{ marginTop: "20px" }}>
              <a
                href="https://www.ibendouma.com/faq"
                style={{
                  color: "#999999",
                  textDecoration: "none",
                  margin: "0 10px",
                }}
              >
                Centre d'aide
              </a>{" "}
              -
              <a
                href="https://www.ibendouma.com/privacy-and-policy"
                style={{
                  color: "#999999",
                  textDecoration: "none",
                  margin: "0 10px",
                }}
              >
                Politique de confidentialité
              </a>{" "}
              -
              <a
                href="https://ibendouma.com/terms-and-conditions"
                style={{
                  color: "#999999",
                  textDecoration: "none",
                  margin: "0 10px",
                }}
              >
                Conditions générales
              </a>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};
