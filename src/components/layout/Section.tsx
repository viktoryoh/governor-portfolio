import { ReactNode } from "react";
import Container from "./Container";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export default function Section({
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      className={`
        relative
        py-24
        md:py-32
        overflow-hidden
        ${className}
      `}
    >
      <Container>{children}</Container>
    </section>
  );
}

