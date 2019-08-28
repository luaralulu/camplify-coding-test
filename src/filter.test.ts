import filterAvailable from "./filter"
import CalendarEvent from "./calendarEvent"

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

test("filtering empty arrays should return empty array", () => {
    expect(filterAvailable([], [])).toStrictEqual([])
})

test("filtering empty available events should return empty array", () => {
    expect(filterAvailable(already_booked, [])).toStrictEqual([])
})

test("filtering empty booked events should return all the available times", () => {
    expect(filterAvailable([], available)).toStrictEqual(available)
})

test("filtering booked events should return all the available events", () => {
    let expectedRedult = [
        new CalendarEvent(new Date("2018-12-29 13:00:00"), new Date("2018-12-29 14:00:00"))
    ]
    expect(filterAvailable(already_booked, available)).toStrictEqual(expectedRedult)
})

test("event with end date before started date of booked event should be available", () => {
    let bookedEvent = [
        new CalendarEvent(new Date("2018-12-29 13:00:00"), new Date("2018-12-29 14:00:00"))
    ]
    let availableEvent = [
        new CalendarEvent(new Date("2018-12-29 09:00:00"), new Date("2018-12-29 11:00:00"))
    ]
    expect(filterAvailable(bookedEvent, availableEvent)).toStrictEqual(availableEvent)
})

test("event with end date same as started date of booked event should be available", () => {
    let bookedEvent = [
        new CalendarEvent(new Date("2018-12-29 13:00:00"), new Date("2018-12-29 14:00:00"))
    ]
    let availableEvent = [
        new CalendarEvent(new Date("2018-12-29 09:00:00"), new Date("2018-12-29 13:00:00"))
    ]
    expect(filterAvailable(bookedEvent, availableEvent)).toStrictEqual(availableEvent)
})

test("event with end date after started date of booked event should NOT be available", () => {
    let bookedEvent = [
        new CalendarEvent(new Date("2018-12-29 13:00:00"), new Date("2018-12-29 14:00:00"))
    ]
    let availableEvent = [
        new CalendarEvent(new Date("2018-12-29 11:00:00"), new Date("2018-12-29 13:30:00"))
    ]
    expect(filterAvailable(bookedEvent, availableEvent)).toStrictEqual([])
})

test("event with colliding time in the same week should NOT be available", () => {
    let bookedEvent = [
        new CalendarEvent(new Date("2018-12-22 13:00:00"), new Date("2018-12-22 14:00:00"))
    ]
    let availableEvent = [
        new CalendarEvent(new Date("2018-12-29 11:00:00"), new Date("2018-12-29 13:30:00"))
    ]
    expect(filterAvailable(bookedEvent, availableEvent)).toStrictEqual([])
})

test("event with start date before end date of booked event should NOT be available", () => {
    let bookedEvent = [
        new CalendarEvent(new Date("2018-12-29 13:00:00"), new Date("2018-12-29 14:00:00"))
    ]
    let availableEvent = [
        new CalendarEvent(new Date("2018-12-29 13:30:00"), new Date("2018-12-29 15:00:00"))
    ]
    expect(filterAvailable(bookedEvent, availableEvent)).toStrictEqual([])
})

test("event with start date after end date of booked event should be available", () => {
    let bookedEvent = [
        new CalendarEvent(new Date("2018-12-29 13:00:00"), new Date("2018-12-29 14:00:00"))
    ]
    let availableEvent = [
        new CalendarEvent(new Date("2018-12-29 15:00:00"), new Date("2018-12-29 16:00:00"))
    ]
    expect(filterAvailable(bookedEvent, availableEvent)).toStrictEqual(availableEvent)
})

test("event with start date same as end date of booked event should be available", () => {
    let bookedEvent = [
        new CalendarEvent(new Date("2018-12-29 13:00:00"), new Date("2018-12-29 14:00:00"))
    ]
    let availableEvent = [
        new CalendarEvent(new Date("2018-12-29 14:00:00"), new Date("2018-12-29 16:00:00"))
    ]
    expect(filterAvailable(bookedEvent, availableEvent)).toStrictEqual(availableEvent)
})

test("filtering booked events should return all the available events (extended)", () => {
    let bookedEvent = [
        new CalendarEvent(new Date("2018-12-19 16:00:00"), new Date("2018-12-19 17:00:00")),
        new CalendarEvent(new Date("2018-12-20 9:00:00"), new Date("2018-12-20 10:00:00")),
        new CalendarEvent(new Date("2018-12-21 13:00:00"), new Date("2018-12-21 13:30:00")),
        new CalendarEvent(new Date("2018-12-21 18:00:00"), new Date("2018-12-21 22:30:00"))
    ]
    let availableEvent = [
        new CalendarEvent(new Date("2018-12-14 12:00:00"), new Date("2018-12-14 15:00:00")), 
        new CalendarEvent(new Date("2018-12-19 15:00:00"), new Date("2018-12-19 18:00:00")), 
        new CalendarEvent(new Date("2018-12-19 16:00:00"), new Date("2018-12-19 17:00:00")), 
        new CalendarEvent(new Date("2018-12-19 19:00:00"), new Date("2018-12-19 20:00:00")), // available
        new CalendarEvent(new Date("2018-12-20 7:00:00"), new Date("2018-12-20 9:00:00")),  // available
        new CalendarEvent(new Date("2018-12-20 9:30:00"), new Date("2018-12-20 11:30:00")), 
        new CalendarEvent(new Date("2018-12-21 12:00:00"), new Date("2018-12-21 15:00:00")),
        new CalendarEvent(new Date("2018-12-21 13:00:00"), new Date("2018-12-21 13:30:00")), 
        new CalendarEvent(new Date("2018-12-21 19:00:00"), new Date("2018-12-21 20:00:00")), 
        new CalendarEvent(new Date("2018-12-28 12:00:00"), new Date("2018-12-28 15:00:00")), 
        new CalendarEvent(new Date("2018-12-29 13:00:00"), new Date("2018-12-29 14:00:00")) // available         
    ]
    let expectedResult = [
        new CalendarEvent(new Date("2018-12-19 19:00:00"), new Date("2018-12-19 20:00:00")),
        new CalendarEvent(new Date("2018-12-20 7:00:00"), new Date("2018-12-20 9:00:00")), 
        new CalendarEvent(new Date("2018-12-29 13:00:00"), new Date("2018-12-29 14:00:00")) 
    ]
    expect(filterAvailable(bookedEvent, availableEvent)).toStrictEqual(expectedResult)
})