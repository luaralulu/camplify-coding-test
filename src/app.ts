import CalendarEvent from "./calendarEvent"
import filterAvailable from "./filter"

let already_booked = [
    new CalendarEvent(new Date("2018-12-19 16:00:00"), new Date("2018-12-19 17:00:00")),
    new CalendarEvent(new Date("2018-12-20 9:00:00"), new Date("2018-12-20 10:00:00")),
    new CalendarEvent(new Date("2018-12-21 13:00:00"), new Date("2018-12-21 13:30:00"))
]

let available = [
    new CalendarEvent(new Date("2018-12-19 16:00:00"), new Date("2018-12-19 17:00:00")),
    new CalendarEvent(new Date("2018-12-20 9:30:00"), new Date("2018-12-20 11:30:00")),
    new CalendarEvent(new Date("2018-12-28 12:00:00"), new Date("2018-12-28 15:00:00")),
    new CalendarEvent(new Date("2018-12-29 13:00:00"), new Date("2018-12-29 14:00:00")),
]

let result = filterAvailable(already_booked, available)

result.forEach(el => {
        console.log(el.start.toDateString() + " " + el.start.toLocaleTimeString())
    })