import { User } from "../db/User";
import { BookMark } from "../db/BookMark";
import { HttpException } from "../utils/error-util";
import { IBookMarkCreateInput } from "../interfaces/bookMarkInput";

const BookMarkService = {
  getAllBookmarks: async (fk_user_id: string) => {
    const bookmarks = await BookMark.findById(fk_user_id);
    if (!bookmarks) {
      throw new HttpException(401, "북마크 내역이 없습니다.");
    }
    return bookmarks;
  },

  addBookMark: async (data: IBookMarkCreateInput) => {
    const user = await User.findById(data.fk_user_id);
    if (!user) {
      throw new HttpException(401, "가입 내역이 없는 계정입니다. 다시 한 번 확인해 주세요.");
    }
    const newBookMark = await BookMark.createBookMark(data);
    return newBookMark;
  },
};

export { BookMarkService };
