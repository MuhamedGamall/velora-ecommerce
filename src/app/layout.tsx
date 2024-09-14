import type { Metadata } from "next";

import Navber from "@/components/Header/Navbar";
import AuthSessionProvider from "@/components/providers/SessionProvder";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Toaster } from "sonner";
import "swiper/css";
import "./globals.css";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export const revalidate = 0;
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-[georgia] antialiased `}>
        <AuthSessionProvider>
          <Toaster duration={3000} />
          <Navber />
          <main>{children}</main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
