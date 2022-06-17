import { BookMark } from "../db/BookMark";
import { HttpException } from "../utils/error-util";

const BookMarkService = {
  getAllBookmarks: async (fk_user_id: string) => {
    const bookmarks = await BookMark.findById(fk_user_id);
    if (!bookmarks) {
      throw new HttpException(401, "북마크 내역이 없습니다.");
    }
    return bookmarks;
  },
};

export { BookMarkService };
