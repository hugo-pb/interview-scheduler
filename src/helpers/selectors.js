export function getAppointmentsForDay(state, nameDay) {
  const foundDay = state.days.find((day) => day.name === nameDay);
  if (!foundDay) {
    return [];
  }
  return foundDay.appointments.map(
    (appointmentID) => state.appointments[appointmentID]
  );
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  };
}

export function getInterviewersForDay(state, nameDay) {
  const foundDay = state.days.find((day) => day.name === nameDay);
  if (!foundDay) {
    return [];
  }
  return foundDay.interviewers.map((interviewerId) => {
    return state.interviewers[interviewerId];
  });
}
