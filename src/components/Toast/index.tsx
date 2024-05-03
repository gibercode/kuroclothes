import styles from "./styles.module.scss";

type ToastProps = {
  text: string;
  status: number;
};

const animation: Record<number, any> = {
  0: styles.toast,
  1: styles.toastIn,
  2: styles.toastOut,
};

export const Toast = ({ text, status = 0 }: ToastProps) => {
  return (
    <div className={animation[status]}>
      <img src="/cancel.png" alt="cancel icon" width={20} height={20} />
      <p className={styles.text}>{text}</p>
    </div>
  );
};
