"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav } from "@/lib/data";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const links = Array.from(
          menu.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
        );
        const first = toggle.current;
        const last = links.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = before;
      window.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти до вмісту
      </a>
      <header className={`navbar ${scrolled || open ? "solid" : ""}`}>
        <a
          href="#home"
          className="wordmark"
          aria-label="BLACKLINE — на головну"
          onClick={() => setOpen(false)}
        >
          BLACKLINE<span>БАРБЕРШОП · КИЇВ</span>
        </a>
        <nav className="desktop-nav" aria-label="Основна навігація">
          {nav.map(([label, id]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>
        <a href="#booking" className="nav-cta" onClick={() => setOpen(false)}>
          Записатися <ArrowUpRight size={16} />
        </a>
        <button
          ref={toggle}
          onClick={() => setOpen(!open)}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menu}
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: reduce ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <nav aria-label="Мобільна навігація">
              {nav.map(([label, id], i) => (
                <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                  <span>0{i + 1}</span>
                  {label}
                  <ArrowUpRight />
                </a>
              ))}
              <a href="#booking" onClick={() => setOpen(false)}>
                Записатися <ArrowUpRight />
              </a>
            </nav>
            <p>Київ · Велика Васильківська, 72</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
