import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/Navbar";
import connectDB from "@/libs/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { Toaster } from "sonner";
import Footer from "@/components/Footer/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "RestGO",
  description: "Web Application for someone who want to GO",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={nextAuthSession}>
          <Toaster expand={true} richColors />
          <NavBar></NavBar>
          <div className="h-10"></div>
          {children}
          <Footer></Footer>
        </NextAuthProvider>
      </body>
    </html>
  );
}
