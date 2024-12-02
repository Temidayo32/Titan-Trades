import { Metadata } from "next";
import RootLayout from "@/components/RootLayout";

export const metadata: Metadata = {
  title: 'E-commerce Platform',
  description: 'A modern e-commerce platform built with Next.js',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
