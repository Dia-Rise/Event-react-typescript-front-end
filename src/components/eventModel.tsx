import React, {useEffect,} from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEvent, addAttendee, getEventAttendees, checkAttend, unAttend, deleteEvent} from "../redux/eventSlice";
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCheckCircle, faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'
import '../scss/eventModel.scss';


export default function EventModel() {
    const { id } = JSON.parse(localStorage.getItem("login") || "{}");
    const dispatch = useDispatch();
    const {selectedEvent, selectedEventAttendies, selectedEventIsAttending } = useSelector((state:any) => state.eve);

    //------------------------------------------------------------------------------

    const hideEventModel = () => {
        dispatch<any>(hideEvent(""));
    };

    const attendEvent = (userId:number) => {  
        const atendeeInfo = { user_Id: userId, event_Id: selectedEvent[0].id } 
        dispatch<any>(addAttendee(atendeeInfo));
    }

    const deleteEvents = () => {  
        const atendeeInfo = {event_Id: selectedEvent[0].id } 
        dispatch<any>(deleteEvent(atendeeInfo));
    }

    const unattendEvent = (userId:number) => {
        const atendeeInfo = { user_Id: userId, event_Id: selectedEvent[0].id } 
        dispatch<any>(unAttend(atendeeInfo));
    }

    useEffect(() => {
        dispatch<any>(checkAttend( {user_Id: id, event_Id: selectedEvent[0].id} ));
        dispatch<any>(getEventAttendees({event_Id: selectedEvent[0].id}));
    }, [dispatch, selectedEvent, selectedEventIsAttending]);


    //------------------------------------------------------------------------------

    const attendieeList = Object.keys(selectedEventAttendies).map((key, index) => 
    <div key={selectedEventAttendies[key].id} className="attendee">
        <div className="randomColor"></div>
        <p>{selectedEventAttendies[key].firstName + '\xa0' + selectedEventAttendies[key].lasttName } </p>
    </div>);

    //------------------------------------------------------------------------------

    const mondifers = () => {
        return (
            <>
                <button className="btn txt">Edit</button>
                <button className="btn txt del" onClick={ () => deleteEvents() }>Delete</button>
            </>
        )
    }

    const formatDateTime = () => {
        const time = new Date('1995-12-17T'+selectedEvent[0].eventTime.toLocaleString());
        const newTime = format(time, 'hh:mm')
        const date = new Date(selectedEvent[0].eventDate);
        const newDate = format(date, 'dd MMM, yyyy')
        return (
            <p className="model-date">
                <FontAwesomeIcon icon={faCalendar} /> {newDate} | <FontAwesomeIcon icon={faClock} /> {newTime}
            </p>
        );
    }

    //------------------------------------------------------------------------------

    return (
        <div className="popup">
            {selectedEvent.length > 0  ? //IF - SUCCESS
            <div className={'modal ' + (selectedEventIsAttending === true ? 'attending': '')}>
                <div className="exit-model" onClick={ () => { hideEventModel() } }>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </div>
                <div className="modal-content">
                    <div className="model-header">
                        <h1 className="modal-title">{selectedEvent[0].title}</h1>
                        { formatDateTime() }
                    </div> 
                    <div className="model-body">
                        <div className="model-summary-box">
                            <p>{selectedEvent[0].summary}</p>
                        </div>
                    </div>
                    <div className="model-footer">
                        <div>
                            {selectedEventIsAttending === false ? <button className="btn blue" onClick={ () => { attendEvent(id) } } >Attend</button> : <button className="btn green">Attending <FontAwesomeIcon icon={faCheckCircle} /></button> }
                        </div>
                        
                        <div>
                            {selectedEventIsAttending === false ? "" : <button className="btn txt" onClick={ () => { unattendEvent(id) } } >Unattend</button> }
                            {selectedEvent[0].createdBy === id ? mondifers() : ""}
                        </div>
                        
                    </div>
                </div>
                <div className="modal-attending">
                    <h4 style={{margin:0}}>ATTENDING</h4>
                    {selectedEventAttendies.length > 0 ? attendieeList : <p className="noAttending">No one is currently attending</p>}
                </div>
            </div>
            : //ELSE - ERROR
            <div className="modal">
                <div className="exit-model" onClick={ () => { hideEventModel() } }>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </div>
                <div className="modal-content">
                    <p>Somethings gone wrong...</p>
                </div>
            </div>
        }
        </div>
        
    );

}