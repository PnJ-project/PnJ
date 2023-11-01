import axios from "axios";

const local_back_url = process.env.BACKEND_SERVER;
// const service_back_url = process.env.BACKEND_SERVER_LIVE;

// J솔루션 리스트 불러오기
export const useReadSolution = async () => {
  const response = await axios.get(`${local_back_url}/Sample`);
  return response.data;
};

// J솔루션 디테일 불러오기
export const useReadSolutionItem = async (pk: number) => {
  const response = await axios.get(`${local_back_url}/Sample/${pk}`);
  return response.data;
};
