import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { Icon } from "./ui/Icons";
import Button from "./ui/Button";

const initialValues = {
  name: "",
  company: "",
  email: "",
  category: "",
  message: "",
  consent: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Please tell us your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please add an email address.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "That email address does not look right.";
  }

  if (!values.message.trim()) {
    errors.message = "A sentence or two about the request helps us reply well.";
  } else if (values.message.trim().length < 10) {
    errors.message = "A little more detail, please — 10 characters or more.";
  }

  if (!values.consent) {
    errors.consent = "Please confirm we may reply to your request.";
  }

  return errors;
}

function Field({ id, label, error, hint, required = false, children, className }) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-[10px] font-semibold uppercase tracking-label text-ink/60"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-clay-700">
            *
          </span>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-start gap-1.5 text-[11px] font-medium leading-snug text-clay-700"
        >
          <Icon name="close" className="mt-0.5 h-3 w-3 shrink-0" />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-[11px] text-ink/40">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export default function SourcingForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const successRef = useRef(null);

  const errorCount = Object.keys(errors).filter((key) => errors[key]).length;

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    }
  }, [status]);

  const update = (name, value) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) =>
      previous[name] ? { ...previous, [name]: undefined } : previous,
    );
  };

  const fieldClass = (name) =>
    cn(
      "w-full rounded-xl border bg-cream-50 px-4 py-3 text-sm text-ink transition-colors duration-300 placeholder:text-ink/35 focus:bg-white focus:outline-none focus:ring-2",
      errors[name]
        ? "border-clay-600 focus:border-clay-600 focus:ring-clay-600/20"
        : "border-ink/15 focus:border-clay focus:ring-clay/20",
    );

  const describedBy = (name, hint) =>
    errors[name] ? `${name}-error` : hint ? `${name}-hint` : undefined;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("submitting");

    // Front-end demo only — connect this to your CRM, email service or form endpoint.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex min-h-[26rem] flex-col items-center justify-center px-2 text-center sm:min-h-[30rem]"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-clay/20 bg-clay/10 text-clay-700">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h3
          ref={successRef}
          tabIndex={-1}
          className="mt-6 text-balance font-display text-2xl font-semibold tracking-tight text-ink focus:outline-none"
        >
          Your request is with us.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/60">
          Thank you{values.name ? `, ${values.name.trim().split(" ")[0]}` : ""}. A
          senior consultant will reply within one business day with the next step.
        </p>
        <Button
          variant="outline"
          size="sm"
          withArrow={false}
          onClick={reset}
          className="mt-7"
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} aria-busy={status === "submitting"}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            placeholder="Alex Morgan"
            className={fieldClass("name")}
            required
          />
        </Field>

        <Field id="company" label="Company" hint="Optional">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
            aria-describedby="company-hint"
            placeholder="Northline Foods"
            className={fieldClass("company")}
          />
        </Field>

        <Field id="email" label="Work email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            placeholder="alex@company.com"
            className={fieldClass("email")}
            required
          />
        </Field>

        <Field id="category" label="Commodity or category" hint="Optional">
          <input
            id="category"
            name="category"
            type="text"
            value={values.category}
            onChange={(event) => update("category", event.target.value)}
            aria-describedby="category-hint"
            placeholder="Packaging, IT hardware, facilities…"
            className={fieldClass("category")}
          />
        </Field>
      </div>

      <Field
        id="message"
        label="What are you sourcing?"
        error={errors.message}
        hint="Volumes, timelines and who is involved — as much as you can share."
        required
        className="mt-5"
      >
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message", true)}
          placeholder="We buy packaging across three sites, with different suppliers and no shared contract…"
          className={cn(fieldClass("message"), "resize-y")}
          required
        />
      </Field>

      <div className="mt-5">
        <label
          htmlFor="consent"
          className="flex cursor-pointer items-start gap-3 text-[12px] leading-relaxed text-ink/65"
        >
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-ink/30 accent-clay-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400 focus-visible:ring-offset-2"
            required
          />
          <span>
            I&rsquo;m happy for Be Best to contact me about this sourcing request. We
            never share your details.
          </span>
        </label>
        {errors.consent && (
          <p
            id="consent-error"
            className="mt-2 flex items-start gap-1.5 text-[11px] font-medium text-clay-700"
          >
            <Icon name="close" className="mt-0.5 h-3 w-3 shrink-0" />
            {errors.consent}
          </p>
        )}
      </div>

      <p aria-live="polite" className="sr-only">
        {errorCount > 0
          ? `${errorCount} ${errorCount === 1 ? "field needs" : "fields need"} attention.`
          : ""}
      </p>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        withArrow={false}
        disabled={status === "submitting"}
        className="mt-7 w-full"
      >
        {status === "submitting" ? "Sending…" : "Send sourcing request"}
      </Button>

      <p className="mt-4 text-center text-[10px] uppercase tracking-wide2 text-ink/35">
        First reply within one business day
      </p>
    </form>
  );
}
