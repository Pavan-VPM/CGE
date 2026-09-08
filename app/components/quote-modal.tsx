"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SITE } from "@/content/site";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProduct?: string;
  prefilledDestination?: string;
}

const STEPS = ["What", "How much", "Who"];

export function QuoteModal({
  isOpen,
  onClose,
  prefilledProduct,
  prefilledDestination,
}: QuoteModalProps) {
  const prefersReduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Form state
  const [selectedItems, setSelectedItems] = useState<string[]>(
    prefilledProduct ? [prefilledProduct] : []
  );
  const [quantity, setQuantity] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [destination, setDestination] = useState(prefilledDestination || "");
  const [targetMonth, setTargetMonth] = useState("");
  const [incoterm, setIncoterm] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState(false);

  // Persist in-progress to sessionStorage
  useEffect(() => {
    if (isOpen) {
      const saved = sessionStorage.getItem("cge-quote-draft");
      if (saved) {
        try {
          const d = JSON.parse(saved);
          if (d.quantity) setQuantity(d.quantity);
          if (d.destination) setDestination(d.destination);
          if (d.name) setName(d.name);
          if (d.email) setEmail(d.email);
          if (d.company) setCompany(d.company);
          if (d.country) setCountry(d.country);
          if (d.message) setMessage(d.message);
        } catch {}
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (dirty) {
      sessionStorage.setItem(
        "cge-quote-draft",
        JSON.stringify({ quantity, destination, name, email, company, country, message })
      );
    }
  }, [dirty, quantity, destination, name, email, company, country, message]);

  // Focus trap + Escape
  useEffect(() => {
    if (!isOpen) return;
    const firstField = dialogRef.current?.querySelector(
      "input, select, textarea, button"
    ) as HTMLElement;
    firstField?.focus();

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (dirty) {
          if (window.confirm("You have unsaved input. Close anyway?")) {
            handleClose();
          }
        } else {
          handleClose();
        }
      }
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, dirty]);

  function handleClose() {
    onClose();
    setTimeout(() => {
      setStep(0);
      setSubmitted(false);
      setError(false);
    }, 300);
  }

  function toggleItem(item: string) {
    setDirty(true);
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }

  function validateStep1() {
    return selectedItems.length > 0;
  }

  function validateStep2() {
    let valid = true;
    if (!quantity) {
      setQuantityError("Add a quantity so we can price it");
      valid = false;
    } else {
      setQuantityError("");
    }
    return valid;
  }

  function validateStep3() {
    let valid = true;
    if (!name) {
      setNameError("Add your name so we know who to respond to");
      valid = false;
    } else {
      setNameError("");
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Add a valid email so we can reply");
      valid = false;
    } else {
      setEmailError("");
    }
    return valid;
  }

  function handleNext() {
    if (step === 0 && !validateStep1()) return;
    if (step === 1 && !validateStep2()) return;
    if (step < 2) setStep(step + 1);
    else handleSubmit();
  }

  function handleSubmit() {
    if (!validateStep3()) return;
    // Build mailto fallback body
    const body = encodeURIComponent(
      `Items: ${selectedItems.join(", ")}\nQuantity: ${quantity}\nDestination: ${destination}\nTarget month: ${targetMonth}\nIncoterm: ${incoterm}\n\nFrom: ${name}\nCompany: ${company}\nCountry: ${country}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    );
    // Simulate submission (mailto)
    try {
      setSubmitted(true);
      sessionStorage.removeItem("cge-quote-draft");
    } catch {
      setError(true);
    }
  }

  const mailtoFallback = `mailto:${SITE.email}?subject=Quote Request&body=${encodeURIComponent(
    `Items: ${selectedItems.join(", ")}\nQuantity: ${quantity}\nDestination: ${destination}\nFrom: ${name}\nEmail: ${email}`
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backgroundColor: "rgba(10,36,80,0.85)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Request a quote"
            initial={prefersReduced ? false : { y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0, 0, 1] }}
            style={{
              background: "var(--mill)",
              borderRadius: "4px",
              width: "100%",
              maxWidth: "560px",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "1.5rem 2rem 0",
                position: "sticky",
                top: 0,
                background: "var(--mill)",
                zIndex: 1,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2
                  className="display-4"
                  style={{ color: "var(--ink)" }}
                >
                  {submitted ? "Request sent" : "Request a quote"}
                </h2>
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    color: "var(--ink)",
                    opacity: 0.5,
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>

              {/* Progress rail */}
              {!submitted && (
                <div
                  style={{
                    height: "2px",
                    background: "var(--blueprint)",
                    borderRadius: "1px",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: "var(--signal)",
                      width: `${((step + 1) / STEPS.length) * 100}%`,
                      borderRadius: "1px",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: "0 2rem 2rem" }}>
              {submitted ? (
                <div>
                  <p className="lede" style={{ color: "var(--ink)", marginBottom: "1rem" }}>
                    We will review your request and reply within two business days. If you need to speak
                    immediately:
                  </p>
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                    className="display-4 block"
                    style={{ color: "var(--signal)", marginBottom: "1.5rem" }}
                  >
                    {SITE.phone}
                  </a>
                  <button
                    onClick={handleClose}
                    className="btn btn-primary"
                  >
                    Close
                  </button>
                </div>
              ) : error ? (
                <div>
                  <p className="body-text" style={{ color: "var(--rosewood)", marginBottom: "1rem" }}>
                    Something went wrong sending the form. You can email us directly with the full request
                    pre-filled:
                  </p>
                  <a href={mailtoFallback} className="btn btn-primary">
                    Send by email instead
                  </a>
                </div>
              ) : (
                <>
                  {/* Step 0: What */}
                  {step === 0 && (
                    <div>
                      <p className="eyebrow" style={{ marginBottom: "1rem" }}>
                        What do you need?
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                        {SITE.trades.flatMap((trade) =>
                          trade.items.map((item) => (
                            <button
                              key={item}
                              onClick={() => toggleItem(item)}
                              style={{
                                padding: "0.4rem 0.875rem",
                                border: `1.5px solid ${selectedItems.includes(item) ? "var(--rosewood)" : "var(--blueprint)"}`,
                                borderRadius: "2px",
                                background: selectedItems.includes(item)
                                  ? "var(--rosewood)"
                                  : "transparent",
                                color: selectedItems.includes(item) ? "var(--mill)" : "var(--ink)",
                                cursor: "pointer",
                                fontFamily: "var(--font-family-archivo)",
                                fontSize: "0.875rem",
                                fontWeight: selectedItems.includes(item) ? 700 : 400,
                                transition: "all 0.15s",
                              }}
                              aria-pressed={selectedItems.includes(item)}
                            >
                              {item}
                            </button>
                          ))
                        )}
                      </div>
                      {selectedItems.length === 0 && (
                        <p className="spec" style={{ color: "var(--rosewood)", marginBottom: "1rem", fontSize: "0.8rem" }}>
                          Select at least one item to continue
                        </p>
                      )}
                    </div>
                  )}

                  {/* Step 1: How much & where */}
                  {step === 1 && (
                    <div>
                      <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>
                        How much and where?
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                        <FormField
                          label="Quantity"
                          id="q-quantity"
                          error={quantityError}
                        >
                          <input
                            id="q-quantity"
                            type="text"
                            value={quantity}
                            onChange={(e) => { setQuantity(e.target.value); setDirty(true); }}
                            onBlur={() => quantity ? setQuantityError("") : setQuantityError("Add a quantity so we can price it")}
                            placeholder="e.g. 200 fretboard blanks, 5 CBM"
                            style={inputStyle}
                          />
                        </FormField>

                        <FormField label="Destination port or city" id="q-destination">
                          <input
                            id="q-destination"
                            type="text"
                            value={destination}
                            onChange={(e) => { setDestination(e.target.value); setDirty(true); }}
                            placeholder="e.g. Hamburg, Los Angeles"
                            style={inputStyle}
                          />
                        </FormField>

                        <FormField label="Target delivery month" id="q-month">
                          <input
                            id="q-month"
                            type="month"
                            value={targetMonth}
                            onChange={(e) => { setTargetMonth(e.target.value); setDirty(true); }}
                            style={inputStyle}
                          />
                        </FormField>

                        <FormField label="Preferred Incoterm" id="q-incoterm">
                          <select
                            id="q-incoterm"
                            value={incoterm}
                            onChange={(e) => { setIncoterm(e.target.value); setDirty(true); }}
                            style={inputStyle}
                          >
                            <option value="">Not sure yet</option>
                            {(SITE.compliance.incotermsOffered as readonly string[]).map((inc) => (
                              <option key={inc} value={inc}>{inc}</option>
                            ))}
                          </select>
                        </FormField>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Who */}
                  {step === 2 && (
                    <div>
                      <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>
                        Who are you?
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                        <FormField label="Your name" id="q-name" error={nameError}>
                          <input
                            id="q-name"
                            type="text"
                            value={name}
                            onChange={(e) => { setName(e.target.value); setDirty(true); }}
                            onBlur={() => name ? setNameError("") : setNameError("Add your name so we know who to respond to")}
                            placeholder="Full name"
                            style={inputStyle}
                            autoComplete="name"
                          />
                        </FormField>

                        <FormField label="Company" id="q-company">
                          <input
                            id="q-company"
                            type="text"
                            value={company}
                            onChange={(e) => { setCompany(e.target.value); setDirty(true); }}
                            placeholder="Workshop, studio or company name"
                            style={inputStyle}
                            autoComplete="organization"
                          />
                        </FormField>

                        <FormField label="Country" id="q-country">
                          <input
                            id="q-country"
                            type="text"
                            value={country}
                            onChange={(e) => { setCountry(e.target.value); setDirty(true); }}
                            placeholder="Your country"
                            style={inputStyle}
                            autoComplete="country-name"
                          />
                        </FormField>

                        <FormField label="Email" id="q-email" error={emailError}>
                          <input
                            id="q-email"
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setDirty(true); }}
                            onBlur={() => {
                              if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                                setEmailError("Add a valid email so we can reply");
                              } else {
                                setEmailError("");
                              }
                            }}
                            placeholder="you@example.com"
                            style={inputStyle}
                            autoComplete="email"
                          />
                        </FormField>

                        <FormField label="Phone (optional)" id="q-phone">
                          <input
                            id="q-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value); setDirty(true); }}
                            placeholder="+1 555 000 0000"
                            style={inputStyle}
                            autoComplete="tel"
                          />
                        </FormField>

                        <FormField label="Message (optional)" id="q-message">
                          <textarea
                            id="q-message"
                            value={message}
                            onChange={(e) => { setMessage(e.target.value); setDirty(true); }}
                            placeholder="Anything else we should know — species preference, moisture spec, special dimensions"
                            rows={3}
                            style={{ ...inputStyle, resize: "vertical" }}
                          />
                        </FormField>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", gap: "1rem" }}>
                    {step > 0 ? (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="btn btn-ghost-ink"
                        style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem" }}
                      >
                        Back
                      </button>
                    ) : (
                      <span />
                    )}
                    <button
                      onClick={handleNext}
                      className="btn btn-primary"
                      id="quote-next-btn"
                    >
                      {step === 2 ? "Send request" : "Continue"}
                    </button>
                  </div>

                  {/* Soft escape hatch */}
                  <p
                    className="spec"
                    style={{
                      textAlign: "center",
                      marginTop: "1.5rem",
                      color: "var(--ink)",
                      opacity: 0.5,
                      fontSize: "0.8rem",
                    }}
                  >
                    Or just want to say hello?{" "}
                    <a
                      href={`mailto:${SITE.email}`}
                      style={{ color: "var(--signal)", textDecoration: "underline" }}
                    >
                      {SITE.email}
                    </a>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FormField({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="spec"
        style={{
          display: "block",
          marginBottom: "0.4rem",
          color: "var(--ink)",
          opacity: 0.7,
          fontSize: "0.75rem",
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          className="spec"
          style={{
            color: "var(--rosewood)",
            fontSize: "0.75rem",
            marginTop: "0.3rem",
          }}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  border: "1.5px solid var(--blueprint)",
  borderRadius: "2px",
  background: "var(--mill)",
  color: "var(--ink)",
  fontFamily: "var(--font-family-newsreader)",
  fontSize: "1rem",
};
