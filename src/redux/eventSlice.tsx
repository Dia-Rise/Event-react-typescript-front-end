import {
    createAsyncThunk,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import axios from "axios";

interface eventInformation {
    creatorId: number,
    title: string,
    summary: string,
    eventDate: any,
    eventTime: any
}

interface eventIds {
    user_Id?: number,
    event_Id?: number
}

const initialState = {
    status: "idle",
    events: [],
    attendingEvents: [],
    selectedEvent: {},
    selectedEventId: "",
    selectedEventIsAttending: false,
    selectedEventAttendies: [],
    selectedEventMessages: []
}


export const createEvent = createAsyncThunk(
    "event/createEvent",
    async (eventData:eventInformation) => {
        const { data } = await axios.post('http://localhost:3001/createEvent', {
            creatorId: eventData.creatorId,
            title: eventData.title,
            summary: eventData.summary,
            eventDate: eventData.eventDate,
            eventTime: eventData.eventTime
        });
        return data;
    }
);

export const getEvents = createAsyncThunk(
    "event/getEvents",
    async () => {
        const {
            data
        } = await axios.get('http://localhost:3001/getEvents');
        return data;
    }
);


export const getAttendingEvents = createAsyncThunk(
    "event/getAttendingEvents",
    async (eventData:eventIds) => {
        const {
            data
        } = await axios.post('http://localhost:3001/getAttendingEvents', {
            user_Id: eventData.user_Id
        });
        return data;
    }
);

export const getSelectedEvent = createAsyncThunk(
    "event/getSelectedEvent",
    async (eventData:eventIds) => {
        const {
            data
        } = await axios.post('http://localhost:3001/getSelectedEvent', {
            selectedEvent: eventData
        });
        return data;
    }
);

export const deleteEvent = createAsyncThunk(
    "event/deleteEvent",
    async (eventData:eventIds) => {
        const {
            data
        } = await axios.post('http://localhost:3001/deleteEvent', {
            event_Id: eventData.event_Id
        });
        return data;
    }
);

export const addAttendee = createAsyncThunk(
    "event/addAttendee",
    async (eventData:eventIds) => {
        const {
            data
        } = await axios.post('http://localhost:3001/addAttendee', {
            userId: eventData.user_Id,
            event_Id: eventData.event_Id
        });
        return data;
    }
);

export const checkAttend = createAsyncThunk(
    "event/checkAttend",
    async (eventData:eventIds) => {
        const {
            data
        } = await axios.post('http://localhost:3001/checkAttend', {
            user_Id: eventData.user_Id,
            event_Id: eventData.event_Id
        });
        return data;
    }
);

export const unAttend = createAsyncThunk(
    "event/unAttend",
    async (eventData:eventIds) => {
        const {
            data
        } = await axios.post('http://localhost:3001/unAttend', {
            user_Id: eventData.user_Id,
            event_Id: eventData.event_Id
        });
        return data;
    }
);

export const getEventAttendees = createAsyncThunk(
    "event/getAttendees",
    async (eventData:eventIds) => {
        const {
            data
        } = await axios.post('http://localhost:3001/getAttendees', {
            event_Id: eventData.event_Id || ""
        });
        return data;
    }
);

export const getEventMessages = createAsyncThunk(
    "event/getEventMessages",
    async () => {
        const {
            data
        } = await axios.get('http://localhost:3001/getEventMessages');
        return data;
    }
);


export const eventSlice = createSlice({
    name: "eve",
    initialState,
    reducers: {
        setEvent: (state, action) => {
            state.selectedEventId = action.payload;
        },
        hideEvent: (state, action) => {
            state.selectedEventId = "";
            state.selectedEvent = {};
            state.selectedEventAttendies = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase( getEvents.fulfilled, (state, action) =>{
            state.status = "success";
            state.events = action.payload.result;
        });
        builder.addCase( getAttendingEvents.fulfilled, (state, action) =>{
            state.status = "success";
            state.attendingEvents = action.payload;
        });
        builder.addCase( getSelectedEvent.fulfilled, (state, action) =>{
            state.status = "success";
            state.selectedEventId = action.payload.id;
            state.selectedEvent = action.payload;
            state.selectedEventAttendies = [];
        });
        builder.addCase( getEventAttendees.fulfilled, (state, action) =>{
            state.status = "success";
            state.selectedEventAttendies = action.payload;
        });
        builder.addCase( checkAttend.fulfilled, (state, action) =>{
            state.status = "success";
            state.selectedEventIsAttending = action.payload.isAttending;
        });
        builder.addCase( addAttendee.fulfilled, (state, action) =>{
            state.status = "success";
            state.selectedEventIsAttending = action.payload.isAttending;
        });
        builder.addCase( unAttend.fulfilled, (state, action) =>{
            state.status = "success";
            state.selectedEventIsAttending = action.payload.isAttending;
        });
        builder.addCase( deleteEvent.fulfilled, (state, action) =>{
            state.status = "success";
            state.selectedEventId = "";
            state.selectedEvent = {};
            state.selectedEventAttendies = [];
        });
    }
});



export default eventSlice.reducer;
export const { setEvent, hideEvent } = eventSlice.actions;