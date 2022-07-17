import React, { useCallback, useEffect, useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { get } from "../../Api";
import { useInView } from "react-intersection-observer";
import SupCard from "./SupCard";
import { Wrap, SearchHeader, SearchWrapper, InputWrapper, Input, LsWrapper, Form, SearchInp, VerticalDvd, BtnWrapper, Container, CardContainer, ListWrapper, CardList, SortWrapper } from "./SupStyled";
import SupSearchResult from "./SupSearchResult";

export interface Result {
  caution: string;
  company: string;
  function: string;
  how_to_eat: string;
  img_link: string;
  link: string;
  name: string;
  pk_supplement_id: number;
  raw: string;
  shape: string;
  update_date: number;
}

function SupSearch() {
  const location = useLocation();
  const word = new URLSearchParams(location.search).get("word");
  const pageNum = new URLSearchParams(location.search).get("page");
  const navigate: NavigateFunction = useNavigate();
  const [allSup, setAllSup] = useState<Array<Result>>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<Array<Result>>([]);
  const [page, setPage] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchOption, setSearchOption] = useState("search_name");

  const [ref, inView] = useInView();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.currentTarget.value);
  };

  const fetchAllSup = useCallback(async () => {
    if (!word) {
      const res = await get(`supplement?page=${page}`);
      setAllSup((current) => [...current, ...res.data.supplements]);
    }
  }, [page]);

  useEffect(() => {
    fetchAllSup();
  }, [fetchAllSup]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  useEffect(() => {
    if (word) {
      const fetchSearchSup = async () => {
        const res = await get(`supplement?${searchOption}=${word}`);
        setSearchResult([...res.data.supplements]);
      };
      fetchSearchSup();
    }
  }, [searchOption]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.length < 1) {
      alert("검색어를 한 글자 이상 입력해주세요.");
    } else {
      navigate(`?word=${searchValue}&page=${curPage}`);
      const res = await get(`supplement?${searchOption}=${searchValue}`);
      setSearchResult([...res.data.supplements]);
    }
  };

  return (
    <>
      <Wrap>
        <SearchHeader>
          <SearchWrapper>
            <InputWrapper>
              <Input className="shadow-lg">
                <LsWrapper>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" role="img" className="icon fill-current search-icon">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.6002 12.0498C9.49758 12.8568 8.13777 13.3333 6.66667 13.3333C2.98477 13.3333 0 10.3486 0 6.66667C0 2.98477 2.98477 0 6.66667 0C10.3486 0 13.3333 2.98477 13.3333 6.66667C13.3333 8.15637 12.8447 9.53194 12.019 10.6419C12.0265 10.6489 12.0338 10.656 12.0411 10.6633L15.2935 13.9157C15.6841 14.3063 15.6841 14.9394 15.2935 15.33C14.903 15.7205 14.2699 15.7205 13.8793 15.33L10.6269 12.0775C10.6178 12.0684 10.6089 12.0592 10.6002 12.0498ZM11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
                    />
                  </svg>
                  <Form id="SearchForm" onSubmit={handleSubmit}>
                    <SearchInp placeholder="영양제 검색하기" onChange={handleChange} />
                  </Form>
                </LsWrapper>
                <VerticalDvd />
                <BtnWrapper>
                  <button type="submit" form="SearchForm" className="btn btn-ghost">
                    Search
                  </button>
                </BtnWrapper>
              </Input>
            </InputWrapper>
            <SortWrapper>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">영양제 이름으로 검색 (기본)</span>
                  <input type="radio" value="search_name" name="searchName" className="radio radio-black" onChange={handleOptionChange} checked={searchOption === "search_name"} />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">영양제 성분으로 검색</span>
                  <input type="radio" value="search_raw" name="searchRaw" className="radio radio-accent" onChange={handleOptionChange} checked={searchOption === "search_raw"} />
                </label>
              </div>
            </SortWrapper>
          </SearchWrapper>
        </SearchHeader>
      </Wrap>

      {!word ? (
        <Container>
          <CardContainer>
            <ListWrapper>
              {allSup.map((data) => (
                <CardList key={data.pk_supplement_id}>
                  <SupCard data={data} />
                </CardList>
              ))}
              <div ref={ref} />
            </ListWrapper>
          </CardContainer>
        </Container>
      ) : (
        <Container>
          <CardContainer>
            <ListWrapper>
              {searchResult.length === 0 ? (
                <div>검색 결과가 없습니다. 다시 시도해주세요</div>
              ) : (
                <SupSearchResult searchResult={searchResult} setSearchResult={setSearchResult} pageNum={Number(pageNum)} searchOption={searchOption} />
              )}
            </ListWrapper>
          </CardContainer>
        </Container>
      )}
    </>
  );
}

export default SupSearch;
