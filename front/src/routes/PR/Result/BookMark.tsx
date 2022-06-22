import React from "react";
import styled from "styled-components";

const BookMark = () => {
  return (
    <TransparentButton type="button">
      <label htmlFor="">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </label>
    </TransparentButton>
  );
};

const FilledBookMark = () => {
  return (
    <TransparentButton>
      <label htmlFor="">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="fill-red-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </label>
    </TransparentButton>
  );
};

export { BookMark, FilledBookMark };

const TransparentButton = styled.button`
  stroke: #fff;
  fill: #fff;
  fill-opacity: 0;
  stroke-opacity: 0;
`;
