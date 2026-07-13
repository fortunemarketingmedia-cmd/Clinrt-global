import {
  FiActivity,
  FiBarChart2,
  FiCheck,
  FiCompass,
  FiCpu,
  FiEye,
  FiGitMerge,
  FiLayers,
  FiSettings,
  FiShield,
  FiShuffle,
  FiTruck,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { deepFreeze } from "../utils";

export const iclinrtPhases = deepFreeze([
  { title: "Study Planning", subtitle: "Study Inception Phase" },
  { title: "Study Design", subtitle: "Build Phase" },
  { title: "System Validation", subtitle: "Validation Phase" },
  { title: "Go Live & Support", subtitle: "Execution Phase" },
  { title: "Study Close", subtitle: "Closure Phase" },
] as const);

export const iclinrtServiceMedia = deepFreeze([
  "/images/Subject Management_compressed.webp",
  "/images/Subject Randomization & Treatment Assignment_compressed.webp",
  "/images/Kit Management and Assignment_compressed.webp",
  "/images/Triggers and Auto Shipments.webp",
  "/images/Kit Expiry Date Management_compressed.webp",
  "/images/Clinical Supply & Site Inventory Management.webp",
  "/images/Cold-Chain and Excursion Handling_compressed.webp",
] as const);

export const iclinrtPotentialMedia = deepFreeze([
  "/images/Management of every Subject_compressed.webp",
  "/images/Fair Treatment Assignments_compressed.webp",
  "/images/Supply That Thinks Ahead_compressed.webp",
  "/images/Smart Kit Assignment_compressed.webp",
  "/images/Safety First - Expiry Under Control_compressed.webp",
  "/images/Kit Lifecycle Tracking_compressed.webp",
  "/images/Controlled Unblinding - For True Emergencies Only_compressed.webp",
  "/images/Reports and Dashboards for Complete Visibility_compressed.webp",
  "/images/Stay Ahead with Notifications and Alerts_compressed.webp",
  "/images/24x7 Expert Assisted Support_compressed.webp",
  "/images/Quick Site-to-Site Transfers_compressed.webp",
  "/images/Cold-Chain and Excursion Handling_compressed.webp",
  "/images/Retention Sample Management_compressed.webp",
  "/images/Study Startup and Go-Live Setup_compressed.webp",
] as const);



export const iclinrtHowItWorksIcons = deepFreeze([
  FiCpu,
  FiShuffle,
  FiTruck,
  FiBarChart2,
] as const);

export const iclinrtUspIcons = deepFreeze([
  FiZap,
  FiUsers,
  FiTruck,
  FiShield,
  FiGitMerge,
  FiActivity,
  FiSettings,
] as const);

export const iclinrtServices = deepFreeze([
  {
    title: "Subject Management",
    items: [
      "Supports screening, enrollment, and subject status updates in real time.",
      "Guides sites through protocol-aligned visit workflows (scheduled or unscheduled).",
      "Applies guardrails to reduce deviations and data entry errors.",
      "Provides clear subject timelines (visit due, completed, missed, rescheduled).",
      "Maintains an audit trail for all subject actions.",
    ],
  },
  {
    title: "Subject Randomization & Treatment Assignment",
    items: [
      "Executes unbiased, protocol-aligned allocation across arms, cohorts, and strata.",
      "Preserves blinding integrity and supports emergency unblinding with full logs.",
      "Handles complex designs (block, stratified, cohort expansion) without delays.",
      "Links treatment assignment to visit dosing for operational consistency.",
      "Captures allocation decisions with time and user stamps for inspection readiness.",
    ],
  },
  {
    title: "Kit Management and Assignment",
    items: [
      "Tracks kit creation, status, and location (depot to site to subject).",
      "Matches the right kit to the right subject and visit per protocol.",
      "Supports returns, quarantines, replacements, and status changes.",
      "Maintains full traceability for accountability and audits.",
    ],
  },
  {
    title: "Triggers and Auto Shipments",
    items: [
      "Predicts site-level demand using enrollment, dosing cadence, and historical use.",
      "Auto-generates resupply shipments based on predefined buffer rules and thresholds.",
      "Minimizes stock-outs and urgent shipments through proactive planning.",
      "Adjusts to changes in recruitment or dosing with dynamic trigger logic.",
      "Provides shipment visibility (created, dispatched, received, reconciled).",
    ],
  },
  {
    title: "Kit Expiry Date Management",
    items: [
      "Monitors expiry per kit or lot and flags early warning windows.",
      "Supports safe dispense rules - does not assign within X days of expiry.",
      "Guides redistribution and replacement to reduce wastage.",
      "Captures expiry-related actions (quarantine, destroy) with documentation.",
      "Surfaces site-level views of usable vs near-expiry inventory.",
    ],
  },
  {
    title: "Clinical Supply & Site Inventory Management",
    items: [
         "End-to-end IMP lifecycle and chain-of-custody management, from packaging to final disposition ",
      "Real-time global and site-level inventory visibility by kit, lot, expiry, and status",
      "Supply planning & compliance readiness, aligning inventory with visit schedules & GxP/inspection needs",
      "Cold-chain and temperature-controlled oversight, including mapping, excursion tracking, & documentation",
"      Automated inventory reconciliation using dispensing, returns, and transfers to reduce manual effort and errors",
      "Controlled supply movements with proactive monitoring, approved site transfers, and expiry or low-stock alerts",
   
    ],
  },
 
] as const);

export const iclinrtRegulatoryStandards = deepFreeze([
  { label: "ICH GCP", abbr: "ICH", logo: "/images/ich.webp" },
  { label: "FDA 21 CFR Part 11", abbr: "FDA", logo: "/images/fda.webp" },
  { label: "GAMP 5", abbr: "GAMP", logo: "/images/gamp.webp" },
  { label: "GXP", abbr: "GXP", logo: "/images/gxpw.webp" },
  { label: "HIPAA", abbr: "HIPAA", logo: "/images/hipaa.webp" },
  { label: "GDPR", abbr: "GDPR", logo: "/images/gdprw.webp" },
  { label: "CDSCO", abbr: "CDSCO", logo: "/images/cdsco.jpeg" },
  { label: "MedRA", abbr: "MED", logo: "/images/meddra.webp" },
  { label: "CDISC", abbr: "CDISC", logo: "/images/cdisc.jpeg" },
  { label: "EU Annex 11", abbr: "EU", logo: "/images/eu.jpeg" },
] as const);

export const iclinrtPotential = deepFreeze([
  {
    title: "Management of every Subject",
    items: [
      "Supports screening, enrollment, and visit flow.",
      "Ensures sites follow protocol-aligned steps.",
      "Keeps subject status clear and organized.",
    ],
  },
  {
    title: "Fair Treatment Assignments",
    items: [
      "Assigns subjects to arms without bias.",
      "Handles cohorts, stratification, and multi-arm setups.",
      "Protects allocation integrity.",
    ],
  },
  {
    title: "Supply That Thinks Ahead",
    items: [
      "Tracks inventory at depots and sites.",
      "Predicts supply needs and auto-triggers shipments.",
      "Helps prevent shortages and reduce wastage.",
    ],
  },
  {
    title: "Smart Kit Assignment",
    items: [
      "Ensures the correct physical kit is given to the right participant.",
      "Checks kit status (available, reserved, expired, returned).",
      "Matches kits to visit schedules in real time.",
      "Minimizes dispensing mistakes at sites.",
    ],
  },
  {
    title: "Safety First - Expiry Under Control",
    items: [
      "Monitors expiry dates continuously.",
      "Alerts teams before a kit expires.",
      "Ensures expired kits are never used.",
    ],
  },
  {
    title: "Kit Lifecycle Tracking",
    items: [
      "Tracks each kit from creation to destruction.",
      "Logs dispensing, returns, and reconciliation.",
      "Maintains inspection-ready records.",
    ],
  },

  {
    title: "Controlled Unblinding - For True Emergencies Only",
    items: [
      "Secure unblinding for medical emergencies.",
      "Logs every action for audit trails.",
      "Protects trial integrity.",
    ],
  },
  {
    title: "Reports and Dashboards for Complete Visibility",
    items: [
      "Real-time view of enrollment, supply, and visits.",
      "Role-based filters for sponsors, CROs, sites, and depots.",
      "Supports faster, more confident decisions.",
    ],
  },
  {
    title: "Stay Ahead with Notifications and Alerts",
    items: [
      "Alerts for supply risk, expiries, shipments, or key events.",
      "Helps teams act early and avoid delays.",
      "Keeps stakeholders aligned.",
    ],
  },
  {
    title: "24x7 Expert Assisted Support",
    items: [
      "Dedicated helpdesk for sites and study teams.",
      "Technical and workflow assistance.",
      "Ensures smooth daily operations.",
    ],
  },
  {
    title: "Quick Site-to-Site Transfers",
    items: [
      "Enables safe, traceable transfers of study drug kits between sites.",
      "Helps manage fast enrollment or local shortages.",
      "Maintains complete visibility during movement.",
    ],
  },
  {
    title: "Cold-Chain and Excursion Handling",
    items: [
      "Tracks temperature-sensitive kits.",
      "Flags excursions for review.",
      "Supports usability decisions and compliance.",
    ],
  },
  {
    title: "Retention Sample Management",
    items: [
      "Manages long-term storage samples.",
      "Tracks movement and location.",
      "Supports regulatory and scientific needs.",
    ],
  },
  {
    title: "Study Startup and Go-Live Setup",
    items: [
      "Configuration, testing, validation, and training.",
      "Ensures readiness before first-patient-in.",
      "Smooth transition into conduct.",
    ],
  },
] as const);

export const iclinrtHowItWorksLayers = deepFreeze([
  {
    title: "Protocol Intelligence",
    text: "Encode study logic, eligibility, and treatment rules into a single source of truth.",
  },
  {
    title: "Workflow Orchestration",
    text: "Coordinate subject visits, randomization, and site actions with protocol-aligned guardrails.",
  },
  {
    title: "Supply and Inventory Engine",
    text: "Automate kit movement, expiry management, and resupply triggers across depots and sites.",
  },
  {
    title: "Insights and Compliance",
    text: "Deliver real-time dashboards, audit trails, and inspection-ready documentation.",
  },
] as const);

export const iclinrtStudyTypes = deepFreeze([
  {
    label: "Oncology",
    detail: "Adaptive cohorts, stratified randomization, and dose changes.",
    icon: FiActivity,
    dotClass: "bg-(--color-accent)",
    position: "2xl:left-0 2xl:top-8",
  },
  {
    label: "Rare Diseases",
    detail: "Tight supply planning for low-volume, high-value populations.",
    icon: FiEye,
    dotClass: "bg-(--color-orange)",
    position: "2xl:right-8 2xl:top-2",
  },
  {
    label: "Biologics",
    detail: "Cold-chain oversight with precise kit and expiry controls.",
    icon: FiLayers,
    dotClass: "bg-emerald-500",
    position: "2xl:left-8 2xl:top-48",
  },
  {
    label: "Vaccine Trials",
    detail: "High-throughput regional rollout with fast site readiness.",
    icon: FiShield,
    dotClass: "bg-sky-500",
    position: "2xl:right-0 2xl:top-46",
  },
  {
    label: "Medical Device Trials",
    detail: "Traceability across serials, lots, returns, and accountability.",
    icon: FiCheck,
    dotClass: "bg-violet-500",
    position: "2xl:left-0 2xl:bottom-24",
  },
  {
    label: "Early to Late Phase Trials",
    detail: "Designed to scale from first-patient-in to global expansion.",
    icon: FiGitMerge,
    dotClass: "bg-amber-500",
    position: "2xl:right-4 2xl:bottom-26",
  },
  {
    label: "Complex Global Programs",
    detail: "Multi-country coordination with protocol control and compliance.",
    icon: FiCompass,
    dotClass: "bg-rose-500",
    position: "2xl:left-1/2 2xl:bottom-4 2xl:-translate-x-1/2",
  },

] as const);

export const iclinrtUsps = deepFreeze([
  {
    title: "Fast 4-Week Setup",
    items: [
      "Rapid configuration and validation to support First Patient In timelines.",
      "Handles multi-arm, cohort-based, and stratified designs without delay.",
      "Streamlined user acceptance testing and protocol-aligned setup.",
    ],
  },
  {
    title: "Deep Industry Expertise",
    items: [
      "Led by teams experienced in IRT and clinical trial supply management.",
      "Strong understanding of real clinical workflows across phases and therapeutic areas.",
      "Practical guidance that supports sites, CROs, and Sponsors.",
    ],
  },
  {
    title: "Smarter Supply Management",
    items: [
      "Predicts supply requirements based on enrollment trends and dosing schedules.",
      "Ensures stable IMP inventory across depots and sites.",
      "Supports site-to-site kit transfers, retention sample management, and cold-chain needs.",
    ],
  },
  {
    title: "Compliance Built-In",
    items: [
      "Aligned with ICH-GCP, 21 CFR Part 11, EU Annex 11, GDPR, and HIPAA.",
      "Features complete audit trails, electronic signatures, and validated workflows.",
      "Ensures records meet ALCOA+ principles for data integrity.",
    ],
  },
  {
    title: "Seamless System Integrations",
    items: [
      "Connects with CTMS and EDC platforms.",
      "Reduces manual reconciliation and improves data consistency.",
      "Supports unified oversight similar to leading integrated platforms.",
    ],
  },
  {
    title: "Designed for Users",
    items: [
      "Clear, real-time dashboards for enrollment, visits, supply, and site performance.",
      "Simple, protocol-aligned workflows minimize site burden.",
      "Supported by a responsive helpdesk for operational and technical queries.",
    ],
  },
  {
    title: "Flexible, Scalable, User-Friendly",
    items: [
      "Adapts to early-phase, late-phase, and global multi-region studies.",
      "Easily accommodates mid-study protocol amendments.",
      "Remains intuitive and reliable as study scope grows.",
    ],
  },
] as const);

export const iclinrtProblemSolutions = deepFreeze([
  {
    problem: "Imbalanced treatment arms in complex designs",
    solution:
      "Protocol-aligned randomization across arms, cohorts, and strata.",
  },
  {
    problem: "Site stock-outs or over-stock",
    solution: "Predictive resupply and automated depot-to-site shipments.",
  },
  {
    problem: "Dispensing errors at the site",
    solution: "Barcode-verified kit assignment at the right visit.",
  },
  {
    problem: "Poor visibility of kit status and movement",
    solution:
      "End-to-end kit traceability from creation to dispense, return, reconcile, and destroy.",
  },
  {
    problem: "Cold-chain uncertainty during storage or transport",
    solution: "Temperature mapping to record, review, and document integrity.",
  },
  {
    problem: "Kits nearing expiry and late action",
    solution: "Expiry tracking with early alerts and replacement guidance.",
  },
  {
    problem: "Retention samples missed or mishandled",
    solution: "Retention sample tracking with clear custody and status.",
  },
  {
    problem: "Inconsistent visit execution across sites",
    solution: "Protocol-driven subject and visit workflows.",
  },
  {
    problem: "Limited real-time oversight for sponsors and CROs",
    solution: "Live dashboards, configurable reports, and event-based alerts.",
  },
  {
    problem: "Operational disruption after protocol amendments",
    solution:
      "Amendment-friendly configuration that updates logic without derailing sites.",
  },
  {
    problem: "Audit and inspection readiness concerns",
    solution:
      "Audit trails, role-based access, e-signatures, and ALCOA+ records.",
  },
  {
    problem: "Multi-country coordination challenges",
    solution:
      "Unified oversight across regions, depots, and sites in one system.",
  },
  {
    problem: "Slow issue resolution at sites",
    solution: "Responsive helpdesk and study support for operational queries.",
  },
  {
    problem: "Data duplication across systems",
    solution:
      "Seamless integrations with CTMS, EDC, and other eClinical platforms.",
  },
] as const);
