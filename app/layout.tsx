import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RoomieFinder",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          <Navbar />
          {/* <header className="bg-white bg-opacity-10 backdrop-blur-lg">
            <nav className="container mx-auto px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="text-white font-bold text-xl">
                  Roommate Finder
                </div>
              </div>
            </nav>
          </header> */}
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
