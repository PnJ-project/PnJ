import axios, { AxiosResponse } from "axios";

// 캘린더 정보 불러오기
export interface ResReadCalendar {
  Sample: string;
}
export const ReadCalendar = async () => {
  try {
    const response: AxiosResponse<ResReadCalendar> = await axios.get(
      `${process.env.API_URL}/Sample`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Calendar:", error);
    throw error;
  }
};

// 캘린더 정보 생성하기
export interface ResAddCalendar {
  Sample: string;
}
export interface ReqAddCalendar {
  Sample: string;
}
export const AddCalendar = async (dataToSend: ReqAddCalendar) => {
  try {
    const response: AxiosResponse<ResAddCalendar> = await axios.post(
      `${process.env.API_URL}/Sample`,
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error add Calendar item:", error);
    throw error;
  }
};

// 캘린더 정보 수정하기
export interface ResUpdateCalendar {
  Sample: string;
}
export interface ReqUpdateCalendar {
  Sample: string;
}
export const UpdateCalendar = async (dataToSend: ReqUpdateCalendar) => {
  try {
    const response: AxiosResponse<ResUpdateCalendar> = await axios.put(
      `${process.env.API_URL}/Sample`,
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error update Calendar item:", error);
    throw error;
  }
};

// 캘린더 정보 삭제하기
export const DeleteCalendar = async () => {
  try {
    axios.delete(`${process.env.API_URL}/Sample`);
    return;
  } catch (error) {
    console.error("Error delete Calendar item:", error);
    throw error;
  }
};
