"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Home, Users, Search, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", icon: Home },
  { name: "Find", icon: Search },
  { name: "Matches", icon: Users },
  { name: "Chat", icon: MessageCircle },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
          scrollPosition >= sectionTop - 50 &&
          scrollPosition < sectionTop + sectionHeight - 50
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-black bg-opacity-20 backdrop-blur-lg">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white font-bold text-xl"
          >
            Roomie Finder
          </motion.div>
          <div className="flex items-center space-x-4">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.name.toLowerCase())}
                className={`text-white text-base hover:text-primary-foreground transition-colors duration-200 ${
                  activeSection === item.name.toLowerCase()
                    ? "text-primary-foreground"
                    : ""
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="h-6 w-6" />
                <span className="sr-only">{item.name}</span>
              </motion.button>
            ))}
            {/* <motion.button
              onClick={toggleTheme}
              className="text-white hover:text-primary-foreground transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle theme</span>
            </motion.button> */}
          </div>
        </div>
      </nav>
    </header>
  );
}
