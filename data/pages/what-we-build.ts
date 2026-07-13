import { deepFreeze } from "../utils";

export const whatWeBuildSupportAreas = deepFreeze([
  "Coordinated participant and treatment workflows",
  "Reliable Investigational Product Management",
  "Structured Clinical Data Capture",
  "Digital patient and clinician assessment tools",
  "Streamlined operational oversight across sites and teams",
] as const);

export const whatWeBuildSolutionCards = deepFreeze([
  {
    title: "iClinRT",
    text: "Interactive Response Technology for trial operations, allocation logic, and supply coordination.",
    href: "/iclinrt",
    status: "Live Platform",
    image: "/images/why-choose-image.jpg",
  },
  {
    title: "EDC",
    text: "Electronic data capture designed for cleaner inputs, faster review cycles, and better monitoring confidence.",
    href: "/coming-soon",
    status: "Beta Testing",
    image: "/images/case-study-1.jpg",
  },
  {
    title: "CTMS",
    text: "Clinical trial management workflows for timelines, budgets, and cross-functional coordination.",
    href: "/coming-soon",
    status: "In Development",
    image: "/images/case-study-2.jpg",
  },
  {
    title: "eCOA",
    text: "Digital patient outcomes capture with dependable compliance and patient-friendly interaction models.",
    href: "/coming-soon",
    status: "Under Architecture",
    image: "/images/case-study-3.jpg",
  },
] as const);
