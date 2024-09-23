import type { Metadata } from "next";

import AuthSessionProvider from "@/components/providers/SessionProvder";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Toaster } from "sonner";
import "swiper/css";
import "./globals.css";
import Footer from "@/components/footer";
import Navber from "@/components/Header/Navbar";
import WindowTitle from "@/components/WindowTitle";

export const metadata: Metadata = {
  title: "VELORA",
  description: "Velora is a modern e-commerce platform",
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
          <WindowTitle/>
          <Toaster duration={3000} />
          <Navber />
          <main className="">{children}</main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
