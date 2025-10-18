import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    loading: false,
    error: null
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    setResults: (state, action) => {
      state.results = action.payload
      state.loading = false
      state.error = null
    },
    clearSearch: (state) => {
      state.query = ''
      state.results = []
      state.loading = false
      state.error = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const {
  setQuery,
  setResults,
  clearSearch,
  setLoading,
  setError
} = searchSlice.actions

export default searchSlice.reducer
