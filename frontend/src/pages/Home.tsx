import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApis } from "../state/api/apiSlice";
import { RootState, AppDispatch } from "../state/store";
import List from "../components/List";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.api);

  useEffect(() => {
    dispatch(fetchApis()); // Carica le API all'avvio
  }, [dispatch]);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>Errore: {error}</p>;

  return (
    <>
      <h1>Elenco API</h1>
      <List />
    </>
  );
};

export default Home;
