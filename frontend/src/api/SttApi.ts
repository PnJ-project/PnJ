import axios from "axios";

const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER;
// const service_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;

// STT 요청
export const fetchStt = async () => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_STT_SERVER}/test/stt`
  );
  return response.data;
};

// STT 요청 - 파일보내야할시
export const fetchSttFile = async (formdata: File) => {
  const response = await axios.post(`${local_back_url}/Sample`, formdata);
  return response.data;
};
