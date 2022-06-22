import React, { useContext, useState } from "react";
import { UserStateContext } from "../../../Dispatcher";
import { PillData } from "./PRList";
import PRModal from "./PRModal";
import { post, del } from "../../../Api";
import { BookMark, FilledBookMark } from "./BookMark";
import styled from "styled-components";

const PRCard = ({ pr }: PillData) => {
  const userState = useContext(UserStateContext);
  const isLogin = !!userState.user;
  console.log("PRCard#userState", userState);
  console.log("PRCard#userStateToken", userState.user?.accessToken);
  console.log(pr.id);
  const supplement_id = pr.id;

  const [bookMark, setBookMark] = useState<Boolean>(false);

  const handleBookMark: any = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const data = {
        accessToken: userState.user.accessToken,
        supplement_id: pr.id,
      };
      await post(`bookmark/create/${supplement_id}`, data);
      // } else {
      //   await del ("like/delete", "", data);
      setBookMark(true);
    } catch (error) {
      console.log(error);
    }
  };

  const Testing = (e: React.MouseEvent<HTMLButtonElement>) => {
    const data = {
      accessToken: userState.user.accessToken,
      supplement_id: pr.id,
    };
    console.log(data);
  };

  return (
    <div className="card card-compact w-80 bg-base-100 shadow-xl m-4">
      <figure>
        <img className="w-48 m-6 rounded-lg backdrop-contrast-125 bg-white/30" src={pr.img} alt="pills" />
      </figure>
      <div className="card-body">
        <div className="flex flex-row flex-wrap items-center">
          <h2 className="card-title">{pr.name}</h2>
        </div>
        <p className="m-1 break-words">{pr.functuion}</p>
        <div className="card-actions justify-end items-center">
          {!bookMark ? (
            <label htmlFor="">
              <TransparentButton type="button" onClick={handleBookMark}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </TransparentButton>
            </label>
          ) : (
            <label htmlFor="">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="fill-red-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </label>
          )}
          <label htmlFor={`modal-${pr.name}`} className="btn modal-button btn-primary">
            더 알아보기
          </label>
          <PRModal pr={pr} key={pr.id} />
        </div>
      </div>
    </div>
  );
};
export default PRCard;

const TransparentButton = styled.button`
  width: 40px;
  height: 100%;
  fill: #fff;
`;
