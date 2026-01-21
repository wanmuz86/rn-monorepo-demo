import { getCombinedRegistry } from "../apps/old-hostapp/src/registry/getCombinedRegistry.js";

// Run the getCombined Registry method
const registry = getCombinedRegistry();

// Get the routes that are stored registry.routes
console.log("=== Routes ===");
registry.routes.forEach((r) => console.log("-", r.name));

console.log("\n=== Tabs ===");
// Get the tabs that are stored registry.tabs
registry.tabs.forEach((t) =>
  console.log("-", t.title, "->", t.routeName)
);

console.log("\n✅ Registry built successfully");
