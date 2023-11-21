// 캘린더 관련 함수 관리입니다
export default function calculateDateDifference(
  dateString1: string,
  dateString2: string
) {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  // 날짜 차이 계산
  const timeDifference = date2.getTime() - date1.getTime();

  // 밀리초(ms)를 날짜로 변환하고, 일(Day)로 나누기
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  return daysDifference;
}
