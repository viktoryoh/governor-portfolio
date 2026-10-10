import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BiographyMotion } from "./BiographyEnhancements";
import styles from "./Biography.module.css";

export const metadata: Metadata = {
  title: "Governor Umo Eno | ARISE 2027",
  description: "The ARISE Agenda and a vision of continuity for Akwa Ibom in 2027.",
};

function TypedText({ text, pace = 0.035, loopDots = false }: { text: string; pace?: number; loopDots?: boolean }) {
  const words = text.split(" ");
  return (
    <span data-biography-type data-typing-pace={pace}>
      <span className={styles.accessibleText}>{`${text}${loopDots ? "." : ""}`}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <Fragment key={index}>
            {index > 0 && " "}
            <span className={styles.typingWord}>
              {Array.from(word).map((character, characterIndex) => (
                <span key={characterIndex} data-biography-character>{character}</span>
              ))}
              {loopDots && index === words.length - 1 && (
                <span className={styles.typingDots}>
                  {[0, 1, 2].map((dot) => <span key={dot} data-biography-dot>.</span>)}
                </span>
              )}
            </span>
          </Fragment>
        ))}
      </span>
    </span>
  );
}

export default function GovernorBiographyPage() {
  return (
    <BiographyMotion>
      <main className={styles.stage} aria-labelledby="biography-title">
        <div className={styles.portrait}>
          <Image src="/images/projects/umo4.jpg" alt="Governor Umo Eno seated and reading a programme"
            fill sizes="100vw" loading="eager" fetchPriority="high" className={styles.image} data-biography-portrait />
        </div>
        <div className={styles.shade} aria-hidden="true" />
        <header className={styles.header}>
          <Link href="/" className={styles.homeLink} aria-label="Akwa Ibom State, return to home">
            <Image src="/images/state-logo.png" alt="" width={56} height={56} loading="eager" />
            <span>Akwa Ibom State<span>Land of promise</span></span>
          </Link>
          <Link href="/projects" className={styles.backLink}><ArrowLeft size={17} aria-hidden="true" />Back</Link>
        </header>
        <div className={styles.content}>
          <div className={styles.copy} data-biography-opening>
            <p className={styles.governor}><TypedText text="Governor Umo Eno" pace={0.065} /></p>
            <h1 id="biography-title" className={styles.title}>
              <span><TypedText text="ARISE." pace={0.12} /></span>
              <span className={styles.year}><TypedText text="2027." pace={0.12} /></span>
            </h1>
            <h2 className={styles.subtitle}><TypedText text="The vision continues." pace={0.055} /></h2>
            <div className={styles.rule} aria-hidden="true" />
            <p className={styles.description}><TypedText text="Agricultural growth. Connected communities. Lasting infrastructure. Security, education and healthcare. One shared vision for Akwa Ibom." /></p>
            <p className={styles.continuity}><TypedText text="Sustain the ARISE Agenda. Strengthen the foundations. Expand opportunity. In 2027, let us keep moving forward, together" loopDots /></p>
            <Link href="/re-elect" className={styles.reelect}>Re-Elect 2027 <ArrowUpRight size={20} aria-hidden="true" /></Link>
          </div>
        </div>
      </main>
    </BiographyMotion>
  );
}
