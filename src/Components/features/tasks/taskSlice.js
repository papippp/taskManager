import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = 'https://a141d59a-f07d-4d7f-bff1-bf133dee0026-00-1c9osy6krsm5l.sisko.replit.dev'

export const fetchTasks = createAsyncThunk(
    'fetchTask',
    async (userId) => {
        const response = await axios.get(`${BASE_URL}/tasks/${userId}`)
        return (response.data)

    }
)

export const createTasks = createAsyncThunk(
    'createTask',
    async ({ title, description, status, priority }) => {
        const decodeUser = localStorage.getItem('authToken')
        const user = jwtDecode(decodeUser)
        const userId = user.id
        const data = {
            title: title,
            description: description,
            status: status,
            priority: priority,
            user_id: userId
        }
        const response = await axios.post(`${BASE_URL}/tasks`, data)
        return response.data

    }
)

export const updateTasks = createAsyncThunk(
    'EditTasks',
    async ({ id, title, description, status, priority }) => {
        const decodeUser = localStorage.getItem('authToken')
        const user = jwtDecode(decodeUser)
        const userId = user.id
        const data = {
            title: title,
            description: description,
            status: status,
            priority: priority,
            user_id: userId
        }



        const response = await axios.put(`${BASE_URL}/tasks/${id}`, data)
        return response.data
    }
)

export const deleteTask = createAsyncThunk(
    'deleteTasks',
    async (id) => {
        const decodeUser = localStorage.getItem('authToken')
        const user = jwtDecode(decodeUser)
        const userId = user.id
        await axios.delete(`${BASE_URL}/tasks/${userId}/${id}`)
        return id

    }


)

const taskSlice = createSlice({
    name: 'tasks',
    initialState: { tasks: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload
                state.loading = false
            })
            .addCase(createTasks.fulfilled, (state, action) => {
                state.tasks = [action.payload, ...state.tasks]
            })
            .addCase(updateTasks.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id)
                if (index !== -1) {
                    state.tasks[index] = action.payload
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload)
            })

    }

})



export default taskSlice.reducer