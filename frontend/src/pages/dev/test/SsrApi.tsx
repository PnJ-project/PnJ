interface Data {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function ssrapi({ results }: { results: Data | null }) {
  return (
    <>
      <h1>ssrapi</h1>
      {results ? (
        <div>
          <p>UserId: {results.userId}</p>
          <p>Id: {results.id}</p>
          <p>Title: {results.title}</p>
          <p>Completed: {results.completed ? "True" : "False"}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: { results: Data | null };
}> {
  try {
    const response: Response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const result: Data = await response.json();

    return {
      props: { results: result },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { results: null },
    };
  }
}
