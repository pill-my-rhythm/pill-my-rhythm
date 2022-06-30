import React, { useState } from "react";
import { useNavigate } from "react-router";
import { post } from "../../Api";

const Searchbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  const SearchPill = async (e: any) => {
    e.preventDefault();
    try {
      const res = await post(
        "recommend",
        {
          sentence: search,
        },
        "AI",
      );
      console.log(`${search}를 검색합니다.`);
      navigate(`/result`, { state: res.data });
    } catch (error) {
      alert(`${error}로 인해 검색에 실패했습니다.`);
    }
  };

  return (
    <form action="#" method="POST" onSubmit={SearchPill}>
      <div className="form-control">
        <div className="input-group">
          {/* // * 메인 Search창 */}
          <input
            type="search"
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
  );
};
export default Searchbar;
