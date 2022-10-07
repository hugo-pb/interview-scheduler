export function getAppointmentsForDay(state, nameDay) {
  const filteredNames = state.days.filter((day) => {
    return day.name === nameDay;
  });
  if (!filteredNames.length) {
    return [];
  }

  const arr = filteredNames[0].appointments;

  let arr2 = Object.keys(state.appointments);
  arr2 = arr2.map((a) => Number(a));
  arr2 = arr2.filter((a) => {
    return arr.includes(a);
  });

  arr2 = arr2.map((a) => {
    return state.appointments[a];
  });
  return arr, arr2;
}
