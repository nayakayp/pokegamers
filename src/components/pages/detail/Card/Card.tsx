import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  badge?: number;
};

const Card = ({ children, title, badge }: Props) => {
  return (
    <div className="border rounded">
      <div className="flex px-6 py-4 border-b pb-4 items-center justify-between ">
        <h3 className="text-xl font-semibold">{title}</h3>
        {badge && (
          <span className="bg-gray-500 text-gray-900 px-4 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <div className="px-6 py-4">{children}</div>
    </div>
  );
};

export default Card;
