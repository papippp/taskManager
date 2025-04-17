import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from './Components/features/tasks/taskSlice'

export default configureStore({
    reducer: {
        tasks: tasksReducer
    }
})