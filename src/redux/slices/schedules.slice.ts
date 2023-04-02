import { onFilterSchedules, onGetSchedulesByMovie } from '@redux/actions/schedule.action';
import { createSlice } from '@reduxjs/toolkit';

interface SchedulesState {
  schedules: ScheduleEntity[];
  filterSchedules: ScheduleEntity[];
}

const scheduleInitialState: SchedulesState = {
  schedules: [],
  filterSchedules: [],
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: scheduleInitialState,
  reducers: {
    onFilterByCity: (state, action) => {
      const city = action.payload;
      const data = state.schedules.filter(schedule => schedule.room.cinemaAddress.includes(city));
      state.schedules = data;
    },
    onClearSchedules: state => {
      state.schedules = [];
      state.filterSchedules = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(onGetSchedulesByMovie.fulfilled, (state, action) => {
      state.schedules = action.payload.schedules;
    });
    builder.addCase(onFilterSchedules.fulfilled, (state, action) => {
      state.filterSchedules = action.payload.filterSchedules;
    });
  },
});

export const { onFilterByCity, onClearSchedules } = scheduleSlice.actions;

export default scheduleSlice.reducer;
