import React, { useCallback, useEffect, useState } from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";
import { useLocation } from "react-router-dom";
import { get } from "../../Api";
import SupCard from "./SupCard";
import { Result } from "./SupSearch";
import { CardList, PagingWrap } from "./SupStyled";

interface ResultProps {
  searchResult: Result[];
  setSearchResult: React.Dispatch<React.SetStateAction<Result[]>>;
}

function SupSearchResult({ searchResult, setSearchResult }: ResultProps) {
  const location = useLocation();
  const word = new URLSearchParams(location.search).get("word");
  const [page, setPage] = useState(1);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setPage(page);
  };

  const fetchSearchSup = useCallback(async () => {
    if (word) {
      const res = await get(`supplement?page=${page}&search_name=${word}`);
      setSearchResult(res.data);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [page]);

  useEffect(() => {
    fetchSearchSup();
  }, [fetchSearchSup]);

  return (
    <>
      {searchResult.map((data) => (
        <CardList key={data.pk_supplement_id}>
          <SupCard data={data} />
        </CardList>
      ))}
      <PagingWrap>
        <Pagination activePage={page} itemsCountPerPage={searchResult.length} totalItemsCount={500} pageRangeDisplayed={10} prevPageText="‹" nextPageText="›" onChange={handlePageChange} />
      </PagingWrap>
    </>
  );
}

export default SupSearchResult;
