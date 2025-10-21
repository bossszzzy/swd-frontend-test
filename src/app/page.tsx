"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className={styles.page}>
      <Link href={"/test1"} className={styles.button}>
        <div className={styles.gap}>
          <div>{t("homepage.title.test1")}</div>
          <div>{t("homepage.description.desc1")}</div>
        </div>
      </Link>
      <Link href={"/test2"} className={styles.button}>
        <div className={styles.gap}>
          <div>{t("homepage.title.test2")}</div>
          <div>{t("homepage.description.desc2")}</div>
        </div>
      </Link>
    </div>
  );
}
