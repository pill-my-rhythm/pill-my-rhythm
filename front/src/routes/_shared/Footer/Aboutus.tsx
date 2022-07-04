import React from "react";

const Aboutus = () => {
  return (
    <div className="w-screen min-h-screen bg-gray-600 flex items-center justify-center select-none">
      {" "}
      <div className="w-full py-20 min-h-screen flex flex-col md:flex-row items-center justify-center">
        <div className="card m-4 w-[25rem] glass p-2 md:p-4 flex flex-wrap items-center justify-center">
          <div className="p-4 md:p-2 avatar">
            <div className="w-48 mask mask-squircle">
              <img src="https://blog.kakaocdn.net/dn/btisU7/btrGhwSz90s/MXez6Ltsz0DKL7HzDnhczk/img.png" alt="클리니컬 글루타치온" />
            </div>
          </div>
          <div className="card-body p-2 m-2 break-words text-center">
            <div className="flex flex-row items-center justify-center">
              <h1 className="text-2xl font-bold leading-relaxed md:leading-normal text-teal-300 m-2">노송희 BE</h1>
              <a href="https://github.com/s0n9h2" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-teal-300">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-teal-100 font-bold">클리니컬 글루타치온</p>
            <p className="text-sm text-teal-100">
              요즘 핫한(?) 글루타치온 중에 흡수율이 높다고 해서
              <br />
              사봤는데 확실히 만성 피로에 효과있어요!
            </p>
            <p className="leading-loose text-white text-base">
              재밌었던 웹 푸시 대장정...^_^ 이게 되네~
              <br />
            </p>
          </div>
        </div>

        <div className="card m-4 w-[25rem] glass p-2 md:p-4 flex flex-wrap items-center justify-center">
          <div className="p-4 md:p-2 avatar">
            <div className="w-48 mask mask-squircle">
              <img src="https://blog.kakaocdn.net/dn/cessjF/btrGgJkzzlh/XtZP90N25PiFjzQ4bKPZk0/img.png" alt="엔젯오리진 빌베리 루테인 토탈 아이케어" />
            </div>
          </div>
          <div className="card-body p-2 m-2 break-words text-center">
            <div className="flex flex-row items-center justify-center">
              <h1 className="text-2xl font-bold leading-relaxed md:leading-normal text-teal-300 m-2">박정윤 BE</h1>
              <a href="https://github.com/ParkJungYoon " target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-teal-300">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-teal-100 font-bold">엔젯오리진 빌베리 루테인 토탈 아이케어</p>
            <p className="text-sm text-teal-100">개발로 잃은 시력, 영양제 먹고 유지라도 하자.</p>
            <p className="leading-loose text-white text-base">
              5일 같은 5주 였습니다! 숨 참고 (개발) 딥 다이브 ❤️
              <br />
            </p>
          </div>
        </div>
        <div className="card m-4 w-[25rem] glass p-2 md:p-4 flex flex-wrap items-center justify-center">
          <div className="p-4 md:p-2 avatar">
            <div className="w-48 mask mask-squircle">
              <img src="https://blog.kakaocdn.net/dn/uWqi8/btrGjFA3jd5/6DvOPYCm7dtcVCbVc4afJ1/img.png" alt="정관장 홍삼정 에브리타임" />
            </div>
          </div>
          <div className="card-body p-2 m-2 break-words text-center">
            <div className="flex flex-row items-center justify-center">
              <h1 className="text-2xl font-bold leading-relaxed md:leading-normal text-teal-300 m-2">석윤주 FE</h1>
              <a href="https://github.com/reina-dev" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-teal-300">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-teal-100 font-bold">정관장 홍삼정 에브리타임</p>
            <p className="text-sm text-teal-100">면역력 관리 너무 힘들어요🙃 안 먹는 것 보단 낫겠지</p>
            <p className="leading-loose text-white text-base">
              ✨디발자 성공적 전직완료✨
              <br />
            </p>
          </div>
        </div>
        <div className="card m-4 w-[25rem] glass p-2 md:p-4 flex flex-wrap items-center justify-center">
          <div className="p-4 md:p-2 avatar">
            <div className="w-48 mask mask-squircle">
              <img src="https://blog.kakaocdn.net/dn/vO7am/btrGgmP85uE/v8PNL6SSy6qKk6PsjsNPS1/img.png" alt="텐텐" />
            </div>
          </div>
          <div className="card-body p-2 m-2 break-words text-center">
            <div className="flex flex-row items-center justify-center">
              <h1 className="text-2xl font-bold leading-relaxed md:leading-normal text-teal-300 m-2">이영우 FE</h1>
              <a href="https://github.com/Everylisy" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-teal-300">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-teal-100 font-bold">텐텐</p>
            <p className="text-sm text-teal-100">텐텐 드시면 키가 커요</p>
            <p className="leading-loose text-white text-base">
              야호~!
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
