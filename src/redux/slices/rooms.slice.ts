import { onCreateRoom, onDeleteRoom, onGetRooms } from '@redux/actions/rooms.action';
import { createSlice } from '@reduxjs/toolkit';

interface roomsState {
  rooms: RoomEntity[];
  roomsPagination: ApiPagination;
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
  roomsPagination: initialPagination,
};

export const roomSlice = createSlice({
  name: 'rooms',
  initialState: roomsInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onGetRooms.fulfilled, (state, action) => {
      state.rooms = action.payload.rooms;
      state.roomsPagination = action.payload.roomsPagination;
    });
    builder.addCase(onCreateRoom.fulfilled, (state, action) => {
      const { newRoom } = action.payload;
      state.rooms = [newRoom, ...state.rooms];
      state.roomsPagination = {
        totalDocs: state.roomsPagination.totalDocs + 1,
        offset: 0,
        limit: state.roomsPagination.limit,
        page: Math.ceil((state.roomsPagination.totalDocs + 1) / state.roomsPagination.limit),
        totalPages: Math.ceil(state.roomsPagination.totalDocs / state.roomsPagination.limit),
        hasPrevPage: state.roomsPagination.page > 1,
        hasNextPage: state.roomsPagination.page < state.roomsPagination.totalPages,
      };
    });

    builder.addCase(onDeleteRoom.fulfilled, (state, action) => {
      const { roomId } = action.payload;
      state.rooms = state.rooms.filter(item => item.id !== roomId);
      state.roomsPagination.totalDocs -= 1;
      state.roomsPagination.totalPages = Math.ceil(state.roomsPagination.totalDocs / state.roomsPagination.limit);
    });
  },
});

export const {} = roomSlice.actions;

export default roomSlice.reducer;
