import React from "react";

const AnalysisCard = ({ pr }: any) => {
  const polishName = (name: string) => {
    const rename = name.split("</b>").join("").split("<b>").join("");
    return rename;
  };

  return (
    <div
      className="card card-compact w-80 bg-base-100 shadow-xl m-4 flex flex-row justify-center items-center p-2 m-2 cursor-pointer"
      onClick={() => window.open(pr.link, "_blank")}
    >
      <figure>
        <img className="w-24 m-6 rounded-lg backdrop-contrast-125 bg-white/30" src={pr.img_link} alt="pills" />
      </figure>
      <div className="card-body">
        <div className="text-lg items-center break-words">
          <h2 className="px-2">{polishName(pr.name)}</h2>
        </div>
      </div>
    </div>
  );
};
export default AnalysisCard;
