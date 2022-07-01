import { useEffect, useState } from "react";

function useResize(size: number) {
  const [isSizeSmall, setIsSizeSmall] = useState<boolean>(false);

  const onResizeCallback = (e: UIEvent) => {
    const innerWidth = (e.target as Window).innerWidth;

    if (innerWidth < size) {
      setIsSizeSmall(true);
    } else {
      setIsSizeSmall(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResizeCallback);

    return () => {
      window.removeEventListener("resize", onResizeCallback);
    };
  }, []);
  return {
    isSizeSmall,
  };
}

export default useResize;
