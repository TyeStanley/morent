import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import Nav from "@/components/Nav";
// eslint-disable-next-line camelcase
import { Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Morent - Rent cars from people nearby",
  description: "Morent is a social media platform for renting cars.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${plusJakartaSans.className} bg-light-white-200 dark:bg-primary-gray-900`}
        >
          <Nav />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
