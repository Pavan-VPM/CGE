"use client";

import { useState, useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { SITE } from "@/content/site";

interface LaneEstimatorProps {
  onQuoteOpen: () => void;
}

type LaneResult = {
  originPort: string;
  destination: string;
  transitDays: string;
  incoterms: string[];
  product: string;
  quantity: string;
};

export function LaneEstimator({ onQuoteOpen }: LaneEstimatorProps) {
  const prefersReduced = useReducedMotion();
  const [product, setProduct] = useState("");
  const [destination, setDestination] = useState("");
  const [quantity, setQuantity] = useState("");
  const [result, setResult] = useState<LaneResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const arcRef = useRef<SVGPathElement>(null);

  function handleSearch() {
    if (!product || !destination) return;

    const match = SITE.destinationPorts.find(
      (p) =>
        p.name.toLowerCase().includes(destination.toLowerCase()) ||
        p.country.toLowerCase().includes(destination.toLowerCase())
    );

    if (match) {
      setResult({
        originPort: SITE.originPorts[0] || "Mangaluru",
        destination: `${match.name}, ${match.country}`,
        transitDays: match.transitDays || "",
        incoterms: match.incoterms,
        product,
        quantity,
      });
      setNotFound(false);

      // Animate arc
      if (!prefersReduced && arcRef.current) {
        const len = arcRef.current.getTotalLength();
        gsap.fromTo(
          arcRef.current,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }
        );
      }
    } else if (destination.trim().length > 1) {
      setResult({
        originPort: SITE.originPorts[0] || "Mangaluru",
        destination: destination,
        transitDays: "",
        incoterms: SITE.compliance.incotermsOffered as unknown as string[],
        product,
        quantity,
      });
      setNotFound(true);

      if (!prefersReduced && arcRef.current) {
        const len = arcRef.current.getTotalLength();
        gsap.fromTo(
          arcRef.current,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }
        );
      }
    }
  }

  // Update URL query
  useEffect(() => {
    if (!result) return;
    const url = new URL(window.location.href);
    url.searchParams.set("product", result.product);
    url.searchParams.set("destination", result.destination);
    if (quantity) url.searchParams.set("qty", quantity);
    window.history.replaceState({}, "", url.toString());
  }, [result, quantity]);

  return (
    <section
      id="reach"
      className="section-pad relative"
      style={{ backgroundColor: "transparent" }}
      aria-label="Lane estimator"
    >
      <div className="content-width relative z-10 glass-panel" style={{ padding: "4rem", borderRadius: "16px" }}>
        <p className="eyebrow" style={{ marginBottom: "1rem", color: "var(--mill)", opacity: 0.8 }}>Reach</p>
        <h2
          className="display-2"
          style={{ color: "var(--mill)", marginBottom: "3rem", maxWidth: "22ch", textShadow: "0 4px 16px rgba(0,0,0,0.5)" }}
        >
          Tell it where you are and what you need
        </h2>

        {/* Inputs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {/* Product selector */}
          <div>
            <label
              htmlFor="le-product"
              className="spec"
              style={{ display: "block", marginBottom: "0.4rem", color: "var(--ink)", opacity: 0.7 }}
            >
              Product
            </label>
            <select
              id="le-product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: "1.5px solid var(--blueprint)",
                borderRadius: "2px",
                background: "var(--mill)",
                color: "var(--ink)",
                fontFamily: "var(--font-family-newsreader)",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              <option value="">Select a product</option>
              {SITE.trades.map((trade) => (
                <optgroup key={trade.id} label={trade.name}>
                  {trade.items.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Destination port */}
          <div>
            <label
              htmlFor="le-destination"
              className="spec"
              style={{ display: "block", marginBottom: "0.4rem", color: "var(--ink)", opacity: 0.7 }}
            >
              Destination port
            </label>
            <input
              id="le-destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Hamburg, Los Angeles"
              list="le-port-list"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: "1.5px solid var(--blueprint)",
                borderRadius: "2px",
                background: "var(--mill)",
                color: "var(--ink)",
                fontFamily: "var(--font-family-newsreader)",
                fontSize: "1rem",
              }}
            />
            <datalist id="le-port-list">
              {SITE.destinationPorts.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.country}
                </option>
              ))}
            </datalist>
          </div>

          {/* Quantity */}
          <div>
            <label
              htmlFor="le-quantity"
              className="spec"
              style={{ display: "block", marginBottom: "0.4rem", color: "var(--ink)", opacity: 0.7 }}
            >
              Quantity
            </label>
            <input
              id="le-quantity"
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 500 pcs, 2 CBM"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: "1.5px solid var(--blueprint)",
                borderRadius: "2px",
                background: "var(--mill)",
                color: "var(--ink)",
                fontFamily: "var(--font-family-newsreader)",
                fontSize: "1rem",
              }}
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="btn btn-primary"
          disabled={!product || !destination}
          style={{ opacity: !product || !destination ? 0.5 : 1 }}
          id="le-see-route-btn"
        >
          See the route
        </button>

        {/* Results */}
        {result && (
          <div style={{ marginTop: "2rem" }}>
            {/* World map with arc */}
            <div
              style={{
                background: "var(--blueprint)",
                borderRadius: "4px",
                padding: "1.5rem",
                marginBottom: "1.5rem",
                overflow: "hidden",
              }}
            >
              <DotMatrixMap
                arcRef={arcRef}
                notFound={notFound}
                destination={result.destination}
              />
            </div>

            {/* Not found message */}
            {notFound && (
              <p
                className="body-text"
                style={{
                  color: "var(--rosewood)",
                  marginBottom: "1rem",
                  padding: "0.75rem 1rem",
                  background: "rgba(107,58,42,0.08)",
                  borderRadius: "2px",
                }}
              >
                Port not in our lane list yet, we will quote it.{" "}
                <button
                  onClick={onQuoteOpen}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--signal)",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                  }}
                >
                  Confirm with us
                </button>
              </p>
            )}

            {/* Spec strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1px",
                background: "var(--blueprint)",
                border: "1px solid var(--blueprint)",
                borderRadius: "2px",
                overflow: "hidden",
                marginBottom: "1.5rem",
              }}
            >
              {[
                ["Origin port", result.originPort],
                [
                  "Transit time",
                  result.transitDays || null,
                ],
                [
                  "Incoterms offered",
                  result.incoterms.join(", ") || null,
                ],
                ["Lead time from order", SITE.compliance.leadTimeDays || null],
              ].map(([label, value]) => (
                <div
                  key={label as string}
                  style={{ background: "var(--mill)", padding: "1rem 1.25rem" }}
                >
                  <p
                    className="spec"
                    style={{
                      color: "var(--ink)",
                      opacity: 0.6,
                      marginBottom: "0.25rem",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {label as string}
                  </p>
                  {value ? (
                    <p className="spec" style={{ color: "var(--ink)", fontSize: "1rem" }}>
                      {value as string}{" "}
                      <span style={{ opacity: 0.5, fontSize: "0.7em" }}>indicative</span>
                    </p>
                  ) : (
                    <button
                      onClick={onQuoteOpen}
                      className="spec"
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--signal)",
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontSize: "0.875rem",
                        padding: 0,
                      }}
                    >
                      Confirm with us
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={onQuoteOpen}
                className="btn btn-primary"
                id="le-continue-quote-btn"
              >
                Continue to quote
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function DotMatrixMap({
  arcRef,
  notFound,
  destination,
}: {
  arcRef: React.RefObject<SVGPathElement | null>;
  notFound: boolean;
  destination: string;
}) {
  // Stylised world map as a dot matrix
  // Kodagu is roughly at 75.8°E, 12.4°N
  // Map dimensions: 800×400, range: -180 to 180 lon, 90 to -90 lat
  const toSVG = (lon: number, lat: number) => ({
    x: ((lon + 180) / 360) * 800,
    y: ((90 - lat) / 180) * 400,
  });

  const kodagu = toSVG(75.8, 12.4);
  const dest = toSVG(10, 50); // Approximate Europe centre as fallback

  // Bezier arc control point
  const cp = {
    x: (kodagu.x + dest.x) / 2,
    y: Math.min(kodagu.y, dest.y) - 80,
  };

  const arcPath = `M ${kodagu.x} ${kodagu.y} Q ${cp.x} ${cp.y} ${dest.x} ${dest.y}`;

  return (
    <svg
      viewBox="0 0 800 400"
      style={{ width: "100%", height: "auto", display: "block" }}
      aria-label={`Route from Kodagu to ${destination}`}
    >
      {/* Continent outlines as simplified shapes */}
      <g opacity="0.2" fill="var(--ink)">
        {/* Simplified landmasses */}
        {/* South Asia */}
        <ellipse cx="540" cy="260" rx="60" ry="45" />
        {/* Europe */}
        <ellipse cx="440" cy="160" rx="55" ry="40" />
        {/* North America */}
        <ellipse cx="170" cy="195" rx="85" ry="60" />
        {/* South America */}
        <ellipse cx="225" cy="310" rx="40" ry="60" />
        {/* Africa */}
        <ellipse cx="440" cy="295" rx="48" ry="65" />
        {/* East Asia */}
        <ellipse cx="640" cy="210" rx="65" ry="55" />
        {/* Australia */}
        <ellipse cx="660" cy="330" rx="50" ry="35" />
      </g>

      {/* Dot grid */}
      {Array.from({ length: 40 }).map((_, row) =>
        Array.from({ length: 80 }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={col * 10 + 1}
            y={row * 10 + 1}
            width="2"
            height="2"
            fill="var(--signal)"
            opacity="0.15"
          />
        ))
      )}

      {/* Arc */}
      <path
        ref={arcRef}
        d={arcPath}
        stroke={notFound ? "var(--rosewood)" : "var(--signal)"}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="0"
      />

      {/* Origin node — Kodagu */}
      <circle cx={kodagu.x} cy={kodagu.y} r="7" fill="var(--brass)" />
      <circle cx={kodagu.x} cy={kodagu.y} r="3" fill="var(--ink)" />

      {/* Destination */}
      <circle
        cx={dest.x}
        cy={dest.y}
        r="5"
        fill={notFound ? "var(--rosewood)" : "var(--signal)"}
        opacity="0.8"
      />

      {/* Labels */}
      <text
        x={kodagu.x + 10}
        y={kodagu.y + 4}
        className="spec"
        fontSize="9"
        fill="var(--ink)"
        fontFamily="monospace"
      >
        Kodagu
      </text>
    </svg>
  );
}
