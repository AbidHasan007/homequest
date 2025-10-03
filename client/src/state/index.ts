import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  location: string;
  beds: string;
  baths: string;
  propertyType: string;
  amenities: string[];
  availableFrom: string;
  priceRange: [number, number] | [null, null];
  squareFeet: [number, number] | [null, null];
  coordinates: [number, number] | null;
  radius: number; // in kilometers
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  } | null;
}
interface initialStateTypes {
  filters: FiltersState;
  isFiltersFullOpen: boolean;
  viewMode: "grid" | "list";
}
export const initialState: initialStateTypes = {
  filters: {
  location: "any",
  beds: "any",
  baths: "any",
  propertyType: "any",
  amenities: [],
  availableFrom: "any",
  priceRange: [null, null] ,
  squareFeet: [null, null] ,
  coordinates: null,
  radius: 5, // Default 5km radius
  bounds: null,
  },
  isFiltersFullOpen: false,
  viewMode: "grid",
};


export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: { setFilters: (state, action:PayloadAction<Partial<FiltersState>>)=>{
     state.filters = {...state.filters, ...action.payload};
  },
  toggleFiltersFullOpen: (state)=>{
    state.isFiltersFullOpen = !state.isFiltersFullOpen;
  },
  setViewMode: (state, action:PayloadAction<"grid" | "list">)=>{
    state.viewMode = action.payload;
  }
},
});

export const {
  setFilters,
  toggleFiltersFullOpen,
  setViewMode
} = globalSlice.actions;

export default globalSlice.reducer;
