import {
  onCreateSchedule,
  onFilterSchedules,
  onGetSchedules,
  onGetSchedulesByMovie,
  onUpdateSchedule,
} from '@redux/actions/schedules.action';
import { createSlice } from '@reduxjs/toolkit';

interface SchedulesState {
  schedules: ScheduleEntity[];
  paginationOptions: ApiPagination;
  schedulesByMovie: ScheduleEntityByMovie[];
  filterSchedulesByMovie: ScheduleEntityByMovie[];
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

const scheduleInitialState: SchedulesState = {
  schedules: [],
  paginationOptions: initialPagination,
  schedulesByMovie: [],
  filterSchedulesByMovie: [],
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: scheduleInitialState,
  reducers: {
    onFilterByCity: (state, action) => {
      const city = action.payload;
      const data = state.schedulesByMovie.filter(schedule => schedule.room.cinemaAddress.includes(city));
      state.schedulesByMovie = data;
    },
    onClearSchedules: state => {
      state.schedulesByMovie = [];
      state.filterSchedulesByMovie = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(onGetSchedules.fulfilled, (state, action) => {
      state.schedules = action.payload.schedules;
      state.paginationOptions = action.payload.paginationOptions;
    });
    builder.addCase(onGetSchedulesByMovie.fulfilled, (state, action) => {
      state.schedulesByMovie = action.payload.schedulesByMovie;
    });
    builder.addCase(onFilterSchedules.fulfilled, (state, action) => {
      state.filterSchedulesByMovie = action.payload.filterSchedulesByMovie;
    });

    builder.addCase(onCreateSchedule.fulfilled, (state, action) => {
      const { newSchedule } = action.payload;
      state.schedules = [newSchedule, ...state.schedules];
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

    builder.addCase(onUpdateSchedule.fulfilled, (state, action) => {
      const scheduleId = action.payload.updateValues.id;
      const scheduleIndex = state.schedules.findIndex(item => item.id === scheduleId);
      if (scheduleIndex === -1) return;
      state.schedules[scheduleIndex] = { ...state.schedules[scheduleIndex], ...action.payload.updateValues };
    });
  },
});

export const { onFilterByCity, onClearSchedules } = scheduleSlice.actions;

export default scheduleSlice.reducer;
