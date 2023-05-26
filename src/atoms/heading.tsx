import { ReactNode } from "react";

export default function Heading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const baseClass = `text-transparent bg-clip-text bg-gradient-to-r from-[rgba(252,192,10,1)] to-[rgba(78,186,233,1)] 
    animate-hue`;
  const classes = [baseClass, className].join(" ");
  return <span className={classes}>{children}</span>;
}
