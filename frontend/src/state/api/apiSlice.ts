import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Definizione del tipo per una API
interface ApiItem {
  id: number;
  name: string;
  dim: {
    x: number;
    z: number;
  };
  description: string;
}

// Stato iniziale
interface ApiState {
  list: ApiItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  list: [],
  loading: false,
  error: null
};

// Async thunk per caricare le API dal backend
export const fetchApis = createAsyncThunk<ApiItem[]>(
  "api/fetchApis",
  async () => {
    const response = await axios.get("http://127.0.0.1:5000/apis");
    return response.data;
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchApis.fulfilled,
        (state, action: PayloadAction<ApiItem[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchApis.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Errore nel caricamento delle API";
      });
  }
});

export default apiSlice.reducer;
