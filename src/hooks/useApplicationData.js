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

  console.log(state);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    /// i
    const days = getSpots(id, appointments);
    return axios
      .put(`/api/appointments/${id}`, { interview: { ...interview } })
      .then(() => {
        setState({
          ...state,
          appointments,
          days,
        });
      });
  }

  const cancelInterview = (id) => {
    // set interview of appointment to null
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = getSpots(id, appointments);

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };

  const getSpots = function (id, appointments) {
    const currentDay = state.days.find((day) => day.appointments.includes(id));
    let counter = 0;
    for (const id of currentDay.appointments) {
      if (!appointments[id].interview) {
        counter++;
      }
    }
    const updatedDay = { ...currentDay, spots: counter };
    const days = [...state.days];
    const index = days.findIndex((item) => item.name === currentDay.name);
    days.splice(index, 1, updatedDay);
    return days;
  };
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
