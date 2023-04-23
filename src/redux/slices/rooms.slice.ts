import { getRoomsCreatedSeats, onCreateRoom, onDeleteRoom, onGetRooms } from '@redux/actions/rooms.action';
import { createSlice } from '@reduxjs/toolkit';

interface roomsState {
  rooms: RoomEntity[];
  paginationOptions: ApiPagination;
  roomCreatedSeats: RoomEntity[];
  roomHasNotCreatedSeats: RoomEntity[];
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

const roomsInitialState: roomsState = {
  rooms: [],
  paginationOptions: initialPagination,
  roomCreatedSeats: [],
  roomHasNotCreatedSeats: [],
};

export const roomSlice = createSlice({
  name: 'rooms',
  initialState: roomsInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onGetRooms.fulfilled, (state, action) => {
      state.rooms = action.payload.rooms;
      state.paginationOptions = action.payload.paginationOptions;
    });
    builder.addCase(onCreateRoom.fulfilled, (state, action) => {
      const { newRoom } = action.payload;
      state.rooms = [newRoom, ...state.rooms];
      state.paginationOptions = {
        totalDocs: state.paginationOptions.totalDocs + 1,
        offset: 0,
        limit: state.paginationOptions.limit,
        page: Math.ceil((state.paginationOptions.totalDocs + 1) / state.paginationOptions.limit),
        totalPages: Math.ceil(state.paginationOptions.totalDocs / state.paginationOptions.limit),
        hasPrevPage: state.paginationOptions.page > 1,
        hasNextPage: state.paginationOptions.page < state.paginationOptions.totalPages,
      };
    });

    builder.addCase(onDeleteRoom.fulfilled, (state, action) => {
      const { roomId } = action.payload;
      state.rooms = state.rooms.filter(item => item.id !== roomId);
      state.paginationOptions.totalDocs -= 1;
      state.paginationOptions.totalPages = Math.ceil(state.paginationOptions.totalDocs / state.paginationOptions.limit);
    });

    builder.addCase(getRoomsCreatedSeats.fulfilled, (state, action) => {
      state.roomCreatedSeats = action.payload.roomCreatedSeats;
      state.roomHasNotCreatedSeats = action.payload.roomHasNotCreatedSeats;
    });
  },
});

export const {} = roomSlice.actions;

export default roomSlice.reducer;
