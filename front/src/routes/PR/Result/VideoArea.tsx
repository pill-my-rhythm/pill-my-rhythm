import React from "react";

const VideoArea = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#7FDCDC] to-[#E3F2ED]">
      <div className="w-screen min-h-screen p-2 flex flex-wrap flex-row-reverse items-center justify-center">
        <div className="p-4 w-full md:w-5/12 ">
          <iframe className="w-full aspect-video rounded-lg shadow-2xl" src="https://www.youtube.com/embed/LTdLVar1FUU" title="youtube" />
        </div>
        <div className="p-2 m-2 break-words text-center">
          <h1 className="text-5xl font-bold text-white mr-6 ml-6 leading-normal">
            영양제, 복용하기 전에
            <br />
            정확하게 알고 먹자!
          </h1>
          <p className="m-6 leading-6">
            당신에게 가장 필요한 영양제는 “something” 이예요. <br />
            “something”을 섭취하기 전에 주의할 점을 영상을 통해 확인해보세요😃
          </p>
        </div>
        <ul className="steps md:steps-vertical mb-8">
          <li className="step step-accent">Search</li>
          <li className="step step-accent">AI analysis</li>
          <li className="step step-accent" data-content="✓">
            Result
          </li>
        </ul>
      </div>
    </div>
  );
};
export default VideoArea;
