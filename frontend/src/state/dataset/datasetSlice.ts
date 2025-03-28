import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Entry {
  id: number;
  x: string;
  y: number;
  z: string;
}

interface Legend {
  x: string;
  y: string;
  z: string;
}

interface Dataset {
  data: Entry[];
  legend: Legend;
}

interface DatasetState {
  data: Entry[] | null;
  legend: Legend | null;
  filteredData: Entry[] | null;
  selected: Entry | null;
  loading: boolean;
  error: string | null;
}

const initialState: DatasetState = {
  data: null,
  legend: null,
  filteredData: null,
  selected: null,
  loading: false,
  error: null
};

// Thunk per caricare i dettagli di una API
export const fetchDataset = createAsyncThunk<Dataset, number>(
  "dataset/fetchDataset",
  async (id) => {
    const response = await axios.get(`http://127.0.0.1:5000/api/${id}`);
    return response.data;
  }
);

const datasetSlice = createSlice({
  name: "dataset",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<Entry | null>) => {
      state.selected = action.payload;
    },
    filterData: (
      state,
      action: PayloadAction<{ value: number; greater: boolean }>
    ) => {
      if (state.data) {
        state.filteredData = state.data.filter((entry) => {
          return action.payload.greater
            ? entry.y >= action.payload.value
            : entry.y <= action.payload.value;
        });
      }
    },
    resetFilter: (state) => {
      if (state.data) {
        state.filteredData = state.data;
      }
      state.selected = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDataset.fulfilled,
        (state, action: PayloadAction<Dataset>) => {
          state.loading = false;
          state.data = action.payload.data;
          state.filteredData = action.payload.data;
          state.legend = action.payload.legend;
        }
      )
      .addCase(fetchDataset.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Errore nel caricamento del dataset";
      });
  }
});

export default datasetSlice.reducer;
export const { setSelected, filterData, resetFilter } = datasetSlice.actions;
