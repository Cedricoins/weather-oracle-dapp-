import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prédicteur Météo Oracle",
  description: "6 indices → prédiction météo ludique + contrat Solidity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-200 min-h-screen">
        {children}
      </body>
    </html>
  );
}
