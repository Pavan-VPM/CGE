// ============================================================
// Chandy's Global Exports – Single Source of Truth
// All content lives here. Zero hardcoded copy in components.
// ============================================================

export const SITE = {
  name: "Chandy's Global Exports",
  shortName: "CGE",
  proprietor: "Sisson Chandy",
  phone: "+91 9353927123",
  email: "chandysglobalexports@gmail.com",
  address: {
    line1: "Hi Tech Wood Industries",
    city: "Kodagu",
    state: "Karnataka",
    pin: "571218",
    country: "India",
    mapUrl: "https://maps.google.com/?q=Kodagu,Karnataka,India",
  },
  taglines: [
    "Grain that carries a note across nine time zones.",
    "Connecting markets, delivering value.",
    "Global reach, stronger tomorrow.",
  ],
  description:
    "Manufacturer and exporter of guitar parts, hardwood furniture, plywood and veneers, out of Kodagu, Karnataka, India.",

  // Registration numbers — leave empty strings until confirmed
  iecNumber: "",
  gstNumber: "",

  // ---- Products / Trades ----
  trades: [
    {
      id: "guitar-components",
      name: "Guitar Components",
      heading: ["Fretboard", "blanks"],
      description:
        "Precision-cut fretboard blanks, bridge plates, neck blanks and bracing strips, quartersawn for stability and tuned to luthier tolerances.",
      items: ["Fretboard blanks", "Neck blanks", "Bridge plates", "Bracing strips", "Binding"],
      spec: "", // e.g. "Thickness 6–9 mm · MOQ 50 pieces"
    },
    {
      id: "hardwood-furniture",
      name: "Hardwood Furniture",
      heading: ["Carcass", "hardwood"],
      description:
        "Structural and decorative hardwood for furniture manufacture, supplied dimensioned or as sawn timber, kiln-dried to your moisture target.",
      items: ["Structural beams", "Panel stock", "Turned blanks", "Tabletop slabs"],
      spec: "", // e.g. "Moisture ≤12 % · Available S4S or rough sawn"
    },
    {
      id: "plywood-veneer",
      name: "Plywood and Veneer",
      heading: ["Gurjan-faced", "ply"],
      description:
        "Commercial and furniture-grade plywood with gurjan face veneer, plus loose decorative veneer in rosewood, teak and silver oak.",
      items: ["Gurjan-faced ply", "Commercial MR ply", "Decorative veneer sheets", "Face veneer rolls"],
      spec: "", // e.g. "Standard 8×4 ft · 4–25 mm"
    },
  ],

  // ---- Species ----
  // Leave empty until confirmed. Site renders gracefully with no data.
  species: [] as Array<{
    id: string;
    commonName: string;
    botanicalName: string;
    origin: string;
    thicknessRangeMm: [number, number];
    sheetSizes: string[];
    coreType?: string; // for ply
    uses: string;
    isCITES: boolean;
  }>,

  // ---- Guitar Part Specs ----
  guitarParts: [
    {
      id: "headstock",
      name: "Headstock",
      speciesOptions: [] as string[],
      toleranceMm: "",
      finishState: "",
      moq: "",
    },
    {
      id: "neck-blank",
      name: "Neck Blank",
      speciesOptions: [] as string[],
      toleranceMm: "",
      finishState: "",
      moq: "",
    },
    {
      id: "fretboard",
      name: "Fretboard",
      speciesOptions: [] as string[],
      toleranceMm: "",
      finishState: "",
      moq: "",
    },
    {
      id: "nut",
      name: "Nut",
      speciesOptions: [] as string[],
      toleranceMm: "",
      finishState: "",
      moq: "",
    },
    {
      id: "bridge",
      name: "Bridge",
      speciesOptions: [] as string[],
      toleranceMm: "",
      finishState: "",
      moq: "",
    },
    {
      id: "saddle",
      name: "Saddle",
      speciesOptions: [] as string[],
      toleranceMm: "",
      finishState: "",
      moq: "",
    },
    {
      id: "back-sides",
      name: "Back and Sides",
      speciesOptions: [] as string[],
      toleranceMm: "",
      finishState: "",
      moq: "",
    },
    {
      id: "bracing",
      name: "Bracing",
      speciesOptions: [] as string[],
      toleranceMm: "",
      finishState: "",
      moq: "",
    },
    {
      id: "binding",
      name: "Binding",
      speciesOptions: [] as string[],
      toleranceMm: "",
      finishState: "",
      moq: "",
    },
    {
      id: "rosette",
      name: "Rosette",
      speciesOptions: [] as string[],
      toleranceMm: "",
      finishState: "",
      moq: "",
    },
    {
      id: "frets",
      name: "Frets",
      speciesOptions: [] as string[],
      toleranceMm: "",
      finishState: "",
      moq: "",
    },
    {
      id: "tuning-machines",
      name: "Tuning Machines",
      speciesOptions: [] as string[],
      toleranceMm: "",
      finishState: "",
      moq: "",
    },
  ],

  // ---- Certifications ----
  // Leave empty until confirmed. Section shows "Certification details on request" if empty.
  certifications: [] as Array<{ name: string; standard: string; number: string }>,

  // ---- Ports ----
  // Fill with real origin and destination ports.
  originPorts: ["Mangaluru", "Cochin"],
  destinationPorts: [] as Array<{
    name: string;
    country: string;
    transitDays: string; // "indicative" — leave empty if unknown
    incoterms: string[];
  }>,

  // ---- Compliance / Spec Sheet ----
  compliance: {
    moistureContentAtDispatch: "", // e.g. "8–12%"
    gradingStandard: "",
    phytosanitaryTreatment: "ISPM-15 heat treatment",
    packingSpec: "",
    documentsIssued: [
      "Commercial invoice",
      "Packing list",
      "Certificate of origin",
      "Phytosanitary certificate",
      "Bill of lading",
    ],
    incotermsOffered: ["FOB", "CIF", "EXW"],
    leadTimeDays: "", // e.g. "21–28"
  },

  // ---- FAQs ----
  faqs: [
    {
      q: "Can I get a sample before ordering a container?",
      a: "Yes. We ship sample crates of the specific species and dimensions you need, against your own specification. Use the form below to request one.",
    },
    {
      q: "What is your minimum order for guitar parts specifically?",
      a: "Confirm with us — MOQ varies by part and species. Because offcuts from furniture stock become instrument parts, we can sometimes supply small quantities of components that other exporters require by the container.",
    },
    {
      q: "What happens if the moisture content is out of spec on arrival?",
      a: "Confirm with us — we will be direct with you about our remediation process before launch. We re-check moisture at dispatch and pack to the schedule we agree.",
    },
    {
      q: "Do you export the species I need, and is it CITES-restricted?",
      a: "Confirm with us — species availability and CITES status depends on the specific wood. Contact us with the species name and we will tell you plainly whether we can supply it legally.",
    },
    {
      q: "Who handles customs at my end?",
      a: "You or your freight forwarder handle import customs. We issue all the documents required for clearance: phytosanitary certificate, certificate of origin, commercial invoice, packing list and bill of lading.",
    },
    {
      q: "How do I pay, and what are your terms?",
      a: "Confirm with us — terms are agreed order by order. We will discuss this directly when you submit a quote request.",
    },
  ],
} as const;

export type Trade = (typeof SITE.trades)[number];
export type Species = (typeof SITE.species)[number];
export type GuitarPart = (typeof SITE.guitarParts)[number];
export type FAQ = (typeof SITE.faqs)[number];
