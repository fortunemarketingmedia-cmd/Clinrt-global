"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type {
  ComponentProps,
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { Children, isValidElement, useEffect, useState } from "react";
import { FiArrowRight, FiShield } from "react-icons/fi";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import ScrollReveal from "@/components/animations/ScrollReveal";
import {
  contactChannels,
  contactDemoInterestOptions,
  contactDemoTimelineOptions,
  contactFileConstraints,
  contactFileMimeTypes,
  contactFormActionPath,
  contactFormOptions,
  contactHero,
  contactInfoBlock,
  contactMapBlock,
  contactTouchEnquiryTypeOptions,
  getBrochureBySlug,
  getBrochureHref,
  type ContactFormType,
} from "@/data";
import {
  sanitizeEmailValue,
  sanitizePhoneValue,
  sanitizeTextValue,
} from "@/lib/sanitize";
import SectionBadge from "@/components/ui/SectionBadge";

const ContactMap = dynamic(() => import("@/components/ContactMap"), {
  ssr: false,
});

const fieldClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-[0_10px_30px_rgba(15,36,58,0.05)] transition focus:border-[#0f243a]/35 focus:outline-none focus:ring-4 focus:ring-[#0f243a]/10";
const selectClass = `${fieldClass} appearance-none`;

type InputProps = InputHTMLAttributes<HTMLInputElement>;
const Input = ({ className, ...props }: InputProps) => (
  <input {...props} className={cn(fieldClass, className)} />
);

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;
const Select = ({ className, ...props }: SelectProps) => (
  <select {...props} className={cn(selectClass, className)} />
);

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
const TextArea = ({ className, ...props }: TextAreaProps) => (
  <textarea {...props} className={cn(fieldClass, className)} />
);

const FieldShell = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const isRequired = Children.toArray(children).some(
    (child) =>
      isValidElement<ComponentProps<"input">>(child) &&
      Boolean(child.props.required),
  );

  return (
    <label className="grid gap-2">
      <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
        {label}
        {isRequired ? (
          <span className="ml-1 text-[#f97316]" aria-hidden="true">
            *
          </span>
        ) : null}
      </span>
      {children}
    </label>
  );
};

const submissionErrorMessages: Record<string, string> = {
  email_failed:
    "We could not send your message right now. Please try again or email enquiry@clinrtglobal.com directly.",
  email_unavailable:
    "The email service is not configured yet. Please contact enquiry@clinrtglobal.com directly for now.",
  invalid_file: contactFileConstraints.errorMessage,
  invalid_origin:
    "We could not verify this submission. Please reload the page and try again.",
  invalid_submission:
    "Please review the highlighted information and try submitting the form again.",
  rate_limited:
    "Too many submissions were received from this connection. Please wait a few minutes and try again.",
};

type ContactSubmissionApiResponse = Readonly<
  | {
      ok: true;
      redirectTo: string;
    }
  | {
      errorCode?: string;
      ok: false;
      redirectTo?: string;
    }
>;

const CheckboxRow = ({ label, name }: { label: string; name: string }) => (
  <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-600">
    <input
      type="checkbox"
      name={name}
      value="yes"
      required
      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0f243a] focus:ring-[#0f243a]"
    />
    <span>
      {label}
      <span className="ml-1 text-[#f97316]" aria-hidden="true">
        *
      </span>
    </span>
  </label>
);

function resolveRequestedForm(
  requestedForm: string | null,
  hasBrochureRequest: boolean,
): ContactFormType {
  if (requestedForm === "demo" || requestedForm === "touch") {
    return requestedForm;
  }

  if (requestedForm === "community" || hasBrochureRequest) {
    return "touch";
  }

  return "demo";
}

function resolveSubmittedFormId(form: HTMLFormElement): ContactFormType {
  const rawValue = form.elements.namedItem("contactFormId");

  if (
    rawValue instanceof HTMLInputElement &&
    (rawValue.value === "demo" || rawValue.value === "touch")
  ) {
    return rawValue.value;
  }

  return "demo";
}

export default function Contact() {
  const searchParams = useSearchParams();
  const brochure = getBrochureBySlug(searchParams.get("brochure"));
  const requestedForm = resolveRequestedForm(
    searchParams.get("form"),
    !!brochure,
  );
  const [activeForm, setActiveForm] = useState<ContactFormType>(requestedForm);
  const activeOption =
    contactFormOptions.find((option) => option.id === activeForm) ??
    contactFormOptions[0];
  const submissionErrorCode =
    searchParams.get("status") === "error" ? searchParams.get("error") : null;
  const searchParamSubmissionError =
    submissionErrorCode && submissionErrorMessages[submissionErrorCode]
      ? submissionErrorMessages[submissionErrorCode]
      : null;
  const [liveSubmissionError, setLiveSubmissionError] = useState<string | null>(
    null,
  );
  const [submittingFormId, setSubmittingFormId] =
    useState<ContactFormType | null>(null);
  const submissionError = liveSubmissionError ?? searchParamSubmissionError;
  const activeFormHelper =
    brochure && activeForm === "touch"
      ? `Use this contact form to request the ${brochure.title} brochure. After you submit, the download will start automatically on the confirmation page.`
      : activeOption.helper;

  useEffect(() => {
    setActiveForm(requestedForm);
    setLiveSubmissionError(null);
  }, [requestedForm]);

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const submittedFormId = resolveSubmittedFormId(form);

    if (submittingFormId) {
      return;
    }

    const textFields = form.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >(
      "input:not([type='hidden']):not([type='checkbox']):not([type='file']), textarea",
    );

    textFields.forEach((field) => {
      if (field.name === "email") {
        field.value = sanitizeEmailValue(field.value);
        return;
      }

      if (field.name === "phone") {
        field.value = sanitizePhoneValue(field.value);
        return;
      }

      field.value = sanitizeTextValue(field.value);
    });

    const fileField = form.elements.namedItem("file");
    if (!(fileField instanceof HTMLInputElement) || !fileField.files?.length) {
      if (fileField instanceof HTMLInputElement) {
        fileField.setCustomValidity("");
      }
    } else {
      const [file] = fileField.files;
      const allowedTypes = new Set<string>(contactFileMimeTypes);

      if (
        file.size > contactFileConstraints.maxSizeBytes ||
        !allowedTypes.has(file.type)
      ) {
        fileField.setCustomValidity(contactFileConstraints.errorMessage);
        fileField.reportValidity();
        setLiveSubmissionError(contactFileConstraints.errorMessage);
        return;
      }

      fileField.setCustomValidity("");
    }

    setLiveSubmissionError(null);
    setSubmittingFormId(submittedFormId);

    try {
      const response = await fetch(contactFormActionPath, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: new FormData(form),
      });
      let payload: ContactSubmissionApiResponse | null = null;

      try {
        payload = (await response.json()) as ContactSubmissionApiResponse;
      } catch {
        payload = null;
      }

      if (payload?.ok) {
        window.location.assign(payload.redirectTo);
        return;
      }

      if (
        payload &&
        !payload.ok &&
        payload.errorCode &&
        submissionErrorMessages[payload.errorCode]
      ) {
        setLiveSubmissionError(submissionErrorMessages[payload.errorCode]);
        return;
      }

      if (payload && !payload.ok && payload.redirectTo) {
        window.location.assign(payload.redirectTo);
        return;
      }

      setLiveSubmissionError(submissionErrorMessages.email_failed);
    } catch {
      setLiveSubmissionError(submissionErrorMessages.email_failed);
    } finally {
      setSubmittingFormId(null);
    }
  }

  return (
    <PageTransition>
      {/* ---------------- HERO ---------------- */}

      <section className="relative flex min-h-[78svh] items-end overflow-hidden sm:min-h-[88svh] lg:min-h-screen">
        <Image
          src={contactHero.image}
          alt="ClinRT operations workspace"
          fill
          loading="lazy"
          className="object-cover scale-105"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(224,242,254,0.2)_0%,rgba(167,243,208,0.16)_22%,rgba(14,116,144,0.4)_52%,rgba(15,23,42,0.84)_100%)]" />

        <div className="hero-content-lift relative z-10 section-shell w-full pb-12 pt-24 text-white sm:pb-16 sm:pt-28 md:pb-20 lg:pb-24">
          <ScrollReveal className="mb-8 max-w-3xl sm:mb-12 lg:mb-16">
            <p className="page-banner-title font-semibold">
              {contactHero.punchline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#contact-forms" label="Start a Conversation" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------------- CONTACT FORMS ---------------- */}

      <SectionWrapper fullBleed id="contact-forms">
        <div className="relative mt-12 grid gap-8 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-[#0f243a] px-4 py-6 shadow-[0_35px_120px_rgba(15,36,58,0.2)] sm:mt-16 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-12">
          <Image
            src="/images/operations.avif"
            alt="ClinRT team collaborating on clinical operations"
            fill
            loading="lazy"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,27,46,0.94)_0%,rgba(8,27,46,0.82)_42%,rgba(8,27,46,0.56)_100%)]" />
          <div className="absolute -left-20 top-12 h-48 w-48 rounded-full bg-[#f59e0b]/20 blur-3xl sm:h-64 sm:w-64" />
          <div className="absolute -right-12 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl sm:h-72 sm:w-72" />

          <div className="relative z-10 space-y-6 text-white">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-[1.9rem] border border-white/15 bg-white/10 p-5 backdrop-blur-xl sm:p-6"
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/75">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                {contactHero.eyebrow}
              </p>
            </motion.div>

            <div className="space-y-4">
              {contactFormOptions.map((option, index) => {
                const Icon = option.icon;
                const isActive = activeForm === option.id;
                return (
                  <motion.button
                    key={option.id}
                      type="button"
                      onClick={() => setActiveForm(option.id)}
                      disabled={Boolean(submittingFormId)}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "group w-full rounded-[1.6rem] border px-4 py-4 text-left transition duration-300 disabled:cursor-not-allowed disabled:opacity-70 sm:px-5 sm:py-5",
                        isActive
                          ? "border-white/35 bg-white/18 shadow-xl"
                          : "border-white/12 bg-white/8 hover:border-white/25 hover:bg-white/12",
                    )}
                    aria-pressed={isActive}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span
                          className={cn(
                            "grid h-12 w-12 place-items-center rounded-2xl border text-white",
                            isActive
                              ? "border-white/40 bg-white/20"
                              : "border-white/15 bg-white/10",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="type-h5 font-semibold text-white">
                            {option.title}
                          </p>
                          <p className="mt-2 text-sm text-white/70">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "inline-flex self-start items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em]",
                          isActive
                            ? "border-white/40 bg-white/15 text-white"
                            : "border-white/20 bg-white/10 text-white/70",
                        )}
                      >
                        {option.badge}
                        <FiArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeForm}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.32 }}
              className="relative z-10 rounded-[2rem] border border-white/35 bg-white/92 p-4 shadow-[0_30px_90px_rgba(4,18,33,0.22)] backdrop-blur-2xl sm:p-6"
            >
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                    {activeOption.badge}
                  </p>
                  <h2 className="mt-2 type-h3 font-semibold text-[#0f243a]">
                    {activeOption.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    {activeFormHelper}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-emerald-700">
                  <FiShield className="h-3.5 w-3.5" />
                  Secure Form
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Fields marked
                <span className="mx-1 font-semibold text-[#f97316]">*</span>
                are required.
              </p>

              {submissionError && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-6 rounded-[1.4rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700"
                >
                  {submissionError}
                </div>
              )}

              {brochure && activeForm === "touch" && (
                <div className="mt-6 rounded-[1.75rem] border border-amber-200 bg-[linear-gradient(135deg,rgba(255,251,235,0.98)_0%,rgba(255,247,237,0.98)_100%)] p-4 shadow-[0_18px_50px_rgba(15,36,58,0.08)] sm:p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-amber-700/75">
                        Brochure Access Request
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-[#0f243a]">
                        {brochure.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                        Submit the Get in Touch form to request this brochure.
                        After submission, we will return you to a confirmation
                        screen and start the download automatically.
                      </p>
                    </div>

                    <Link
                      href={getBrochureHref(brochure.slug)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#0f243a] transition hover:text-[#163451]"
                    >
                      Preview brochure first
                      <FiArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.24em]">
                    <span className="rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-amber-700">
                      Contact form required
                    </span>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-700">
                      Instant download after submit
                    </span>
                  </div>
                </div>
              )}

              {activeForm === "demo" && (
                <form
                  action={contactFormActionPath}
                  method="POST"
                  onSubmit={handleFormSubmit}
                  aria-busy={submittingFormId === "demo"}
                  className="mt-6 grid gap-5"
                >
                  <input
                    type="text"
                    name="_honey"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <input type="hidden" name="contactFormId" value="demo" />
                  <input type="hidden" name="formType" value="Request a Demo" />
                  <input type="hidden" name="sourcePage" value="Contact Page" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="First Name">
                      <Input
                        name="firstName"
                        placeholder="Enter first name"
                        autoComplete="given-name"
                        maxLength={80}
                        required
                      />
                    </FieldShell>
                    <FieldShell label="Last Name">
                      <Input
                        name="lastName"
                        placeholder="Enter last name"
                        autoComplete="family-name"
                        maxLength={80}
                        required
                      />
                    </FieldShell>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="Work Email">
                      <Input
                        type="email"
                        name="email"
                        placeholder="name@company.com"
                        autoComplete="email"
                        required
                      />
                    </FieldShell>
                    <FieldShell label="Phone Number">
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="+91 or local number"
                        inputMode="tel"
                        maxLength={20}
                      />
                    </FieldShell>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="Company">
                      <Input
                        name="company"
                        placeholder="Company or organisation"
                        autoComplete="organization"
                        maxLength={120}
                        required
                      />
                    </FieldShell>
                    <FieldShell label="Role">
                      <Input
                        name="designation"
                        placeholder="Clinical operations lead"
                        autoComplete="organization-title"
                        maxLength={120}
                        required
                      />
                    </FieldShell>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="Primary Interest">
                      <Select name="productInterest" defaultValue="" required>
                        <option value="" disabled>
                          Select focus area
                        </option>
                        {contactDemoInterestOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </Select>
                    </FieldShell>
                    <FieldShell label="Expected Timeline">
                      <Select name="timeline" defaultValue="" required>
                        <option value="" disabled>
                          Select timeline
                        </option>
                        {contactDemoTimelineOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </Select>
                    </FieldShell>
                  </div>

                  <FieldShell label="Let us know about your requirement">
                    <TextArea
                      name="message"
                      rows={4}
                      placeholder="Tell us about your study type, current tools, timelines, or the workflows you want to see."
                      className="min-h-[140px] resize-none"
                      maxLength={1200}
                      required
                    />
                  </FieldShell>

                  <CheckboxRow
                    label="I agree to be contacted about my demo request and understand my information will be handled according to the privacy policy."
                    name="consent"
                  />

                  <div className="flex flex-wrap items-center gap-4">
                    <Button
                      label={
                        submittingFormId === "demo"
                          ? "Sending Request"
                          : "Request Demo"
                      }
                      type="submit"
                      disabled={Boolean(submittingFormId)}
                    />
                    <p className="text-sm text-slate-500">
                      We typically route demo requests to the right team within
                      one business day.
                    </p>
                  </div>
                </form>
              )}

              {activeForm === "touch" && (
                <form
                  action={contactFormActionPath}
                  method="POST"
                  encType="multipart/form-data"
                  onSubmit={handleFormSubmit}
                  aria-busy={submittingFormId === "touch"}
                  className="mt-6 grid gap-5"
                >
                  <input
                    type="text"
                    name="_honey"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <input type="hidden" name="contactFormId" value="touch" />
                  <input type="hidden" name="formType" value="Get in Touch" />
                  <input
                    type="hidden"
                    name="sourcePage"
                    value={
                      brochure
                        ? `Brochure Download (${brochure.slug})`
                        : "Contact Page"
                    }
                  />
                  {brochure && (
                    <>
                      <input
                        type="hidden"
                        name="requestedBrochure"
                        value={brochure.title}
                      />
                      <input
                        type="hidden"
                        name="brochureSlug"
                        value={brochure.slug}
                      />
                    </>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="First Name">
                      <Input
                        name="firstName"
                        placeholder="Enter first name"
                        autoComplete="given-name"
                        maxLength={80}
                        required
                      />
                    </FieldShell>
                    <FieldShell label="Last Name">
                      <Input
                        name="lastName"
                        placeholder="Enter last name"
                        autoComplete="family-name"
                        maxLength={80}
                        required
                      />
                    </FieldShell>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="Email">
                      <Input
                        type="email"
                        name="email"
                        placeholder="name@company.com"
                        autoComplete="email"
                        required
                      />
                    </FieldShell>
                    <FieldShell label="Phone Number">
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="Add a direct line"
                        inputMode="tel"
                        maxLength={20}
                        required
                      />
                    </FieldShell>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="Company">
                      <Input
                        name="company"
                        placeholder="Company name"
                        autoComplete="organization"
                        maxLength={120}
                        required
                      />
                    </FieldShell>
                    <FieldShell label="Designation">
                      <Input
                        name="designation"
                        placeholder="Your role"
                        autoComplete="organization-title"
                        maxLength={120}
                      />
                    </FieldShell>
                  </div>

                  <FieldShell label="Enquiry Type">
                    <Select name="enquiryType" defaultValue="" required>
                      <option value="" disabled>
                        Select enquiry type
                      </option>
                      {contactTouchEnquiryTypeOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </Select>
                  </FieldShell>

                  <FieldShell label="Message">
                    <TextArea
                      name="message"
                      rows={4}
                      placeholder="Tell us how we can help."
                      className="min-h-35 resize-none"
                      maxLength={1200}
                      required
                    />
                  </FieldShell>

                  <FieldShell label="Attachment">
                    <Input
                      type="file"
                      name="file"
                      accept={contactFileConstraints.accept}
                      className="file:mr-4 file:rounded-full file:border-0 file:bg-[#0f243a] file:px-4 file:py-2 file:text-xs file:font-medium file:uppercase file:tracking-[0.2em] file:text-white hover:file:bg-[#163451]"
                    />
                  </FieldShell>

                  <CheckboxRow
                    label="I agree to be contacted about my enquiry and accept the privacy policy."
                    name="consent"
                  />

                  <div className="flex flex-wrap items-center gap-4">
                    <Button
                      label={
                        submittingFormId === "touch"
                          ? "Sending Enquiry"
                          : "Submit Enquiry"
                      }
                      type="submit"
                      disabled={Boolean(submittingFormId)}
                    />
                    <p className="text-sm text-slate-500">
                      Use this route for support, services, or broader business
                      conversations.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed className="pb-10 md:pb-16">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-4xl border border-slate-200 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,36,58,0.06)] backdrop-blur md:p-8"
          >
            <SectionBadge>{contactInfoBlock.label}</SectionBadge>
            <p className="mt-3 type-h3 font-semibold text-[#0f243a]">
              {contactInfoBlock.title}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              {contactInfoBlock.description}
            </p>

            <div className="mt-6 grid gap-3">
              {contactChannels.map((item) => {
                const Icon = item.icon;
                const card = (
                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/85 p-4 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[#0f243a]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                          {item.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                );

                if (item.href) {
                  return (
                    <a key={item.title} href={item.href} className="block">
                      {card}
                    </a>
                  );
                }

                return <div key={item.title}>{card}</div>;
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.05 }}
            className="rounded-4xl border border-slate-200 bg-white/85 p-3 shadow-[0_20px_60px_rgba(15,36,58,0.06)] backdrop-blur"
          >
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <SectionBadge>{contactMapBlock.label}</SectionBadge>
                  <h3 className="mt-2 text-2xl font-semibold text-[#0f243a]">
                    {contactMapBlock.title}
                  </h3>
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-slate-600">
                  {contactMapBlock.badge}
                </span>
              </div>

              <div className="mt-5 h-[20rem] w-full overflow-hidden rounded-3xl sm:h-[26rem] lg:h-[32rem]">
                <ContactMap />
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
