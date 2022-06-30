import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Yearly from "./yearly";
// import jandiData from './jandi/data.json';
// import * as Api from "../../api";
import { useRecoilValue } from "recoil";
// import { userInfoState } from "../../atoms";
import { useParams } from "react-router-dom";

const JandiContainer = styled.div`
  position: relative;
  width: 1205px;
  height: auto;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.3);
  box-shadow: 0px 5.33376px 40.0032px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10.0032px);
  z-index: 55;
  border-radius: 36.4393px;
`;

const JandiText = styled.div`
  font-family: "Jost", sans-serif;
  font-weight: 800;
  font-style: italic;
  width: 1203px;
  height: 50px;
  font-size: 2.5rem;
  font-weight: bold;
  color: #f03e3e;
  position: relative;
  left: 30px;

  padding-top: 10px;

  z-index: 55;
`;

const Jandi = () => {
  //   const user = useRecoilValue(userInfoState);
  //   const params = useParams();
  //   const [data, setData] = useState([]);
  //   // const [emptyData, setEmptyData] = useState(false);

  //   useEffect(() => {
  //     async function ParamsUser() {
  //       const userId = params.user_id;
  //       const res = await Api.get("heatmap", userId);
  //       setData(res.data[0].record);
  //     }
  //     async function FetchUser() {
  //       const res = await Api.get("heatmap", user._id);
  //       setData(res.data[0].record);
  //       // console.log('받아온 데이터', res.data);
  //     }

  //     if (params.user_id) {
  //       ParamsUser();
  //     } else {
  //       FetchUser();
  //     }
  //   }, [user, params]);
  // console.log('넣은 데이터', data);

  return (
    <div>
      <JandiText>HeatMap</JandiText>
      <JandiContainer>
        <Yearly />
      </JandiContainer>
    </div>
  );
};

export default Jandi;
