import "./globals.css";
import Footer from "@/components/layout/Footer";
import FooterVisibility from "@/components/layout/FooterVisibility";
import MotionPreferences from "@/components/layout/MotionPreferences";

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
        <MotionPreferences>
          {children}
          <FooterVisibility><Footer /></FooterVisibility>
        </MotionPreferences>
      </body>
    </html>
  );
}
