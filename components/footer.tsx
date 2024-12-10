import { Facebook, Instagram, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black bg-opacity-20 backdrop-blur-lg text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="flex items-center mb-2">
              <Mail className="mr-2 h-4 w-4" />
              <a
                href="mailto:univac.club.23@gmail.com"
                className="hover:underline"
              >
                univac.club.23@gmail.com
              </a>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>ENS Bechar, wilaya de Bechar</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/profile.php?id=100093298301220"
                className="hover:text-primary transition-colors"
                target="_blank"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.instagram.com/univac_club"
                className="hover:text-primary transition-colors"
                target="_blank"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg font-semibold mb-4">UNIVAC Club</h3>
            <p className="text-sm text-gray-300">
              Empowering students through technology and innovation.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-white border-opacity-20 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} UNIVAC Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
