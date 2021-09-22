import { add } from "date-fns";
import { types } from "../types/types";

const initialState = {
    events: [
        {
            title: "Mi cumple",
            start: new Date(),
            end: add(new Date(), { hours: 2 }),
            bgcolor: "#fafafa",
            notes: "Comprar el pastel",
            user: {
                _id: "123",
                name: "Angel",
            },
        },
    ],
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
        default:
            return state;
    }
};
