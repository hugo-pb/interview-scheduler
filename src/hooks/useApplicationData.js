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

  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview: { ...interview } })
      .then(() => {
        setState({
          ...state,
          appointments,
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
    // get current day passed from parameter (state)
    const currentDay = state.day;

    // find appointment with param id to see if null
    if (increment) {
      const foundDay = state.days.find((day) => day.name === currentDay);
      foundDay.spots = foundDay.spots - 1;
      //find day and change it

      const days = state.days.map((day) => {
        if (day.name === currentDay) {
          return foundDay;
        }
        return day;
      });

      return days;
    }

    const foundDay = state.days.find((day) => day.name === currentDay);
    foundDay.spots = foundDay.spots + 1;
    const days = state.days.map((day) => {
      if (day.name === currentDay) {
        return foundDay;
      }
      return day;
    });
    return days;
  };

  return { state, setDay, bookInterview, cancelInterview, editInterview };
};

export default useApplicationData;
