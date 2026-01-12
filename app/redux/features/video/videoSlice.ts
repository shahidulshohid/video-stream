// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type MediaKind = "video" | "audio";

// type Recording = {
//   url: string;
//   type: MediaKind;
// };

// type VideoState = {
//   recordings: Recording[];
//   isRecording: boolean;
// };


// const initialState: VideoState = {
//   recordings: [],
//   isRecording: false,
// };

// const videoSlice = createSlice({
//   name: "video",
//   initialState,
//   reducers: {
//     setRecordings(state, action: PayloadAction<Recording[]>) {
//       state.recordings = action.payload;
//     },
//     addRecording(state, action: PayloadAction<Recording>) {
//       console.log("Adding recording in redux:=============", action.payload);
//       state.recordings.push(action.payload);
//     },
//     setIsRecording(state, action: PayloadAction<boolean>) {
//       state.isRecording = action.payload;
//     },
//     resetVideo(state) {
//       state.recordings = [];
//       state.isRecording = false;
//     },
//   },
// });

// export const {
//   setRecordings,
//   addRecording,
//   setIsRecording,
//   resetVideo,
// } = videoSlice.actions;


// export default videoSlice.reducer;



// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// type MediaKind = "video" | "audio";

// export type Recording = {
//   url: string;
//   type: MediaKind;
// };

// type VideoState = {
//   recordings: Recording[];
// };

// const initialState: VideoState = {
//   recordings: [],
// };

// const videoSlice = createSlice({
//   name: "video",
//   initialState,
//   reducers: {
//     addRecording(state, action: PayloadAction<Recording>) {
//       state.recordings.push(action.payload);
//       console.log("Recording added in server:", action.payload);
//     },
//     removeRecording(state, action: PayloadAction<number>) {
//       state.recordings.splice(action.payload, 1);
//     },
//   },
// });

// export const { addRecording, removeRecording } = videoSlice.actions;
// export default videoSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Recording = {
  id: string;
  url: string;
  type: "video" | "audio";
};

type VideoState = {
  recordings: Recording[];
};

const initialState: VideoState = {
  recordings: [],
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    addRecording: (state, action: PayloadAction<Recording>) => {
      state.recordings.push(action.payload);
    },

    deleteRecording: (state, action: PayloadAction<string>) => {
      state.recordings = state.recordings.filter(
        (rec) => rec.id !== action.payload
      );
    },
  },
});

export const { addRecording, deleteRecording } = videoSlice.actions;
export default videoSlice.reducer;


