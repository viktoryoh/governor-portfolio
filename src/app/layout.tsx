import "./globals.css";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Governor Portfolio",
  description: "Premium Governor Campaign Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
