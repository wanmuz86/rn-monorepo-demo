/**
 * FeatureRegistry shape:
 * routes: [{ name, component, options? }]
 * tabs:   [{ name, title, routeName, icon? }]
 */

export function createEmptyRegistry() {
    // the structure of our app, routes/ stack and tabs
    // TBC - If I na need a drawer, I will do it here as well
  return { routes: [], tabs: [] };
}

// If of the features register their route
export function addRoute(registry, route) {
  if (!registry?.routes) throw new Error("Invalid registry: missing routes[]");
  if (!route?.name) throw new Error("Route requires name");
  if (!route?.component)
    throw new Error(`Route "${route?.name}" requires component`);
  registry.routes.push(route);
}

// If of the features register if they need to be created as a tab
// and the information needed , eg name, title, TBC - Icon
export function addTab(registry, tab) {
  if (!registry?.tabs) throw new Error("Invalid registry: missing tabs[]");
  if (!tab?.name) throw new Error("Tab requires name");
  if (!tab?.title) throw new Error(`Tab "${tab?.name}" requires title`);
  if (!tab?.routeName)
    throw new Error(`Tab "${tab?.name}" requires routeName`);
  registry.tabs.push(tab);
}

// validation logic for duplicate route, duplicate tab ..
export function validateRegistry(registry) {
  const routeNames = new Set();

  for (const r of registry.routes) {
    if (routeNames.has(r.name)) throw new Error(`Duplicate route: ${r.name}`);
    routeNames.add(r.name);
  }

  const tabNames = new Set();
  for (const t of registry.tabs) {
    if (tabNames.has(t.name)) throw new Error(`Duplicate tab: ${t.name}`);
    tabNames.add(t.name);

    if (!routeNames.has(t.routeName)) {
      throw new Error(
        `Tab "${t.name}" points to missing route "${t.routeName}"`
      );
    }
  }

  return true;
}

