import { onCreateRating, onGetRatings } from '@redux/actions/ratings.action';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RatingsState {
  ratings: RatingEntity[];
  paginationOptions: ApiPagination;
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
  paginationOptions: initialPagination,
};

export const ratingSlice = createSlice({
  name: 'ratings',
  initialState: ratingsInitialState,
  reducers: {
    onClearRatings: state => {
      state.ratings = [];
      state.paginationOptions = initialPagination;
    },
  },
  extraReducers(builder) {
    builder.addCase(onGetRatings.fulfilled, (state, action) => {
      // if (action.payload.ratings && typeof action.payload.ratings[Symbol.iterator] === 'function') {
      //   state.ratings.push(...action.payload.ratings);
      // }
      state.ratings = action.payload.ratings;
      state.paginationOptions = action.payload.paginationOptions;
    });

    builder.addCase(onCreateRating.fulfilled, (state, action) => {
      const { newRating } = action.payload;
      state.ratings = [newRating, ...state.ratings];
      state.paginationOptions = {
        totalDocs: state.paginationOptions.totalDocs + 1,
        offset: 0,
        limit: state.paginationOptions.limit,
        page: Math.ceil(state.paginationOptions.totalDocs / state.paginationOptions.limit),
        totalPages: Math.ceil(state.paginationOptions.totalDocs / state.paginationOptions.limit),
        hasPrevPage: state.paginationOptions.page > 1,
        hasNextPage: state.paginationOptions.page < state.paginationOptions.totalPages,
      };
    });
  },
});

export const { onClearRatings } = ratingSlice.actions;

export default ratingSlice.reducer;
