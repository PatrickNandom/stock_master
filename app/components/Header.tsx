"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="flex items-center w-screen sm:justify-around px-4 sm:px-8 min-h-[70] bg-linear-to-r from-[#F7AB97] to-[#071548]">
      <Link href="/">
        <Image
          src="/stockmaster_logo.svg"
          alt="App logo"
          className="hidden sm:block"
          width={50}
          height={50}
        />
      </Link>

      <nav className="hidden sm:flex gap-8 text-white">
        <Link href="/about">About Us</Link>
        <Link href="/features">Features</Link>
        <Link href="/how-it-works">How it works</Link>
        <Link href="/terms">Terms</Link>
      </nav>

      <Link href="/login">
        <button className="hidden sm:block min-w-[130] h-[38] bg-peach text-black rounded-[8] px-4 cursor-pointer">
          Login
        </button>
      </Link>

      <p className="w-4 sm:hidden"></p>

      <button
        className="sm:hidden text-white text-2xl font-bold"
        aria-label="Open menu"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>

      {/* Mobile menu*/}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-17.5 left-0 w-full bg-[#071548] text-white flex flex-col items-center gap-6 py-6 z-50 shadow-lg">
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
            About Us
          </Link>
          <Link href="/features" onClick={() => setMobileMenuOpen(false)}>
            Features
          </Link>
          <Link href="/how-it-works" onClick={() => setMobileMenuOpen(false)}>
            How it works
          </Link>
          <Link href="/terms" onClick={() => setMobileMenuOpen(false)}>
            Terms
          </Link>
          <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
            <button className="min-w-32.5 h-9.5 bg-peach text-black rounded-lg px-4 cursor-pointer">
              Login
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
