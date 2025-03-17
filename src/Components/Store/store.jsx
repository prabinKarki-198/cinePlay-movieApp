import { configureStore } from "@reduxjs/toolkit";
import movieReducer from '../Store/reducers/movieSlice';
import tvReducer from '../Store/reducers/tvSlice'
import personReducer from '../Store/reducers/personSlice'
export const store = configureStore({
    reducer: {
        movie:movieReducer,
        tv:tvReducer,
        person:personReducer,
    },
})