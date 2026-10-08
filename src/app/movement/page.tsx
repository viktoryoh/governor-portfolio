import Image from "next/image";
import Link from "next/link";
import styles from "./movement.module.css";
import movementPortrait from "../../../public/images/movement-cutout.png";

export const metadata = {
  title: "ARISE | Governor Umo Eno",
  description: "The journey continues. Governor Umo Eno, Akwa Ibom State.",
};

export default function MovementPage() {
  return (
    <main className={styles["movement-stage"]}>
      <div className={styles["movement-closing"]}>
        <div className={styles["movement-folio"]}>
          <Link href="/" aria-label="Return to Home" title="Home" className={styles["movement-home-logo"]}>
            <Image src="/images/state-logo.png" alt="Akwa Ibom State crest" width={52} height={52} loading="eager" />
          </Link>
          <div className={styles["movement-arise-logo"]}>
            <Image src="/images/arise-logo.png" alt="ARISE Agenda logo" fill sizes="144px" loading="eager" />
          </div>
        </div>
        <div className={styles["movement-figure"]}>
          <Image
            src={movementPortrait}
            alt="Governor Umo Eno walking forward"
            fill
            sizes="(max-width: 639px) 80vw, 55vh"
            quality={95}
            loading="eager"
            fetchPriority="high"
            className={styles["movement-portrait"]}
          />
        </div>
        <div className={styles["movement-signature"]}>
          <h1 className={styles["movement-title"]} aria-label="ARISE">
            <span className={styles["movement-word"]} aria-hidden="true">
              {Array.from("ARISE").map((letter) => <span key={letter} className={styles["movement-letter"]}>{letter}</span>)}
            </span>
            <span className={styles["movement-dots"]} aria-hidden="true">
              {[0, 1, 2].map((dot) => <span key={dot} className={styles["movement-dot"]}>.</span>)}
            </span>
          </h1>
          <p className={styles["movement-message"]}>The journey continues.</p>
        </div>
        <div className={styles["movement-colophon"]}>
          <span>Akwa Ibom State</span>
          <span>Progress. Continuity.</span>
        </div>
      </div>
    </main>
  );
}
