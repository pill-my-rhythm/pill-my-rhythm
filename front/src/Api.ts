import axios from "axios";

const backendPortNumber = "5000";
const aiPortNumber = "5002";
const aiserverUrl = window.location.protocol + "//" + window.location.hostname + ":" + aiPortNumber + "/";
const serverUrl = window.location.protocol + "//" + window.location.hostname + ":" + backendPortNumber + "/";

// * accessToken 만료시 refresh Token으로 교환
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    console.log("#error", error);
    if (status === 401) {
      if (error.response?.data.error.name === "TokenExpiredError") {
        const originalRequest = config;
        const refreshToken = sessionStorage.getItem("refreshToken");
        // console.log("refresh#refreshToken", refreshToken);
        const userToken = sessionStorage.getItem("userToken");
        // console.log("refresh#userToken", userToken);

        await axios
          .post(
            serverUrl + `user/refresh`,
            {},
            {
              headers: {
                refresh: `${refreshToken}`,
                Authorization: `Bearer ${userToken}`,
              },
            },
          )
          .then((res) => {
            const accessToken = res.data.data.accessToken;
            sessionStorage.setItem("userToken", accessToken);
            console.log("refresh Token 변경 완료!");
          })
          .catch((error) => {
            throw error;
          });

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        };
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

async function get(endpoint: string, params = "", destination: "AI" | "BACK" = "BACK") {
  return axios.get((destination === "AI" ? aiserverUrl : serverUrl) + endpoint + params, {
    // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

// !! 임시로 refresh외 우회 부분
const origin = axios.create();
async function originpost(endpoint: string, data: any, destination: "AI" | "BACK" = "BACK") {
  const bodyData = JSON.stringify(data);
  return origin.post((destination === "AI" ? aiserverUrl : serverUrl) + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}
// !! 임시로 refresh외 우회 부분 끄으으읏

async function post(endpoint: string, data: any, destination: "AI" | "BACK" = "BACK") {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  return axios.post((destination === "AI" ? aiserverUrl : serverUrl) + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

async function put(endpoint: string, data: any) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint: string, params = "") {
  return axios.delete(serverUrl + endpoint + "/" + params, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export { originpost, get, post, put, del };
