import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateEvent from "../components/createEvent";
import EventCard from "../components/eventCard";
import { logout, authenticateUser } from "../redux/authSlice";
import { createEvent, getEvents } from "../redux/eventSlice";


export default function Home() {
    const { user } = JSON.parse(localStorage.getItem("login") || "{}");
    const [isCreateEvent, setIsCreateEvent] = useState({is: false});
    const dispatch = useDispatch();
    const { selectedEventId } = useSelector((state:any) => state.eve);

    const logoutuser = () => {
        dispatch<any>(logout(""));
    }

    const authUser = () => {
        dispatch<any>(authenticateUser());
    }

    const createEvent = () => {
        setIsCreateEvent((prev) => ({...prev, is: true }))
    }

    const closeEvent = () => {
        setIsCreateEvent((prev) => ({...prev, is: false }))
    }

    useEffect(() => {
        dispatch<any>(getEvents());
    }, [dispatch, selectedEventId]);


    return (
        <>
            <h2>{ user }</h2>
            <button onClick={() => {logoutuser()} }>Log out</button>
            <button onClick={() => {authUser()} }>Auth</button>
            <button onClick={()=>{createEvent()}}>Create Event</button>
            {isCreateEvent.is === true ? <CreateEvent close={closeEvent}/> : ""}
            <EventCard/>
        </>
    );
}