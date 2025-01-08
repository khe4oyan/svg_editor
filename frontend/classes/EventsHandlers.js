class EventsHandlers {
  static #allEventsHandlers = [];

  constructor() { throw new Error("cant create instance of EventsHandlers"); }

  static addNewEventHandler(elem, type, handler) {
    elem.addEventListener(type, handler);
    EventsHandlers.#allEventsHandlers.push({ elem, type, handler });
  }

  static clearEventsHandlers() {
    for (let i = 0; i < EventsHandlers.#allEventsHandlers.length; ++i) {
      const { elem, type, handler } = EventsHandlers.#allEventsHandlers[i];
      elem.removeEventListener(type, handler);
    }
  }
}

export default EventsHandlers;