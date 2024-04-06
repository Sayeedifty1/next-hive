"use client";

import { ComponentProps } from "react";
import { experimental_useFormStatus as useFromStatus } from "react-dom";
type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFromStatus();
  return (
    <button
      {...props}
      type="submit"
      disabled={pending}
      className={`btn-primary btn ${className}`}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
}
