class ConsoleAnalytics {
  track(event) {
    // later you can swap to Firebase / Amplitude / Segment etc.
    console.log("[Analytics]", event?.name, event?.props || {});
  }
}

export const analytics = new ConsoleAnalytics();
