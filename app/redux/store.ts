// import { configureStore } from "@reduxjs/toolkit";
// import videoReducer from "./features/video/videoSlice";

// export const store = configureStore({
//     reducer: {
//         video: videoReducer,
//     },
// });

// // types
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;



import { configureStore, combineReducers } from "@reduxjs/toolkit";
import videoReducer from "./features/video/videoSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage for web

// 1️⃣ Combine reducers
const rootReducer = combineReducers({
    video: videoReducer,
    // you can add more slices here
});

// 2️⃣ persist config
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["video"], // only persist video slice
};

// 3️⃣ Wrap root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// 5️⃣ Persistor
export const persistor = persistStore(store);

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
