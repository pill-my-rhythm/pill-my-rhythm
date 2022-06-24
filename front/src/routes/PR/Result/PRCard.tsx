import React, { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../../Dispatcher";
import { PillData } from "./PRList";
import PRModal from "./PRModal";
import { get, post, del } from "../../../Api";
import { BookMark, FilledBookMark } from "./BookMark";

const PRCard = ({ pr }: PillData) => {
  const userState = useContext(UserStateContext);
  const supplement_id = pr.id;
  const bookmark_id = pr.id;

  const [bookMark, setBookMark] = useState<Boolean>(false);
  const [bookMarkList, setBookMarkList] = useState([]);

  const checkBookMark = (bookMarkList: Array<any>) => {
    if (bookMarkList.some((Supplement) => Supplement.pk_supplement_id === pr.id)) {
      setBookMark(true);
    } else {
      setBookMark(false);
    }
  };

  const loadBookMarkList = async () => {
    try {
      const res = await get("bookmark");
      console.log(res);
      setBookMarkList(res.data);
      checkBookMark(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookMark: any = async (Bookmarked: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const data = {
        accessToken: userState.user.accessToken,
        supplement_id: pr.id,
      };
      if (!Bookmarked) {
        const res = await post(`bookmark/create/${supplement_id}`, data);
        console.log(res);
      } else {
        console.log("삭제");
        await del("bookmark", `${pr.id}`);
      }
      loadBookMarkList();
      console.log("#BookMark");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBookMarkList();
  }, [setBookMark]);

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
          {bookMark ? (
            <label htmlFor="">
              <BookMark onClick={() => handleBookMark(!bookMark)} />
            </label>
          ) : (
            <label htmlFor="">
              <FilledBookMark onClick={() => handleBookMark(!bookMark)} />
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
