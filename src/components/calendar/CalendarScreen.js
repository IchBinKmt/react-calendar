import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { es } from 'date-fns/locale';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarModal } from './CalendarModal';
import { CalendarEvent } from './CalendarEvent';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

const locales = {
    es,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export const CalendarScreen = () => {
    const dispatch = useDispatch();
    const { uid } = useSelector((state) => state.auth);
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const [lastview, setLastview] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch]);

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    };

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    };

    const onViewChange = (e) => {
        setLastview(e);
        localStorage.setItem('lastView', e);
    };

    const onSelectSlot = (e) => {
        // console.log(e)
        dispatch(eventClearActiveEvent());
    };

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: uid === event.user._id ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        };
        return {
            style,
        };
    };

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                culture={'es'}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                onView={onViewChange}
                onSelectEvent={onSelectEvent}
                onDoubleClickEvent={onDoubleClick}
                onSelectSlot={onSelectSlot}
                view={lastview}
            />

            <AddNewFab />

            {activeEvent && <DeleteEventFab />}

            <CalendarModal />
        </div>
    );
};
