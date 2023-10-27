import axios, { AxiosResponse } from "axios";

// J솔루션 리스트 불러오기
export interface ResReadSolution {
  Sample: string;
}
export const ReadSolution = async () => {
  try {
    const response: AxiosResponse<ResReadSolution> = await axios.get(
      `${process.env.API_URL}/Sample`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Solution:", error);
    throw error;
  }
};

// J솔루션 디테일 불러오기
export interface ResReadSolutionItem {
  Sample: string;
}
export const ReadSolutionItem = async (pk: number) => {
  try {
    const response: AxiosResponse<ResReadSolutionItem> = await axios.get(
      `${process.env.API_URL}/Sample/${pk}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Solution Item:", error);
    throw error;
  }
};
