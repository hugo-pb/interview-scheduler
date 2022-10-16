import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(appointmentId, interview) {
    const appointment = {
      ...state.appointments[appointmentId],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment,
    };

    const days = getSpots(appointmentId, appointments);

    return axios
      .put(`/api/appointments/${appointmentId}`, {
        interview: { ...interview },
      })
      .then(() => {
        setState({
          ...state,
          appointments,
          days,
        });
      });
  }

  const cancelInterview = (appointmentId) => {
    const appointment = {
      ...state.appointments[appointmentId],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment,
    };
    const days = getSpots(appointmentId, appointments);

    return axios.delete(`/api/appointments/${appointmentId}`).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };

  const getSpots = function (appointmentId, appointments) {
    const currentDay = state.days.find((day) =>
      day.appointments.includes(appointmentId)
    );
    let spots = 0;
    for (const appointmentId of currentDay.appointments) {
      if (!appointments[appointmentId].interview) {
        spots++;
      }
    }

    const updatedDay = { ...currentDay, spots };
    const days = state.days.map((day) =>
      day.name === state.day ? updatedDay : day
    );

    return days;
  };
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
