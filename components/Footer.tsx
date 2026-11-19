"use client";

import { useEffect, useState } from "react";
import { footer } from "@/lib/content";
import { Arrow } from "./ui";

export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          &copy; {year} {footer.rights}
        </p>
        <a href="#top" className="link-arrow back-top">
          <span>{footer.backToTop}</span>
          <Arrow dir="up" />
        </a>
      </div>
    </footer>
  );
}
