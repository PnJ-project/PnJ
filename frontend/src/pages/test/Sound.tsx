import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { fetchVitoKey } from "../../store/slice/SoundSlice";

// import React from 'react';
export default function Sound() {
  // 기본 세팅
  const vito_access = useSelector(
    (state: RootState) => state.vito.access_token
  );
  const dispatch = useDispatch();

  // 전사 요청
  const handleSendSound = async () => {
    const file = new File([""], "filename.mp3", { type: "audio/mp3" });
    const formData = new FormData();
    formData.append("config", JSON.stringify({}));
    formData.append("file", file);
    try {
      const response: AxiosResponse = await axios.post(
        `vitoo/v1/transcribe`,
        formData,
        {
          headers: {
            Authorization: `bearer ${vito_access}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error sending sound:", error);
      throw error;
    }
  };
  // 결과값 요청
  const handleReceiveText = () => {};

  // 에세스 키 불러오기
  useEffect(() => {
    const fetchAccessToken = async () => {
      const ci = import.meta.env.VITE_APP_VITO_CLIENT_ID;
      const cs = import.meta.env.VITE_APP_VITO_CLIENT_SECRET;
      const params = new URLSearchParams();
      params.append("client_id", ci);
      params.append("client_secret", cs);
      try {
        const response: AxiosResponse = await axios.post(
          `https://openapi.vito.ai/v1/authenticate`,
          params
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching Calendar:", error);
        throw error;
      }
    };
    fetchAccessToken()
      .then((data) => {
        dispatch(fetchVitoKey(data.access_token));
        console.log(data);
      }) // 프로미스가 해결되면 데이터를 콘솔에 출력
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <h1>Sound</h1>
      <div>{vito_access}</div>
      {vito_access && (
        <>
          <div>
            <button onClick={handleSendSound}>전사 요청</button>
            <button onClick={handleReceiveText}>결과값 요청</button>
          </div>
        </>
      )}
    </>
  );
}
