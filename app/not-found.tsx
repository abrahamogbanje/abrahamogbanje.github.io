import type { Metadata } from "next";
import { notFound } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page not found — Ogbanje Abraham",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="section not-found">
      <div className="container contact">
        <p className="nf-code" aria-hidden="true">404</p>
        <h1 className="section-title">{notFound.title}</h1>
        <p className="contact-text">{notFound.text}</p>
        <p>
          <a className="btn btn-primary" href="/">
            <span>{notFound.back}</span>
          </a>
        </p>
      </div>
    </main>
  );
}
