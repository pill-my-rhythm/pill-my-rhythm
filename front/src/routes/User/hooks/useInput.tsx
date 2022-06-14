import { Dispatch, SetStateAction, useState, useCallback, ChangeEvent } from "react";
type ReturnTypes<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];
const useInput = <T,>(initailData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initailData);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
