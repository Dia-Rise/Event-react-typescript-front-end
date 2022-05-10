import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent, getEvents } from "../redux/eventSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import '../scss/createEvent.scss';

export default function CreateEvent(props:any) {
    const { id } = JSON.parse(localStorage.getItem("login") || "{}");
    const [eventData, setEventData] = useState({creatorId: id, title: "", summary: "", eventDate: "", eventTime: ""});
    const [characterCount, setCharacterCount] = useState({count: 255});
    const [timeOptions, setTimeOptions] = useState({options: []});
    const dispatch = useDispatch();
    
    //ON SUBMIT, PREVENT DEFAULT BEHAVOUR, SEND REQUEST TO API TO LOG THE USER IN.
    const handleSubmit = (e:any) => {
        e.preventDefault();
        dispatch<any>(createEvent(eventData))
        dispatch<any>(getEvents());
    };

    const updateCharacterCount = (content:any) => {
        const characterLimit = 255;
        const newcharacterCount = characterLimit - content.length;
        setCharacterCount((prev) => ({...prev, count: newcharacterCount }));
    }

    useEffect(() => { //Formats and Fills in time Values for Time dropdown | Runs on start up.
        const options:any = [];
        let hours, minutes;
        for(let i = 420; i<= 1320; i +=15) {
            //--
            hours = Math.floor(i / 60);
            minutes = i % 60;
            if(minutes === 0){
                minutes = "00" 
            }
            //--
            const finalTime = hours +':'+ minutes;
            options.push(finalTime);
        }
        console.log(options);
            setTimeOptions((prev) => ({...prev, options }));
            console.log(timeOptions);
    }, []);

    const timeList = Object.keys(timeOptions.options).map((key:any) => 
    <option key={timeOptions.options[key]} > 
        {timeOptions.options[key]}
    </option>
    );


    return (
        <div className="popup">
            <div className="modal">
                <div className="exit-model" onClick={() => props.close()}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </div>
                <form onSubmit={ handleSubmit } className="modal-content">
                    <div className="model-header">
                        <h1 className="modal-title">Create an Event</h1>
                    </div>
                    <div className="model-body">
                            <label htmlFor="eventTitle">
                                <p>Title</p>
                                <input type="text" name="title" id="eventTitle" placeholder="Event Title" required onChange={ (e) => setEventData( (prev) => ( {...prev, [e.target.name]: e.target.value} ) ) } />
                            </label>
                            <label htmlFor="eventDate" className="half left">
                                <p>Date</p>
                                <input type="date" name="eventDate" id="eventDate" required  onChange={ (e) => setEventData( (prev) => ( {...prev, [e.target.name]: e.target.value} ) ) } />
                            </label>
                            <label htmlFor="eventTime" className="half right">
                                <p>Time</p>
                                {/* <input type="time" step="900" name="eventTime" id="eventTime" required onChange={ (e) => setEventData( (prev) => ( {...prev, [e.target.name]: e.target.value} ) ) } /> */}
                                <select name="eventTime" id="eventTime" required onChange={ (e:any) => setEventData( (prev) => ( {...prev, [e.target.name]: e.target.value} ) ) }>
                                    {timeList}
                                </select>
                            </label>
                            <label htmlFor="eventSummary">
                                <p>Summary</p>
                                <p>{characterCount.count}</p>
                                <textarea name="summary" id="eventSummary" placeholder="Event description goes here..." required  onChange={ (e) => {setEventData( (prev) => ( {...prev, [e.target.name]: e.target.value} ) ); updateCharacterCount(e.target.value)} } />
                            </label>
                    </div>
                    <div className="model-footer">
                        <button type="submit" className="btn blue" disabled={eventData.title.trimStart().length === 0 || eventData.summary.trimStart().length === 0} >Create Event</button>
                    </div>
                </form>

            </div>
        </div>
    );

}