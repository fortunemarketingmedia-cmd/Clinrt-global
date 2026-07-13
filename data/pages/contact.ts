import {
  FiCalendar,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
} from "react-icons/fi";
import { deepFreeze } from "../utils";
import type { ContactDetails } from "../types";
import { validateContactDetails } from "../validators";

export type ContactFormType = "demo" | "touch";

export type ContactFormOption = Readonly<{
  id: ContactFormType;
  title: string;
  description: string;
  helper: string;
  badge: string;
  icon: typeof FiCalendar;
}>;

export type ContactChannel = Readonly<{
  icon: typeof FiMail;
  title: string;
  value: string;
  href?: string;
}>;

export const contactHero = deepFreeze({
  eyebrow: "Contact ClinRT",
  punchline: "Let's start a conversation",
  image: "/images/Let's start a conversation_compressed.webp",
});

export const contactFormActionPath = "/api/contact";

export const contactFormSuccessPath = "/contact/success";
export const contactFormsSectionId = "contact-forms";

export const contactFileConstraints = deepFreeze({
  accept: ".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp",
  maxSizeBytes: 5 * 1024 * 1024,
  errorMessage:
    "Please upload a PDF, DOC, DOCX, PNG, JPG, JPEG, or WEBP file up to 5MB.",
});

export const contactFileMimeTypes = deepFreeze([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const);

export const contactDemoInterestOptions = deepFreeze([
  "iClinRT platform overview",
  "Randomization workflows",
  "Supply and kit management",
  "Integrations and reporting",
  "Full platform evaluation",
] as const);

export const contactDemoTimelineOptions = deepFreeze([
  "Immediately",
  "Within 30 days",
  "This quarter",
  "Just exploring",
] as const);

export const contactTouchEnquiryTypeOptions = deepFreeze([
  "Product enquiry",
  "Support",
  "Partnership",
  "Careers",
  "Other",
] as const);

export const contactFormOptions: ReadonlyArray<ContactFormOption> = deepFreeze([
  {
    id: "demo",
    title: "Request a Demo",
    description:
      "Book a guided walkthrough of iClinRT, its workflows, and the operating model behind it.",
    helper:
      "Best for sponsors, CROs, and clinical operations teams actively evaluating the platform.",
    badge: "Priority Route",
    icon: FiCalendar,
  },
  {
    id: "touch",
    title: "Get in Touch",
    description:
      "Reach out for support, partnerships, service questions, or a broader conversation with the team.",
    helper:
      "Tell us what you need and we will route your enquiry to the right team quickly.",
    badge: "General Enquiry",
    icon: FiMessageCircle,
  },
]);

export const contactChannels: ReadonlyArray<ContactChannel> = deepFreeze([
  {
    icon: FiMail,
    title: "General enquiries",
    value: "enquiry@clinrtglobal.com",
    href: "mailto:enquiry@clinrtglobal.com",
  },

  {
    icon: FiMail,
    title: "Careers",
    value: "hr@clinrtglobal.com",
    href: "mailto:hr@clinrtglobal.com",
  },
  {
    icon: FiPhone,
    title: "Phone",
    value: "+91 8530067925",
    href: "tel:+918530067925",
  },
  {
    icon: FiMapPin,
    title: "Office",
    value:
      "ClinRT Global Services Pvt. Ltd. 905, Tower 3, Kohinoor World Towers (KWT) PCMC, Pune, Maharashtra 411018, India",
  },
]);

export const contactDetails: ContactDetails = validateContactDetails(
  deepFreeze({
    email: "enquiry@clinrtglobal.com",
    location: "Pune, Maharashtra, India",
    phone: "+91 8530067925",
  }),
);

export const contactInfoBlock = deepFreeze({
  label: "Contact Information",
  title: "Reach the ClinRT team directly",
  description:
    "If you already know where your request belongs, use the details below. For everything else, the forms above are the fastest path.",
});

export const contactMapBlock = deepFreeze({
  label: "Find Us",
  title: "Pune office location",
  badge: "On-site and remote support",
});

export function getContactFormHref(
  form: ContactFormType,
  extraParams?: Record<string, string>,
) {
  const params = new URLSearchParams({
    form,
    ...(extraParams ?? {}),
  });

  return `/contact?${params.toString()}#${contactFormsSectionId}`;
}
