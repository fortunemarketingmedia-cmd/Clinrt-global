"use client";

import { useEffect, useRef } from "react";
import maplibregl, { type StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const LOCATION: [number, number] = [73.799194, 18.634847];
const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    "osm-tiles": {
      type: "raster",
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "osm-tiles",
      type: "raster",
      source: "osm-tiles",
    },
  ],
};

function createPopupContent() {
  const container = document.createElement("div");
  container.className = "type-h6";

  const title = document.createElement("strong");
  title.textContent = "ClinRT Global Services Pvt. Ltd.";
  container.appendChild(title);
  container.appendChild(document.createElement("br"));

  const addressLines = [
    "905, Tower 3, Kohinoor World Towers",
    "PCMC, Pune, Maharashtra 411018",
    "India",
  ];

  addressLines.forEach((line) => {
    container.append(document.createTextNode(line));
    container.appendChild(document.createElement("br"));
  });

  return container;
}

export default function ContactMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: LOCATION,
      zoom: 14,
      attributionControl: false,
    });

    mapRef.current = map;
    map.scrollZoom.disable();

    new maplibregl.Marker({ color: "#0f243a" })
      .setLngLat(LOCATION)
      .setPopup(
        new maplibregl.Popup({ offset: 24 }).setDOMContent(
          createPopupContent(),
        ),
      )
      .addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full rounded-3xl overflow-hidden"
    />
  );
}
