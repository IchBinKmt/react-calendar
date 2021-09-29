import { parseISO, toDate } from 'date-fns';

export const prepareEvents = (events = []) => {
    return events.map((event) => ({
        ...event,
        end: toDate(parseISO(event.end)),
        start: toDate(parseISO(event.start)),
    }));
};
