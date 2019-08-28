import CalendarEvent from "./calendarEvent"

/**
 * filterAvailable will filter an array of available CalendarEvents and return all the events that
 * are not in conflict with already booked CalendarEvents.
 * 
 * Days of the week are not significant. Meaning that an event on Friday 21st Dec,
 * 1:00 - 1:30pm will clash with an event on Friday 28th Dec – 1:00-3:00pm, as they are on the same
 * day of the week and overlap time despite being in separate weeks.
 * 
 * Events are assumed to start and end in the same day.
 *
 * @export
 * @param {CalendarEvent[]} booked - the array of booked CalendarEvents
 * @param {CalendarEvent[]} available - the array of available CalendarEvents
 * @returns {CalendarEvent[]} - the array of CalendarEvents that are available that don't collide with booked events
 */
export default function filterAvailable(booked: CalendarEvent[], available: CalendarEvent[]): CalendarEvent[] {
    let notAvailable = available.filter(avail => {
        return booked.some(b => {
            return availableEndTimeCollides(avail, b) ||
                    availableStartTimeCollides(avail, b)
        })
    })

    return available.filter(avail => {
        return notAvailable.filter(na => {
              return na == avail
            }).length == 0
    })
}

/**
 * Compares available and booked CalendarEvent if the Day of the week and the
 * END time of the available event collides with the booked event.
 *
 * @param {CalendarEvent} avail - the available CalendarEvent
 * @param {CalendarEvent} b - the already booked CalendarEvent
 * @returns {Boolean} - true if the events collide
 */
function availableEndTimeCollides(avail: CalendarEvent, b: CalendarEvent): Boolean {
    return  getTimeInMinutes(avail.end) > getTimeInMinutes(b.start) &&         // Available end time after booked time starts
            getTimeInMinutes(avail.start) < getTimeInMinutes(b.start) &&      // Available start time before booked time starts
            avail.start.getDay() == b.start.getDay()
}

/**
 * Compares available and booked CalendarEvent if the Day of the week and the
 * START time of the available event collides with the booked event.
 *
 * @param {CalendarEvent} avail - the available CalendarEvent
 * @param {CalendarEvent} b - the already booked CalendarEvent
 * @returns {Boolean} - true if the events collide
 */
function availableStartTimeCollides(avail: CalendarEvent, b: CalendarEvent): Boolean {
    return getTimeInMinutes(avail.start) >= getTimeInMinutes(b.start) &&    // Available start time after booked time starts
            getTimeInMinutes(avail.start) < getTimeInMinutes(b.end) &&       // Available start time before booked time ends
           avail.start.getDay() == b.start.getDay()
}

/**
 * Converts a Date to number for easy comparison of times within a day.
 *
 * @param {Date} date - the date to be converted
 * @returns {number} - time in hours + minutes
 */
function getTimeInMinutes(date: Date): number {
    return date.getHours() * 60 + date.getMinutes()
}