import axios, { AxiosResponse } from "axios";

export interface Sample {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchSample = async () => {
  try {
    const response: AxiosResponse<Sample> = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
