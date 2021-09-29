import { types } from '../types/types';

// {
//     id: new Date().getTime(),
//     title: "Mi cumple",
//     start: new Date(),
//     end: add(new Date(), { hours: 2 }),
//     bgcolor: "#fafafa",
//     notes: "Comprar el pastel",
//     user: {
//         _id: "123",
//         name: "Angel",
//     },
// },

const initialState = {
    events: [],
    activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload,
            };

        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload],
            };

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null,
            };

        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map((e) => (e.id === action.payload.id ? action.payload : e)),
            };
        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter((e) => e.id !== state.activeEvent.id),
                activeEvent: null,
            };

        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload],
            };
        case types.eventLogout:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};
