import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, getAttendingEvents, getSelectedEvent} from "../redux/eventSlice";
import EventModel from "./eventModel";
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'
import '../scss/eventCard.scss';

export default function EventCard() {
    const { id } = JSON.parse(localStorage.getItem("login") || "{}");
    const dispatch = useDispatch();
    const { events, attendingEvents, selectedEvent, selectedEventIsAttending } = useSelector((state:any) => state.eve);

    const showEventModel = (selcEvent:any) => {
        dispatch<any>(getSelectedEvent(selcEvent));
    };

    const formatDateTime = (t:any, d:any) => {
        const time = new Date('1995-12-17T'+t.toLocaleString());
        const newTime = format(time, 'hh:mm a')
        const date = new Date(d);
        const newDate = format(date, 'dd MMM, yyyy')
        return (
            <p className="card-date">
                <FontAwesomeIcon icon={faCalendar} /> {newDate} | <FontAwesomeIcon icon={faClock} /> {newTime}
            </p>
        );
    }

    const formatTitle = (content:any) => {
        if(content.length > 30){
            const trimTitle = content.substring(0, 30);
            return(
                <h1 className="card-title">{trimTitle}...</h1 >
            )
        } else{
            return(
                <h1 className="card-title">{content}</h1 >
            )
        }
    }

    const formatDesc = (content:any) => {
        if(content.length > 75){
            const trimDesc = content.substring(0, 75);
            return(
                <p>{trimDesc}...</p>
            )
        } else{
            return(
                <p>{content}</p>
            )
        }
    }

    const cardList = Object.keys(events).map((key, index) => 
    <div className="eventCard" key={events[key].id} >
        <div className="card-header">
            { formatTitle(events[key].title) }
            <div className="divider"></div>
            { formatDateTime(events[key].eventTime, events[key].eventDate) }
        </div>
        <div className="card-body">
            { formatDesc(events[key].summary) }
        </div>
        <div className="card-footer">
            <button className="btn" onClick={ () => { showEventModel(events[key].id) } }>View Details</button>
        </div>
    </div>
    );

    const attendingCardList = Object.keys(attendingEvents).map((key, index) => 
    <div className="eventCard" key={attendingEvents[key].id} >
        <div className="card-header">
            { formatTitle(attendingEvents[key].title) }
            <div className="divider"></div>
            { formatDateTime(attendingEvents[key].eventTime, attendingEvents[key].eventDate) }
        </div>
        <div className="card-body">
            { formatDesc(attendingEvents[key].summary) }
        </div>
        <div className="card-footer">
            <button className="btn" onClick={ () => { showEventModel(attendingEvents[key].id) } }>View Details</button>
        </div>
    </div>);

    useEffect(() => {
        dispatch<any>(getEvents());
        dispatch<any>(getAttendingEvents( {user_Id: id} ));
    }, [dispatch, selectedEventIsAttending]);

    return (
        <div>
            <h2 style={{color:'red'}}>Attending</h2>
            <div className="cardContainer">
                {attendingEvents.length > 0 ? attendingCardList : "Your not attending any events"}
            </div>
            
            <h2 style={{color:'red'}}>New</h2>
            <div className="cardContainer">
                {cardList}
            </div>
            
            {selectedEvent.length > 0 ? <EventModel /> : ""}
        </div>
    );

}