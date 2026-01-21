import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { registry } from "./registry";
import { eventBus } from "rn-common-lib";

function TabBar({ tabs, active, onSelect }) {
  return (
    // Use View to manually create the Tab
    <View style={{ flexDirection: "row", padding: 12, borderBottomWidth: 1 }}>
      {tabs.map(t => (
        <Pressable
          key={t.routeName}
          onPress={() => onSelect(t.routeName)}
          style={{ padding: 8, opacity: active === t.routeName ? 1 : 0.6 }}
        >
          <Text>{t.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export function AppNavigator() {
  const initial = registry.tabs[0]?.routeName;
  const [route, setRoute] = useState(initial);
  const [params, setParams] = useState({});

  const routes = useMemo(() => {
    const m = new Map();
    registry.routes.forEach(r => m.set(r.name, r.component));
    return m;
  }, []);

  useEffect(() => {
    return eventBus.on("NAV:GO", ({ route, params }) => {
      if (route) {
        setRoute(route);
        setParams(params || {});
      }
    });
  }, []);

  const Screen = routes.get(route);

  return (
    <View style={{ flex: 1 }}>
      <TabBar
        tabs={registry.tabs}
        active={route}
        onSelect={(r) => {
          setRoute(r);
          setParams({});
        }}
      />
      <View style={{ flex: 1 }}>
        {Screen ? <Screen route={{ params }} /> : <Text>Route not found</Text>}
      </View>
    </View>
  );
}
