import { EventBus } from "./eventBus.js";

describe("EventBus", () => {

  test("should deliver payload to listener", () => {

    // create an event BUS
    const bus = new EventBus();
    const received = [];

    // Register listener for event "PING"
    bus.on("PING", (p) => received.push(p));

    // Publisher emit event "PING" with payload {ok:tru}
    bus.emit("PING", { ok: true });

    // Listener should receive whatever passed on the payload
    expect(received).toEqual([{ ok: true }]);
  });

  test("unsubscribe should stop receiving events", () => {
    const bus = new EventBus();
    const received = [];

    // Register and capture the unsubscribe function
    const off = bus.on("PING", (p) => received.push(p));

    // First emit should be received
    bus.emit("PING", 1);

    // Unsubscribe the listener
    off();

    // Second emit should NOT be received
    bus.emit("PING", 2);

    expect(received).toEqual([1]);
  });

  test("multiple listeners should all receive events", () => {


    const bus = new EventBus();

    // first listener
    const a = [];
    // sencond listener
    const b = [];

    // Register two listeners for same event
    bus.on("X", (n) => a.push(n));
    bus.on("X", (n) => b.push(n));

    // Emit event "X"— both listeners should get it
    bus.emit("X", 7);

    expect(a).toEqual([7]);
    expect(b).toEqual([7]);
  });
});

