import { onGetRatings } from '@redux/actions/ratings.action';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RatingsState {
  ratings: RatingEntity[];
  ratingsPagination: ApiPagination;
}

const initialPagination = {
  totalDocs: 0,
  offset: 0,
  limit: 0,
  totalPages: 0,
  page: 0,
  hasPrevPage: false,
  hasNextPage: false,
};

const ratingsInitialState: RatingsState = {
  ratings: [],
  ratingsPagination: initialPagination,
};

export const ratingSlice = createSlice({
  name: 'ratings',
  initialState: ratingsInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onGetRatings.fulfilled, (state, action) => {
      // state.ratings = action.payload.ratings;
      if (action.payload.ratings && typeof action.payload.ratings[Symbol.iterator] === 'function') {
        state.ratings.push(...action.payload.ratings);
      }
      state.ratingsPagination = action.payload.ratingsPagination;
    });
  },
});

export const {} = ratingSlice.actions;

export default ratingSlice.reducer;
