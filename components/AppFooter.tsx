import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import Button from "@/components/ui/Button";
import { brandLogoSrc, footerData, getContactFormHref } from "@/data";

const socialIcons: Record<string, IconType> = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  youtube: FaYoutube,
};

const socialHrefMap: Record<string, string> = {
  linkedin: "https://www.linkedin.com/company/clinrt-global-services/",
  instagram: "/coming-soon",
  facebook: "/coming-soon",
  youtube: "/coming-soon",
};

export default function AppFooter() {
  const {
    description,
    quickLinksLabel,
    quickLinks,
    siteNavigationLabel,
    siteNavigation,
    servicesLabel,
    services,
    copyright,
  } = footerData;

  return (
    <footer>
      <div className="m-2 sm:m-3">
        <div className="rounded-3xl bg-white px-5 py-8 text-black sm:px-6 sm:py-10 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-[1.15fr_0.7fr_0.8fr_0.8fr_1fr]">
            <div className="sm:col-span-2 xl:col-span-1">
              <div className="flex items-center">
                <Link href="/" className="z-50 flex items-center gap-2">
                  <Image
                    src={brandLogoSrc}
                    alt="ClinRT Logo"
                    width={100}
                    height={50}
                    className="h-9 w-auto sm:h-10"
                    loading="lazy"
                  />
                </Link>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-black/70">
                {description}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider">
                {quickLinksLabel}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-black/70">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider">
                {siteNavigationLabel}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-black/70">
                {siteNavigation.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider">
                {servicesLabel}
              </p>
              <ul className="mt-4 flex flex-wrap gap-3 text-black/70">
                {services.map((service) => {
                  const Icon = socialIcons[service.toLowerCase()] ?? FaGlobe;
                  const href =
                    socialHrefMap[service.toLowerCase()] ?? "/coming-soon";
                  const isExternal = /^https?:\/\//u.test(href);

                  return (
                    <li key={service}>
                      {isExternal ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/8 bg-black/[0.03] text-lg text-black/70 transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                          title={service}
                        >
                          <Icon aria-hidden="true" />
                          <span className="sr-only">{service}</span>
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/8 bg-black/[0.03] text-lg text-black/70 transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                          title={service}
                        >
                          <Icon aria-hidden="true" />
                          <span className="sr-only">{service}</span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col gap-4 border-t border-black/10 pt-4 sm:col-span-2 xl:col-span-1 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
              <p className="text-sm font-semibold uppercase tracking-wider text-black">
                Contact ClinRT
              </p>
              <p className="text-sm leading-relaxed text-black/70">
                Start a conversation with our team for demos, brochure access,
                support questions, or partnership enquiries.
              </p>

              <Button
                href={getContactFormHref("touch")}
                label="Get in touch"
                className="w-full sm:w-auto"
              />
            </div>
          </div>

          <div className="mt-10 border-t pt-6 text-center type-h6 text-black sm:mt-12">
            {copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
