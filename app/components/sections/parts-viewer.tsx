"use client";

import { useState, Suspense, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Center, useGLTF } from "@react-three/drei";
import { SITE } from "@/content/site";

interface PartsViewerSectionProps {
  onQuoteOpen: () => void;
}

export function PartsViewerSection({ onQuoteOpen }: PartsViewerSectionProps) {
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);

  // Check for touch / pointer type to conditionally skip 3D
  useEffect(() => {
    const checkPointer = () => {
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      setIsMobile(!hasFinePointer);
    };
    checkPointer();
    window.addEventListener("resize", checkPointer);
    return () => window.removeEventListener("resize", checkPointer);
  }, []);

  return (
    <section
      id="parts"
      className="section-pad relative"
      style={{ backgroundColor: "transparent" }}
      aria-label="Guitar parts viewer"
    >
      <div className="content-width relative z-10">
        <p className="eyebrow" style={{ marginBottom: "1rem", color: "var(--mill)", opacity: 0.8 }}>Anatomy</p>
        <h2 className="display-2" style={{ color: "var(--mill)", marginBottom: "3rem", textShadow: "0 4px 16px rgba(0,0,0,0.5)" }}>
          The components
        </h2>

        {prefersReduced || isMobile ? (
          <FallbackViewer onQuoteOpen={onQuoteOpen} />
        ) : (
          <div
            style={{
              height: "75vh",
              minHeight: "600px",
              background: "transparent",
              borderRadius: "4px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="spec" style={{ color: "var(--mill)", opacity: 0.5 }}>Loading 3D model...</p>
                </div>
              }
            >
              <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ width: "100%", height: "100%" }}
                gl={{ alpha: true }}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <spotLight position={[-5, 5, 5]} intensity={1.5} color="#c9a227" penumbra={1} />
                <Center>
                  <GuitarModel onQuoteOpen={onQuoteOpen} />
                </Center>
                <OrbitControls
                  enablePan={false}
                  enableZoom={false}
                  minAzimuthAngle={-Math.PI / 6} // clamp 30 degrees
                  maxAzimuthAngle={Math.PI / 6}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 1.5}
                />
              </Canvas>
            </Suspense>
          </div>
        )}
      </div>
    </section>
  );
}

function GuitarModel({ onQuoteOpen }: { onQuoteOpen: () => void }) {
  const [activePart, setActivePart] = useState<string | null>(null);

  // Simplified procedural model representing an acoustic guitar since we don't have a real GLTF.
  // We'll use simple shapes to represent the parts.
  const parts = [
    { id: "headstock", position: [0, 2.5, 0] as const, scale: [0.6, 1, 0.1] as const, label: "Headstock" },
    { id: "neck-blank", position: [0, 1.2, 0] as const, scale: [0.4, 1.8, 0.2] as const, label: "Neck Blank" },
    { id: "fretboard", position: [0, 1.2, 0.15] as const, scale: [0.45, 1.8, 0.05] as const, label: "Fretboard" },
    { id: "back-sides", position: [0, -1, 0] as const, scale: [1.8, 2.2, 0.6] as const, label: "Body (Back & Sides)" },
    { id: "bridge", position: [0, -1.5, 0.3] as const, scale: [0.8, 0.2, 0.1] as const, label: "Bridge" },
  ];

  return (
    <group>
      {parts.map((part) => {
        const isActive = activePart === part.id;
        const isDim = activePart && !isActive;

        return (
          <group
            key={part.id}
            position={part.position}
            // "Explode" slightly when active
            scale={isActive ? 1.05 : 1}
            onClick={(e) => {
              e.stopPropagation();
              setActivePart(isActive ? null : part.id);
            }}
          >
            {/* Mesh */}
            <mesh scale={part.scale}>
              <boxGeometry />
              <meshStandardMaterial
                color={isActive ? "#c9a227" : "#6b3a2a"}
                transparent
                opacity={isDim ? 0.15 : 1}
              />
            </mesh>

            {/* Hotspot marker */}
            <Html position={[0.5, 0, 0.1]} center zIndexRange={[100, 0]}>
              <button
                className="spec"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePart(isActive ? null : part.id);
                }}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: isActive ? "var(--ink)" : "var(--brass)",
                  color: isActive ? "var(--mill)" : "var(--ink)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  transition: "all 0.2s",
                }}
                aria-label={isActive ? `Hide ${part.label}` : `Show ${part.label}`}
              >
                {isActive ? "×" : "+"}
              </button>

              {/* Panel */}
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "32px",
                    transform: "translateY(-50%)",
                    background: "var(--mill)",
                    border: "1px solid var(--blueprint)",
                    padding: "1rem",
                    width: "240px",
                    borderRadius: "2px",
                    boxShadow: "0 4px 24px rgba(10,36,80,0.1)",
                    pointerEvents: "auto",
                  }}
                >
                  <p className="display-4" style={{ color: "var(--ink)", marginBottom: "0.5rem" }}>
                    {part.label}
                  </p>
                  
                  {/* Find part in content data */}
                  {(() => {
                    const data = SITE.guitarParts.find(p => p.id === part.id);
                    if (!data) return null;
                    
                    return (
                      <table style={{ width: "100%", marginBottom: "1rem", borderCollapse: "collapse" }}>
                        <tbody>
                          {[
                            ["Species", data.speciesOptions.join(", ") || null],
                            ["Tolerance", data.toleranceMm ? `±${data.toleranceMm}mm` : null],
                            ["Finish", data.finishState || null],
                            ["MOQ", data.moq || null],
                          ].map(([label, value]) => (
                            <tr key={label} style={{ borderBottom: "1px solid var(--blueprint)" }}>
                              <td className="spec" style={{ padding: "0.25rem 0", color: "var(--ink)", opacity: 0.6, fontSize: "0.7rem", width: "40%" }}>{label}</td>
                              <td className="spec" style={{ padding: "0.25rem 0", color: "var(--ink)", fontSize: "0.7rem" }}>
                                {value || <span style={{ opacity: 0.5, fontStyle: "italic" }}>Confirm with us</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    );
                  })()}
                  
                  <button
                    className="btn btn-primary"
                    style={{ width: "100%", padding: "0.5rem", fontSize: "0.75rem" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Push to session storage quote basket
                      const current = JSON.parse(sessionStorage.getItem("cge-quote-draft") || "{}");
                      sessionStorage.setItem("cge-quote-draft", JSON.stringify({
                        ...current,
                        product: part.label
                      }));
                      onQuoteOpen();
                    }}
                  >
                    Add to quote
                  </button>
                </div>
              )}
            </Html>
          </group>
        );
      })}
    </group>
  );
}

function FallbackViewer({ onQuoteOpen }: { onQuoteOpen: () => void }) {
  const [openPart, setOpenPart] = useState<string | null>(null);
  
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
      {/* Abstract diagram */}
      <div style={{ background: "rgba(10,36,80,0.03)", borderRadius: "4px", padding: "2rem", display: "flex", justifyContent: "center" }}>
        <svg viewBox="0 0 100 300" style={{ width: "100%", maxWidth: "160px" }}>
          <rect x="35" y="10" width="30" height="40" rx="4" fill="var(--rosewood)" />
          <rect x="42" y="50" width="16" height="110" rx="2" fill="var(--rosewood)" opacity="0.8" />
          <ellipse cx="50" cy="220" rx="45" ry="65" fill="var(--rosewood)" opacity="0.6" />
          <circle cx="50" cy="210" r="14" fill="var(--mill)" />
          <rect x="35" y="245" width="30" height="8" rx="2" fill="var(--brass)" />
        </svg>
      </div>

      {/* Accordion */}
      <div>
        {SITE.guitarParts.slice(0, 8).map((part, i) => (
          <div key={part.id} style={{ borderBottom: "1px solid var(--blueprint)" }}>
            <button
              onClick={() => setOpenPart(openPart === part.id ? null : part.id)}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 0",
                color: "var(--ink)"
              }}
            >
              <span className="display-4" style={{ fontSize: "1rem" }}>{part.name}</span>
              <span style={{ color: "var(--brass)", fontWeight: 800 }}>{openPart === part.id ? "−" : "+"}</span>
            </button>
            
            {openPart === part.id && (
              <div style={{ paddingBottom: "1rem" }}>
                <table style={{ width: "100%", marginBottom: "1rem", borderCollapse: "collapse" }}>
                  <tbody>
                    {[
                      ["Species", part.speciesOptions.join(", ") || null],
                      ["Tolerance", part.toleranceMm ? `±${part.toleranceMm}mm` : null],
                      ["Finish", part.finishState || null],
                      ["MOQ", part.moq || null],
                    ].map(([label, value]) => (
                      <tr key={label}>
                        <td className="spec" style={{ padding: "0.25rem 0", color: "var(--ink)", opacity: 0.6, fontSize: "0.75rem", width: "40%" }}>{label}</td>
                        <td className="spec" style={{ padding: "0.25rem 0", color: "var(--ink)", fontSize: "0.75rem" }}>
                          {value || <span style={{ opacity: 0.5, fontStyle: "italic" }}>Confirm with us</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="btn btn-primary"
                  style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}
                  onClick={() => {
                    const current = JSON.parse(sessionStorage.getItem("cge-quote-draft") || "{}");
                    sessionStorage.setItem("cge-quote-draft", JSON.stringify({
                      ...current,
                      product: part.name
                    }));
                    onQuoteOpen();
                  }}
                >
                  Add to quote
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
