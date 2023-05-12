import classNames from "classnames";

type Props = {
  active?: boolean;
  className?: string;
  dotClassName?: string;
};

export default function Toggle({ active, className, dotClassName }: Props) {
  const activeClass = "bg-white transform translate-x-full";
  const inactiveClass = "bg-white";
  return (
    <button
      type="button"
      className={classNames("w-10 h-[22px] flex items-center rounded-full p-[1px] cursor-pointer", className, {
        "bg-jupiter-jungle-green": active,
        "bg-[#010101]": !active,
      })}
    >
      <div
        className={classNames(
          `w-[18px] h-[18px] rounded-full shadow-md transform duration-300 ease-in-out`,
          active ? activeClass : inactiveClass,
          dotClassName,
        )}
      />
    </button>
  );
}
