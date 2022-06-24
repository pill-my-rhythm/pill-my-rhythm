import React, { useState } from "react";
import { useNavigate } from "react-router";
import { post } from "../../../Api";

const Main = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const tempNavigate = () => {
    navigate("/result");
  };

  const SearchPill = async (e: any) => {
    e.preventDefault();
    try {
      const res = post(
        "recommend",
        {
          sentence: search,
        },
        "AI",
      );
      console.log("#res", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // img 추후에 asset에 저장할 것!
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: "url(" + "https://r7q6w9z6.rocketcdn.me/career/wp-content/uploads/2021/05/image_processing20210222-9274-1wg7luu.gif?w=1000&h=800" + ")" }}
    >
      <div className="hero-overlay bg-opacity-60" />
      <div className="hero-content text-center text-neutral-content flex flex-col md:flex-row">
        {/* // * Steps (현재 vertical) */}
        <ul className="steps steps-col md:steps-vertical">
          <li className="step step-primary">Search</li>
          <li className="step">AI analysis</li>
          <li className="step">Result</li>
        </ul>
        <div className="max-w-md">
          {/* // * 메인 Title */}
          <h1 className="mb-5 text-5xl font-bold">Pill my rhythm</h1>
          {/* // * 메인 Description */}
          <p className="mb-5 text-base">
            요즘 내 상태를 입력하기만 해도
            <br />
            나에게 필요한 영양제를 추천해주는 서비스가 있다면?
            <br />
            지금 바로 내 상태를 간단하게 입력하고
            <br />
            AI의 분석을 통해 나에게 필요한 영양제를 맞춤 추천 받아보세요!
            <br />
          </p>
          <div className="flex-none gap-2">
            <form action="#" method="POST" onSubmit={SearchPill}>
              <div className="form-control">
                <div className="input-group">
                  {/* // * 메인 Search창 */}
                  <input
                    type="text"
                    placeholder="요즘 눈이 안 좋아요... 면역력이 떨어졌어요..."
                    className="input input-bordered w-5/6 text-zinc-700 text-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
