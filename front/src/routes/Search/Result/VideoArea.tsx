import React from "react";

const VideoArea = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#7FDCDC] to-[#E3F2ED]">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-screen p-2 flex flex-wrap flex-row-reverse items-center justify-center">
          <div className="p-4 w-full md:w-5/12 ">
            <iframe className="w-full aspect-video rounded-lg shadow-2xl" src="https://www.youtube.com/embed/LTdLVar1FUU" title="youtube" />
          </div>
          <div className="p-2 m-2 break-words text-center">
            <h1 className="text-3xl md:text-5xl font-bold leading-relaxed md:leading-normal text-white mx-3 md:mx-6">
              영양제, 복용하기 전에
              <br />
              정확하게 알고 먹자!
            </h1>
            <p className="mx-3 my-4 md:m-6 leading-loose text-base md:text-lg">
              영양제, 먹는 것 만큼 중요한 올바른 복용법! <br />
              영양제 섭취 전에 주의할 점들을 영상을 통해 확인해보세요😃
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
        <div className="md:h-80 flex items-end">
          <button
            className="bg-transparent flex scroll-smooth"
            onClick={() =>
              window.scrollBy({
                top: window.innerHeight,
                left: 0,
                behavior: "smooth",
              })
            }
          >
            <img src="https://blog.kakaocdn.net/dn/8QI8z/btrBuyNOXqU/iktp61W5CxsECbB0qVKQz0/img.png" alt="scrolldown" width={120} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default VideoArea;
