import { useQuery } from "react-query";
import { fetchQuerySample } from "./SampleApi";

const ReactQuery = () => {
  const { data, isLoading, error } = useQuery("calendarData", fetchQuerySample);

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
