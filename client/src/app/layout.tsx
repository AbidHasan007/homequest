"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import AuthWrapper from "./authWrapper";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import StoreProvider from "@/state/redux"; // Default import
import SocketStatus from "@/components/SocketStatus";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const publicRoutes = ["/landlords/profile/", "/reviews"];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider> {/* Always wrap in StoreProvider */}
          <Providers>
            <SidebarProvider>
              <div className="h-full w-full">
                <Navbar />
                {/* The main content area, with padding to account for the navbar height */}
                <main className={`h-full flex w-full flex-col `}
                  style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
                  {publicRoutes.some(route => pathname.startsWith(route)) ? (
                    <>{children}</> // No AuthWrapper for public routes
                  ) : (
                    <AuthWrapper>{children}</AuthWrapper>
                  )}
                </main>
                <SocketStatus />
                <Toaster 
                  position="top-right"
                  richColors
                  closeButton
                  duration={4000}
                />
              </div>
            </SidebarProvider>
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
