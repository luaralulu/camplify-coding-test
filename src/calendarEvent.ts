/**
 * Events with a start and end, already in Date format.
 *
 * @class CalendarEvent
 */
class CalendarEvent {

    start: Date 
    end: Date

    constructor(start: Date, end: Date) {
        this.start = start
        this.end = end
    }
}

export default CalendarEvent