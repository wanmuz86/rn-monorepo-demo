import React, { useEffect, useMemo } from "react";
import {
 NavigationContainer,
 createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import { registry } from "./registry/index";
import { eventBus } from "rn-common-lib";


const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();


// The navigation tree that going to be passed as params props to all the Screen
// DetailScreen({navigation})
export const navRef = createNavigationContainerRef();


function RegistryTabs() {
    // to hoist / not to refresh when there is a chnage in the tab component
 const tabScreens = useMemo(() => {
   if (!registry || !registry.tabs || !registry.routes) {
     return [];
   }
   return registry.tabs.map((t) => {
     const route = registry.routes.find((r) => r.name === t.routeName);
     const Screen = route ? route.component : null;


     const TabScreen = function TabScreenWrapper(props) {
       return Screen ? <Screen {...props} /> : null;
     };


     return { t, TabScreen };
   });
 }, []);


 if (tabScreens.length === 0) {
   // Return a placeholder screen if no tabs are available
   const PlaceholderScreen = () => null;
   return (
     <Tabs.Navigator>
       <Tabs.Screen
         name="Placeholder"
         component={PlaceholderScreen}
         options={{ title: "Loading..." }}
       />
     </Tabs.Navigator>
   );
 }


 return (
   <Tabs.Navigator>
     {tabScreens.map(({ t, TabScreen }) => (
       <Tabs.Screen
         key={t.name}
         name={t.name}
         component={TabScreen}
         options={{ title: t.title }}
       />
     ))}
   </Tabs.Navigator>
 );
}


export function AppNavigator() {
 useEffect(() => {

    // Register to the "NAV:GO" event,
   const off = eventBus.on("NAV:GO", (payload) => {

    // Whenever it is called, 
    // get the route passed by the Emitter
    // get the path by the emitter
     const route = payload && payload.route;
     const params = payload && payload.params;


     // error handling
     if (!route) return;

     // if the navigation is ready , navigate to the new page based on the route given
     if (navRef.isReady()) navRef.navigate(route, params);
   });

// offload - when component is gone // compenent lifecyle
// componentDidUnmout / before the page go away
//un subsctibe from the event
   return off;
 }, []);


 // if registry is not there or registry.routes is empty
 // create a placeholder
 if (!registry || !registry.routes) {
   // Return a minimal navigator if registry is not available
   const PlaceholderScreen = () => null;
   return (
     <NavigationContainer ref={navRef}>
       <Stack.Navigator>
         <Stack.Screen
           name="Placeholder"
           component={PlaceholderScreen}
           options={{ title: "Loading..." }}
         />
       </Stack.Navigator>
     </NavigationContainer>
   );
 }


 return (
   <NavigationContainer ref={navRef}>
     <Stack.Navigator>
        {/* Create the Tab first */}
       <Stack.Screen
         name="HomeTabs"
         component={RegistryTabs}
         options={{ headerShown: false }}
       />

{/* We create the stacks and the Screen based on what is defined registry.routes */}
       {registry.routes && registry.routes.map((r) => (
         <Stack.Screen
           key={r.name}
           name={r.name}
           component={r.component}
           options={r.options}
         />
       ))}
     </Stack.Navigator>
   </NavigationContainer>
 );
}
