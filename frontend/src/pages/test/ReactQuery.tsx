import { useQuery } from "react-query";
import axios from "axios";

const ReactQuery = () => {
  const { data, isLoading, error } = useQuery("calendarData", async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log(response, response.data);
    return response.data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h1>ReactQuery</h1>
      {data && <p>{data.userId}</p>}
      {data && <p>{data.title}</p>}
    </div>
  );
};

export default ReactQuery;
