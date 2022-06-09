const Header = () => {
  return (
    <div className="navbar w-full bg-base-100 sticky top-0">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          <img src="https://blog.kakaocdn.net/dn/bro2IW/btrEji2iHDE/gJHWwqC1zfOCxRpv2cOwP0/img.png" width={30} height={30} className="mr-2" />
          Pill my rhythm
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a>Search</a>
          </li>
          <li>
            <a>Schedular</a>
          </li>
          <li>
            <a>Contact us</a>
          </li>
          <li tabIndex={0}>
            <a>
              Login
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-base-100">
              <li>
                <a>My Page</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
