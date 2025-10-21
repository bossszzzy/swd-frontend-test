import Link from "next/link";
import styles from "./page.module.css";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();
  return (
    <div className={styles.page}>
      <Link href={"/test1"} className={styles.button}>
        <div className={styles.gap}>
          <div>แบบทดสอบที่ 1</div>
          <div>การจัดการหน้าเว็บ</div>
        </div>
      </Link>
      <Link href={"/test2"} className={styles.button}>
        <div className={styles.gap}>
          <div>แบบทดสอบที่ 2</div>
          <div>การเชื่อมต่อ API</div>
        </div>
      </Link>
    </div>
  );
}
