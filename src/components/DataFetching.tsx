/* import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function fetchPosts() {
  return axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => res.data);
}

function DataFetchingComponent() {
  const { data, error, isLoading } = useQuery(["posts"], fetchPosts);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.slice(0, 5).map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

export default DataFetchingComponent; */