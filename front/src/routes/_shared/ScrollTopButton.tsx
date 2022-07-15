export const ScrollTopButton = () => {
  return (
    <button
      className="bg-transparent flex scroll-smooth"
      onClick={() =>
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
      }
    >
      <img src="https://blog.kakaocdn.net/dn/RL8Kv/btrBr5TDbYj/dklV6QQr0hgYlTWfr1AVbk/img.png" alt="scrolltop" width={120} />
    </button>
  );
};
