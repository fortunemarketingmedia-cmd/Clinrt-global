import { deepFreeze } from "../utils";

export const whoWeAreMeaningPoints = deepFreeze([
  "Deep understanding of clinical trial operations",
  "Calm execution in complex, regulated environments",
  "Clear ownership and reliable delivery",
  "Long term partnerships built on trust",
] as const);

export const whoWeAreWhatThisMeansPoints = deepFreeze([
  "Stay aligned across teams, sites, and stakeholders",
  "Make decisions with better clarity and visibility",
  "Maintain consistency and readiness across studies",
  "Reduce day to day operational complexity",
] as const);

export const whoWeAreLeadership = deepFreeze([
  {
    name: "Dr. Maya Srinivasan",
    role: "Chief Executive Officer",
    image: "/images/author-1.jpg",
    summary:
      "Sets the strategic direction for the organization with a strong focus on dependable delivery, and partner trust across complex clinical programs.",
    highlights: ["Strategy & governance", "Operational quality"],
  },
  {
    name: "Rahul Deshmukh",
    role: "Chief Product Officer",
    image: "/images/author-2.jpg",
    summary:
      "Leads product vision and platform decisions around real-world study workflows, scalable architecture, and clear operational usability for trial teams.",
    highlights: ["Product strategy", "Workflow design", "Platform scale"],
  },
  {
    name: "Emily Carter",
    role: "Head of Clinical Solutions",
    image: "/images/author-3.jpg",
    summary:
      "Brings clinical and operational needs into practical solution design, helping sponsors and delivery teams execute with clarity, control, and consistency.",
    highlights: ["Clinical operations", "Solution design", "Execution clarity"],
  },
] as const);

export const whoWeAreLeadershipPrinciples = deepFreeze([
  {
    title: "Reliability first",
    text: "Stability and consistency are essential.",
  },
  {
    title: "Clarity over complexity",
    text: "Simple, purposeful approaches.",
  },
  {
    title: "Strong follow through",
    text: "Planning and delivery with discipline.",
  },
  {
    title: "Practical innovation",
    text: "Improving how work gets done without unnecessary change.",
  },
] as const);

export const whoWeAreMissionPoints = deepFreeze([
  "Linking essential workflows into one cohesive operating system",
  "Improving data quality and giving teams better oversight",
  "Designing solutions that scale across programs, phases, and global regions",
] as const);

export const whoWeAreHowWeWorkPoints = deepFreeze([
  "We listen before we design",
  "We prioritise clarity over speed",
  "We plan carefully and follow through",
  "We take responsibility for outcomes",
] as const);

export const whoWeAreCulture = deepFreeze([
  {
    title: "Integrity",
    text: "We operate with unwavering integrity because clinical research demands nothing less.Every decision, workflow, and line of data must meet the highest standards of accuracy and compliance.",
  },
  {
    title: "Ownership",
    text: "We believe in accountability at every level.Each team member takes responsibility for outcomes, delivers with purpose, and follows through with discipline.Ownership fuels reliability — ensuring our partners can trust the systems and solutions we build.",
  },
  {
    title: "Innovation",
    text: "Innovation isn’t an initiative — it’s our mindset.We challenge legacy processes, embrace modern architectures, and continuously evolve to meet the complexity of today’s trials.Our teams push boundaries to build technology that is not only functional, but transformative for clinical operations.",
  },
  {
    title: "Collaboration",
    text: "Cross functional teamwork is at the heart of everything we do.We work as one; engineering, product, clinical, operations, and delivery, moving in sync to create solutions that are intuitive, stable, and aligned with real world research needs.",
  },
  {
    title: "Impact",
    text: "Our work ultimately supports the people who need it most — patients.Every workflow we streamline, every dataset we protect, and every system we strengthen contributes to better research outcomes and faster medical advancements.",
  },
] as const);

export const whoWeAreTeamStats = deepFreeze([
  { value: 50, suffix: "+", label: "Years of Consolidated Experience in CTSM" },
  { value: 1000, suffix: "+", label: " Clinical Trials Supported" },
  {
    value: 500,
    suffix: "+",
    label: "Clients Catered with IRT and CTSM Services",
  },
] as const);
