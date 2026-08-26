/**
 * 设计提示：赤砂石的门槛——以布兰德门尖拱与台阶构成低调、可缩放的遗产标志。
 */
type BrandMarkProps = {
  className?: string;
  title?: string;
};

export function BrandMark({ className = "", title = "Fatehpur Sikri guide mark" }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <path d="M12 62V36C12 19.432 23.047 8 36 8C48.953 8 60 19.432 60 36V62" fill="#B74E32" />
      <path d="M21 62V37C21 25.76 27.703 18 36 18C44.297 18 51 25.76 51 37V62" fill="#F4EBD8" />
      <path d="M27 62H45" stroke="#3A2620" strokeWidth="4" strokeLinecap="square" />
      <path d="M24 54H48" stroke="#3A2620" strokeWidth="4" strokeLinecap="square" />
      <path d="M22 46H50" stroke="#3A2620" strokeWidth="4" strokeLinecap="square" />
      <path d="M12 62H60" stroke="#3A2620" strokeWidth="4" strokeLinecap="square" />
    </svg>
  );
}
