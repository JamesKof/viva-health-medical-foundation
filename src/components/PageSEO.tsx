import { useEffect } from "react";

interface PageSEOProps {
  title: string;
  description?: string;
  canonical?: string;
}

export const PageSEO = ({ title, description, canonical }: PageSEOProps) => {
  useEffect(() => {
    const fullTitle = `${title} | Viva Health Medical Foundation`;
    document.title = fullTitle;

    if (description) {
      let meta = document.querySelector<HTMLMetaElement>("meta[name='description']");
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }

    const canonicalUrl = canonical || window.location.href;
    if (canonicalUrl) {
      let link = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonicalUrl);
    }
  }, [title, description, canonical]);

  return null;
};
