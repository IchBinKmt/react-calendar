import React, { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'

import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import {es} from 'date-fns/locale'
import { add } from 'date-fns'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarModal } from './CalendarModal'
import { CalendarEvent } from './CalendarEvent'

const locales = {
    es
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const events = [{
    title: 'Mi cumple',
    start: new Date(),
    end: add(new Date(), { hours: 2 }),
    bgcolor: '#fafafa',
    notes: 'Comprar el pastel',
    user: {
        _id: '123',
        name: 'Angel'
    }
}]


export const CalendarScreen = () => {

    const [lastview, setLastview] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClick = (e) => {
        console.log(e);
    }

    const onSelectEvent = (e) => {
        console.log(e);
    }

    const onViewChange = (e) => {
        setLastview(e);
        localStorage.setItem('lastView',e)
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        console.log(event, start, end, isSelected);
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }       
    };
    
    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                culture={"es"}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{ 
                    event: CalendarEvent
                }}
                onView={onViewChange}
                onSelectEvent={onSelectEvent}
                onDoubleClickEvent={onDoubleClick}
                view={lastview}
            />
            
            <CalendarModal />
        </div>
    )
}
