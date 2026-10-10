import "./globals.css";
import Footer from "@/components/layout/Footer";
import FooterVisibility from "@/components/layout/FooterVisibility";
import MotionPreferences from "@/components/layout/MotionPreferences";
import SiteSound from "@/components/layout/SiteSound";

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
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@700&display=swap" />
      </head>
      <body>
        <MotionPreferences>
          {children}
          <FooterVisibility><Footer /></FooterVisibility>
          <SiteSound />
        </MotionPreferences>
      </body>
    </html>
  );
}
