import React from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import {es} from 'date-fns/locale'

import { Navbar } from '../ui/Navbar'
import { add } from 'date-fns'
import { messages } from '../../helpers/calendar-messages-es'

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
    notes: 'Comprar el pastel'
}]


export const CalendarScreen = () => {

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
            />
        </div>
    )
}
