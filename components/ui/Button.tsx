import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons";
import { FiArrowUpRight } from "react-icons/fi";
import { cn } from "@/lib/cn";

type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  label: string;
  icon?: IconType;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export default function Button(props: ButtonProps) {
  const {
    label,
    icon: Icon = FiArrowUpRight,
    size = "md",
    className = "uppercase",
    ...rest
  } = props;

  const sharedProps = {
    className: cn("btn", className),
    "data-size": size,
  } as const;

  const content = (
    <span className="btn-content">
      <span className="btn-label">{label}</span>
      <Icon className="btn-icon" aria-hidden="true" />
    </span>
  );

  if ("href" in props) {
    const { href, ...linkProps } = rest as ButtonAsLink;
    return (
      <Link href={href} data-kind="link" {...sharedProps} {...linkProps}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest as ButtonAsButton;
  return (
    <button type={type} data-kind="button" {...sharedProps} {...buttonProps}>
      {content}
    </button>
  );
}
