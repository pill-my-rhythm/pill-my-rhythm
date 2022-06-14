import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { User } from "../slices/User";

// 중복된 주소를 줄이는 방법
axios.defaults.baseURL = "http://localhost:3051";
axios.defaults.withCredentials = true; // front, back 간 쿠키 공유

// get, delete : data를 넘길 수 없다. 데이터를 넘길경우엔 쿼리스트링으로 넣어야한다.
// 쿼리스트링으로 back에 요청을 할 경우, back에서는 req.body가 아닌 req.query에서 정보를 볼 수 있다.

// post, put, fetch : data를 넘길 수 있다.

// 회원가입
export const signup = createAsyncThunk("user/signup", async (data: User, { rejectWithValue }) => {
  try {
    const response = await axios.post("/signup", data);
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response.data);
  }
});

// 로그인
export const logIn = createAsyncThunk("/user/logIn", async (data: User, { rejectWithValue }) => {
  try {
    const response = await axios.post("/login", data);
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response.data);
  }
});

// 로그아웃
export const logOut = createAsyncThunk("/user/logOut", async () => {
  const response = await axios.post("/logout");
  return response.data;
});

// 로그인 상태 불러오기
export const loadUser = createAsyncThunk("/user/load", async () => {
  // get의 두번째 인자에는 data가 아닌, withCredentials 자리지만 defaults로 넣었기때문에 생략
  const response = await axios.get("/user");
  console.log(response.data);
  return response.data;
});
