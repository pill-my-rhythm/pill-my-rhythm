import axios from "axios";

// const backendPortNumber = "5000";
// const aiPortNumber = "5002";
// const aiserverUrl = window.location.protocol + "//" + window.location.hostname + ":" + aiPortNumber + "/";
// const serverUrl = window.location.protocol + "//" + window.location.hostname + ":" + backendPortNumber + "/";
const aiserverUrl =
  window.location.protocol + "//" + window.location.hostname + "/api";
const serverUrl =
  window.location.protocol + "//" + window.location.hostname + "/ai";

async function get(
  endpoint: string,
  params = "",
  destination: "AI" | "BACK" = "BACK"
) {
  return axios.get(
    (destination === "AI" ? aiserverUrl : serverUrl) + endpoint + params,
    {
      // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    }
  );
}

async function post(
  endpoint: string,
  data: any,
  destination: "AI" | "BACK" = "BACK"
) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  return axios.post(
    (destination === "AI" ? aiserverUrl : serverUrl) + endpoint,
    bodyData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    }
  );
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
export { get, post, put, del };
