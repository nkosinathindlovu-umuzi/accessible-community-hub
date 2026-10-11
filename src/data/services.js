// The clinic services I am using for the portal. This is made-up data for the project.
// The nurse names and times are not real.

export const categories = [
  { id: "checkup", name: "General check-ups" },
  { id: "child", name: "Child health" },
  { id: "chronic", name: "Blood pressure and sugar" },
  { id: "vaccine", name: "Vaccinations" },
];

export const branches = ["Scottsville", "Edendale", "Imbali"];

export const services = [
  {
    id: 1,
    name: "General check-up",
    category: "checkup",
    branch: "Imbali",
    nurse: "Sister Zulu",
    nextFree: "Monday 08:30",
    description: "A general visit to talk to a nurse about how you are feeling.",
  },
  {
    id: 2,
    name: "Wellness check-up",
    category: "checkup",
    branch: "Scottsville",
    nurse: "Sister Ngcobo",
    nextFree: "Tuesday 10:00",
    description: "Weight, blood pressure and a chat about staying healthy.",
  },
  {
    id: 3,
    name: "Baby clinic",
    category: "child",
    branch: "Edendale",
    nurse: "Sister Dlamini",
    nextFree: "Monday 09:15",
    description: "Weighing, growth checks and advice for new mothers.",
  },
  {
    id: 4,
    name: "Child health check",
    category: "child",
    branch: "Scottsville",
    nurse: "Sister Cele",
    nextFree: "Wednesday 11:30",
    description: "A check-up for children from one to twelve years old.",
  },
  {
    id: 5,
    name: "Blood pressure check",
    category: "chronic",
    branch: "Scottsville",
    nurse: "Sister Khumalo",
    nextFree: "Monday 08:00",
    description: "A nurse checks your blood pressure and talks to you about the results.",
  },
  {
    id: 6,
    name: "Sugar check",
    category: "chronic",
    branch: "Edendale",
    nurse: "Sister Mthembu",
    nextFree: "Thursday 08:45",
    description: "A finger-prick test for sugar, with advice on food and medicine.",
  },
  {
    id: 7,
    name: "Flu vaccination",
    category: "vaccine",
    branch: "Scottsville",
    nurse: "Sister Zondi",
    nextFree: "Friday 09:00",
    description: "A quick flu injection before winter.",
  },
  {
    id: 8,
    name: "Child vaccinations",
    category: "vaccine",
    branch: "Imbali",
    nurse: "Sister Shange",
    nextFree: "Tuesday 13:00",
    description: "Baby and child injections, as on the Road to Health card.",
  },
];
