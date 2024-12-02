"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import localFont from "next/font/local";
import '../app/globals.css';
import AppStateProvider from "@/providers/AppProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const geistSans = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Elements stripe={stripePromise}>
          <AppStateProvider>
            <Navbar />
            <div>{children}</div>
            <Footer />
          </AppStateProvider>
        </Elements>
      </body>
    </html>
  );
}
