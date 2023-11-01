import { useQuery } from "react-query";
import axios from "axios";

// J솔루션 리스트 불러오기
export const useReadSolution = () => {
  return useQuery("solutionList", async () => {
    const { data } = await axios.get(`${process.env.API_URL}/Sample`);
    return data;
  });
};

// J솔루션 디테일 불러오기
export const useReadSolutionItem = (pk: number) => {
  return useQuery(["solutionItem", pk], async () => {
    const { data } = await axios.get(`${process.env.API_URL}/Sample/${pk}`);
    return data;
  });
};
