import React from "react";

type DashCardProps = {
  title: string;
  value: number;
  disclaimer: string;
  cardBgColor?: string;
  textBgColor?: string;
  iconColor?: string;
};

const DashCard: React.FC<DashCardProps> = ({
  title,
  value,
  disclaimer,
  cardBgColor = "primary",
  textBgColor = "primary",
  iconColor = "primary",
}) => {
  const formatNumber = (number: number) => {
    return new Intl.NumberFormat("th-TH").format(number);
  };
  const formattedValue = formatNumber(value);

  const cardClassName = `rounded-lg border bg-${cardBgColor} text-card-foreground shadow-sm `;
  const textClassName = `tracking-tight text-${textBgColor} text-xs sm:text-xl md:text-2xl font-medium`;
  const iconClassName = `w-4 h-4 text-${iconColor}`;

  return (
    <div className={cardClassName} data-v0-t="card">
      <div className="p-6 flex flex-row items-center justify-between pb-2 pt-2 space-y-0">
        <h3 className={textClassName}>{title}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClassName}
        >
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </div>
      <div className="p-3">
        <div
          className={`text-2xl sm:text-4xl md:text-5xl text-center font-bold text-${textBgColor}`}
        >
          {formattedValue}
        </div>
        <p
          className={`text-${textBgColor} text-xs mt-5 text-red-500 text-end dark:text-gray-400`}
        >
          {disclaimer}
        </p>
      </div>
    </div>
  );
};

export default DashCard;
