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
    const days = getSpots(true);

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
    const days = getSpots(false);

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };

  const getSpots = (increment) => {
    const currentDay = state.day;
    const foundDay = state.days.find((day) => day.name === currentDay);

    increment ? (foundDay.spots -= 1) : (foundDay.spots += 1);

    const days = [...state.days];
    days[foundDay.id] = foundDay;

    return days;
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
