  // 시간을 한국 시간대로 변경
  export default function formatDateTime(inputDate: Date): string {
    
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');
    const hours = inputDate.getHours().toString().padStart(2, '0');
    const minutes = inputDate.getMinutes().toString().padStart(2, '0');
    const seconds = inputDate.getSeconds().toString().padStart(2, '0');
    
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    
    return formattedDateTime;
  }