import React, { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../../Dispatcher";
import { PillData } from "./PRList";
import PRModal from "./PRModal";
import { get, post, del } from "../../../Api";
import { BookMark, FilledBookMark } from "./BookMark";

const PRCard = ({ pr }: PillData) => {
  const userState = useContext(UserStateContext);
  const isLogin = !!userState.user;
  const supplement_id = pr.pk_supplement_id;

  // console.log("#pr.pk_supplement_id", pr.pk_supplement_id);

  const [bookMark, setBookMark] = useState<Boolean>();
  const [bookMarkList, setBookMarkList] = useState([]);

  const DBcheckBookMark = (bookMarkList: Array<any>) => {
    if (bookMarkList.some((Supplement) => Supplement.Supplement.pk_supplement_id === pr.pk_supplement_id)) {
      setBookMark(true);
    } else {
      setBookMark(false);
    }
  };

  const loadBookMarkList = async () => {
    if (isLogin)
      try {
        const res = await get("bookmark");
        setBookMarkList(res.data);
        DBcheckBookMark(res.data);
      } catch (error) {
        console.log(error);
      }
  };

  const HandleBookMarkChange: any = async () => {
    try {
      const data = {
        accessToken: userState.user.accessToken,
        supplement_id: pr.pk_supplement_id,
      };
      if (!bookMark) {
        const res = await post(`bookmark/create/${supplement_id}`, data);
        console.log("#BookMark", res);
      } else {
        const res = await del("bookmark", `${pr.pk_supplement_id}`);
        console.log("#BookMarkDelete", res);
      }
      loadBookMarkList();
    } catch (error) {
      console.log(error);
    }
  };

  // * 처음에 get해서 북마크 상태를 불러오는 게 맞았습니다! 그래서 다시 load하니까 잘 동작하더라구요.. 화면 공유해서 여쭤볼 때는 새로고침된 상태여서 무한 로딩이 일어났던 것 같습니다.
  useEffect(
    () => {
      loadBookMarkList();
      // DBcheckBookMark(bookMarkList);
    },
    [bookMark],
    // [bookMark, bookMarkList],
  );

  return (
    <div className="card card-compact w-80 bg-base-100 shadow-xl m-4">
      <figure>
        <img className="w-48 m-6 rounded-lg backdrop-contrast-125 bg-white/30" src={pr.img_link} alt="pills" />
      </figure>
      <div className="card-body">
        <div className="flex flex-row flex-wrap items-center break-words">
          <h2 className="card-title px-2">{pr.name}</h2>
        </div>
        <hr />
        <p className="p-2 h-max m-1 break-words">{pr.function}</p>
        <div className="card-actions justify-end items-center">
          {!isLogin ? (
            <label htmlFor="">
              <BookMark onClick={() => alert("회원 전용 서비스입니다!")} />
            </label>
          ) : !bookMark ? (
            <label htmlFor="">
              <BookMark onClick={HandleBookMarkChange} />
            </label>
          ) : (
            <label htmlFor="">
              <FilledBookMark onClick={HandleBookMarkChange} />
            </label>
          )}
          <label htmlFor={`modal-${pr.name}`} className="btn modal-button btn-primary">
            더 알아보기
          </label>
          <PRModal pr={pr} key={pr.pk_supplement_id} />
        </div>
      </div>
    </div>
  );
};
export default PRCard;
