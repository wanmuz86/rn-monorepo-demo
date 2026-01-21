// EventBus implements a simple publish–subscribe (pub/sub) system.
// It allows loosely-coupled communication between modules
// without direct imports or dependencies.

export class EventBus {

  constructor() {
    // Map of eventName -> Set of handler functions
    // Using Set prevents duplicate handlers
    this.listeners = new Map();
  }


  // Register an event listener

  // eventName: string identifying the event (e.g. "NAV:GO")
  // handler: function to execute when the event is emitted

  // When an event happen
  // Eg When NAV:GO happem , perform whatever passed on the handler
  on(eventName, handler) {
    // Get existing listeners or create a new Set
    const set = this.listeners.get(eventName) || new Set();

    // Add the handler to the Set
    set.add(handler);

    // Store back in the Map
    this.listeners.set(eventName, set);

    // Return an unsubscribe function
    // IMPORTANT: callers must call this on unmount to avoid leaks
    return () => {
      const current = this.listeners.get(eventName);
      if (!current) return;

      // Remove the handler
      current.delete(handler);

      // Clean up empty Sets
      if (current.size === 0) {
        this.listeners.delete(eventName);
      }
    };
  }


  // Emit an event to all registered listeners (e.g. "NAV:GO")

  // payload can be any data structure (object, string, etc.)

  // Publish an event, and ask the listner to perform whatever passed as a payload
  emit(eventName, payload) {
    const set = this.listeners.get(eventName);
    if (!set) return;

    // Call each handler with the payload
    for (const handler of set) {
      handler(payload);
    }
  }

  // Remove ALL listeners
  // Useful for:
  // - app reset
  // - logout
  // - test cleanup
  clear() {
    this.listeners.clear();
  }
}

// Shared singleton instance
// All modules import and use the same bus instance
// This enables cross-module communication without tight coupling
export const eventBus = new EventBus();

