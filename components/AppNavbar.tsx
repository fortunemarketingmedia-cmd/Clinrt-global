"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { brandLogoSrc, navigation, uiLabels } from "@/data";

export default function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPath, setMenuPath] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const pathname = usePathname();
  const menuIsOpen = isOpen && pathname === menuPath;

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollYRef.current) {
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(controlNavbar);
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (menuIsOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuIsOpen]);

  function handleMenuToggle() {
    if (menuIsOpen) {
      setIsOpen(false);
      return;
    }

    setMenuPath(pathname);
    setIsOpen(true);
  }

  function handleMenuClose() {
    setIsOpen(false);
  }

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-transparent
          transition-transform duration-300 ease-in-out will-change-transform
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-[#081423]/24 via-[#081423]/10 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-7xl min-w-0 items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <Link
            href="/"
            className="relative z-50 flex shrink-0 items-center gap-1 rounded-[1.4rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_10%,rgba(255,255,255,0.05)_10%)] shadow-[0_18px_40px_rgba(8,20,35,0.12)] backdrop-blur-[10px] transition hover:border-white/20 -ml-6 sm:-ml-12 lg:-ml-20 sm:px-4"
          >
            <Image
              src={brandLogoSrc}
              alt="ClinRT Logo"
              width={150}
              height={25}
              loading="lazy"
            />
          </Link>

          <nav
            className="hidden min-w-0 items-center gap-1 rounded-full bg-[#0f243a]/30 px-2 py-2 text-white shadow-[0_18px_36px_rgba(8,20,35,0.16)] backdrop-blur-xl lg:flex"
            aria-label="Primary"
          >
            {navigation.items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`type-h5 rounded-full px-4 py-2 transition duration-300 ${
                    isActive
                      ? "bg-white/16 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]"
                      : "text-white/78 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Button
            href={navigation.cta.href}
            label={navigation.cta.label}
            className="hidden shrink-0 shadow-[0_18px_36px_rgba(8,20,35,0.16)] lg:inline-flex"
          />

          <button
            className="z-50 shrink-0 rounded-full border border-white/18 bg-[#0f243a]/30 p-2 text-white shadow-[0_18px_36px_rgba(8,20,35,0.18)] backdrop-blur-xl transition hover:bg-[#0f243a]/40 sm:p-2.5 lg:hidden"
            onClick={handleMenuToggle}
            aria-label={uiLabels.toggleMenu}
            aria-expanded={menuIsOpen}
            aria-controls="mobile-menu"
          >
            {menuIsOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`
          fixed inset-0 z-40 flex flex-col overflow-y-auto bg-linear-to-b from-[#f6fbff] via-white to-[#eef8f3] p-4 pt-24 transition-transform duration-300 sm:p-6 sm:pt-28 lg:hidden
          ${menuIsOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-hidden={!menuIsOpen}
      >
        <nav
          className="flex flex-col gap-4 text-xl font-semibold sm:text-2xl"
          aria-label="Mobile"
        >
          {navigation.items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={handleMenuClose}
                className={`rounded-[1.35rem] px-4 py-3.5 transition duration-300 sm:px-5 sm:py-4 ${
                  isActive
                    ? "bg-[#0f243a] text-white! shadow-[0_18px_36px_rgba(8,20,35,0.12)]"
                    : "border border-[#0f243a]/8 bg-white/72 text-[#0f243a]! hover:border-[#6466ae]/22 hover:bg-white hover:text-[#0f243a]!"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Button
            href={navigation.cta.href}
            label={navigation.cta.label}
            onClick={handleMenuClose}
            className="mt-2 w-full uppercase shadow-[0_18px_36px_rgba(8,20,35,0.12)]"
          />
        </nav>
      </div>
    </>
  );
}
