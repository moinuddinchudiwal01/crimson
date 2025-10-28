import styles from "./SkeletonCard.module.scss";

export default function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.media}></div>
      <div className={styles.content}>
        <div className={styles.title}></div>
        <div className={styles.lines}>
          <div className={`${styles.line} ${styles.medium}`}></div>
          <div className={`${styles.line} ${styles.short}`}></div>
          <div className={`${styles.line} ${styles.long}`}></div>
        </div>
        <div className={styles.footer}>
          <div className={`${styles.line} ${styles.short}`}></div>
        </div>
      </div>
    </div>
  );
}
