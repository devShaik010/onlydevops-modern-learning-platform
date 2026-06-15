import { useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

function buildSvgMarkup(IconComponent, color) {
  const iconMarkup = renderToStaticMarkup(
    <IconComponent color={color} size={42} style={{ display: "block" }} />,
  );

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72">
      <defs>
        <linearGradient id="icon-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.96)" />
          <stop offset="100%" stop-color="rgba(237,244,255,0.92)" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="64" height="64" rx="20" fill="url(#icon-bg)" stroke="rgba(15,23,42,0.10)" />
      <g transform="translate(15 15)">${iconMarkup}</g>
    </svg>
  `;
}

function svgToDataUrl(svgMarkup) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgMarkup)}`;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export function useIconLibrary(tools) {
  const [icons, setIcons] = useState({});

  useEffect(() => {
    let cancelled = false;

    async function loadIcons() {
      const entries = await Promise.all(
        tools.map(async (tool) => {
          const svgMarkup = buildSvgMarkup(tool.icon, tool.color);
          const image = await loadImage(svgToDataUrl(svgMarkup));
          return [tool.id, image];
        }),
      );

      if (!cancelled) {
        setIcons(Object.fromEntries(entries));
      }
    }

    loadIcons().catch((error) => {
      console.error("Failed to load icon library", error);
    });

    return () => {
      cancelled = true;
    };
  }, [tools]);

  return icons;
}
