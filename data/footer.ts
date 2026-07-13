import { deepFreeze } from "./utils";
import type { FooterData } from "./types";
import { validateFooter } from "./validators";
import { getContactFormHref } from "./pages/contact";

/** Footer content and links. */
export const footerData: FooterData = validateFooter(
  deepFreeze({
    description:
      "ClinRT supports sponsors, CROs, and clinical teams with connected, compliance-aware trial operations.",
    newsletterLabel: "Subscribe to our newsletter",
    newsletterPlaceholder: "Enter your email address",
    newsletterCta: "Join",
    newsletterAgreement: "I agree to the privacy policy.",
    quickLinksLabel: "Quick Links",
    siteNavigationLabel: "Site Navigation",
    servicesLabel: "Social Platforms",
    hoursLabel: "Working Hours",
    quickLinks: [
      { href: "/who-we-are#culture", label: "Our Culture" },
      { href: "/iclinrt#iclinrt-services", label: "iClinRT Services" },
      { href: "/iclinrt#iclinrt-usps", label: "USPs" },
      { href: getContactFormHref("touch"), label: "Careers" },
      { href: "/clinrt-world?tab=Blogs#content-hub", label: "Insights" },
    ],
    siteNavigation: [
      { href: "/", label: "Home" },
      { href: "/who-we-are", label: "About ClinRT" },
      { href: "/iclinrt", label: "iClinRT" },
      { href: "/clinrt-world", label: "ClinRT World" },
      // { href: "/career", label: "Career" },
      { href: "/contact", label: "Contact" },
    ],
    services: [
      "Linkedin",
      "Instagram",
      "Facebook",
      "Youtube",
    ],
    hours: [
      { label: "Mon - Fri", value: "10:00AM - 07:00PM" },
      { label: "Saturday", value: "12:00AM - 05:00PM" },
      { label: "Sunday", value: "Closed" },
    ],
    copyright: "Copyright 2026 ClinRT. All Rights Reserved.",
  }),
);

