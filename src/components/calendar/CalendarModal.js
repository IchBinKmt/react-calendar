import React, { useEffect, useState } from "react";

import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import { add, compareAsc, startOfHour, toDate } from "date-fns";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import {
    eventAddNew,
    eventClearActiveEvent,
    eventUpdated,
} from "../../actions/events";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement("#root");
const now = startOfHour(new Date());
const inOneHour = add(startOfHour(new Date()), { hours: 1 });

const initEvent = {
    title: "Event",
    notes: "",
    start: toDate(now),
    end: toDate(inOneHour),
};

export const CalendarModal = () => {
    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState(toDate(now));
    const [endDate, setEndDate] = useState(toDate(inOneHour));
    const [titleValid, setTitleValid] = useState(true);

    const { openModal } = useSelector((state) => state.ui);
    const { activeEvent } = useSelector((state) => state.calendar);

    const [formValues, setFormValues] = useState(initEvent);

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        }
    }, [activeEvent, setFormValues]);

    const handleInputChanges = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (compareAsc(end, start) !== 1) {
            Swal.fire(
                "Error",
                "La fecha fin debe ser mayor a la fecha de inicio",
                "error"
            );
            return;
        }
        if (title.trim().length < 2) {
            return setTitleValid(false);
        }

        // TODO: guardar en base de datos
        if (activeEvent) {
            dispatch(eventUpdated(formValues));
        } else {
            dispatch(
                eventAddNew({
                    ...formValues,
                    id: new Date().getTime(),
                    user: {
                        _id: "123",
                        name: "Angel",
                    },
                })
            );
        }

        setTitleValid(true);
        closeModal();
    };

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e);
        setFormValues({
            ...formValues,
            start: e,
        });
    };

    const handleEndDateChange = (e) => {
        setEndDate(e);
        setFormValues({
            ...formValues,
            end: e,
        });
    };
    return (
        <Modal
            isOpen={openModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={handleSubmitForm}>
                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={toDate(startDate)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={toDate(endDate)}
                        minDate={startDate}
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${
                            !titleValid && "is-invalid"
                        }`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChanges}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        Una descripción corta
                    </small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChanges}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">
                        Información adicional
                    </small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    );
};
