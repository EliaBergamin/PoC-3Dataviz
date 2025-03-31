import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { tabData } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import DynamicTable from "../components/DynamicTable";
import Footer from "../components/Footer";
import {
  fetchDataset,
  filterData,
  setSelected
} from "../state/dataset/datasetSlice";

const Api = () => {
  const [, setSelectedBar] = useState<tabData | null>(null);
  const [isGreaterChecked] = useState(true); // Checkbox sopra una barra

  const [showAveragePlane, setShowAveragePlane] = useState(true); // Stato per la visibilità del piano medio
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.dataset
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchDataset(Number(id))); // Chiamata API per il dettaglio
    }
  }, [dispatch, id]);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>Errore: {error}</p>;
  if (!data) return <p>API non trovata.</p>;

  const xLabels = Array.from(new Set(data.map((d) => d.x)));
  const zLabels = Array.from(new Set(data.map((d) => d.z)));
  const processedData: tabData[] = data.map((d) => ({
    ...d,
    x: Array.from(xLabels).indexOf(d.x),
    value: d.y,
    z: Array.from(zLabels).indexOf(d.z)
  }));

  //  console.log(processedData);

  // Funzione per toggle del piano medio
  const toggleAveragePlane = () => {
    setShowAveragePlane((prev) => !prev);
  };
  const resetFilters = () => {
    //setFilteredData(processedData); // Ripristina i dati originali
    setSelectedBar(null); // Deseleziona la barra
    /* setShowAveragePlane(true); */ // Mostra il piano medio
  };

  const handleCellClick = (id: string) => {
    const clickedBar: tabData | undefined = processedData.find(
      (bar) => bar.id.toString() === id
    );
    console.log(clickedBar);
    if (clickedBar) {
      setSelectedBar(clickedBar); // Imposta la barra selezionata
      dispatch(filterData({ value: clickedBar.y, greater: isGreaterChecked }));
      dispatch(
        setSelected({
          ...clickedBar,
          y: clickedBar.y,
          x: xLabels[clickedBar.x],
          z: zLabels[clickedBar.z]
        })
      );
    }
  };
  return (
    <>
      <div id="title">
        <h1>3Dataviz PoC</h1>
      </div>
      <div id="table-container">
        <DynamicTable onCellClick={handleCellClick} />
      </div>
      <div id="buttons">
        <button onClick={toggleAveragePlane}>
          {showAveragePlane ? "Nascondi piano medio" : "Mostra piano medio"}
        </button>
        <button id="reset" onClick={resetFilters}>
          Resetta filtri
        </button>
      </div>
      <div id="wrapper">
        {/*  <CustomCanvas selectedBar={selectedBar} /> */}
        {/* <Filters
          selectedBar={selectedBar}
          setIsGreaterChecked={setIsGreaterChecked}
        /> */}
      </div>
      <Footer />
    </>
  );
};

export default Api;
