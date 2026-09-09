"use client";

import { useState, useCallback } from "react";
import { LenisProvider } from "./providers/lenis-provider";
import { Preloader } from "./components/preloader";
import { Header } from "./components/header";
import { StickyRibbon } from "./components/sticky-ribbon";
import { Hero } from "./components/sections/hero";
import { ProblemSection } from "./components/sections/problem";
import { TradesSection } from "./components/sections/trades";
import { YieldSection } from "./components/sections/yield";
import { PartsViewerSection } from "./components/sections/parts-viewer";
import { MaterialsSection } from "./components/sections/materials";
import { ProcessSection } from "./components/sections/process";
import { LaneEstimator } from "./components/sections/lane-estimator";
import { ComplianceSection } from "./components/sections/compliance";
import { ProprietorSection } from "./components/sections/proprietor";
import { Footer } from "./components/footer";
import { QuoteModal } from "./components/quote-modal";
import { SITE } from "@/content/site";

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "LocalBusiness",
                name: SITE.name,
                description: SITE.description,
                telephone: SITE.phone,
                email: SITE.email,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: SITE.address.line1,
                  addressLocality: SITE.address.city,
                  addressRegion: SITE.address.state,
                  postalCode: SITE.address.pin,
                  addressCountry: "IN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 12.4244,
                  longitude: 75.7382,
                },
                founder: {
                  "@type": "Person",
                  name: SITE.proprietor,
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: SITE.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.a,
                  },
                })),
              },
            ],
          }),
        }}
      />

      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {/* Preloader */}
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Smooth scroll provider */}
      <LenisProvider>
        <div style={{ opacity: preloaderDone ? 1 : 0, transition: "opacity 0.3s", position: "relative" }}>
          <Header onQuoteOpen={() => setQuoteOpen(true)} />

          <main id="main-content">
            <Hero onQuoteOpen={() => setQuoteOpen(true)} />
            <ProblemSection />
            <TradesSection />
            <YieldSection />
            <PartsViewerSection onQuoteOpen={() => setQuoteOpen(true)} />
            <MaterialsSection onQuoteOpen={() => setQuoteOpen(true)} />
            <ProcessSection />
            <LaneEstimator onQuoteOpen={() => setQuoteOpen(true)} />
            <ComplianceSection onQuoteOpen={() => setQuoteOpen(true)} />
            <ProprietorSection onQuoteOpen={() => setQuoteOpen(true)} />
          </main>

          <Footer />

          <StickyRibbon
            onQuoteOpen={() => setQuoteOpen(true)}
            show={preloaderDone}
          />
        </div>
      </LenisProvider>

      {/* Quote modal */}
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
