import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { eventBus, analytics, storage } from "rn-common-lib";


export function LoginScreen() {
 const [email, setEmail] = useState("demo@company.com");
 const [password, setPassword] = useState("password");


 async function onLogin() {
   // Fake auth for lab
   const user = { userId: "u-001", email };


   // Store the session / token from the storage inside the common-lib
   await storage.setItem("session:userId", user.userId);


   // Call the track function from the analytics common lib
   analytics.track({ name: "BUTTON_CLICK", props: { id: "login_submit" } });

   // EMIT an EVENT through the Event Bus from the common lib, which AUTH_LOGGED_IN
   eventBus.emit("AUTH:LOGGED_IN", user);


    // EMIT an EVENT NAVGO:GO from the common lib, by passing the next route "CUSTOMERLIST"

   eventBus.emit("NAV:GO", { route: "CustomerList" });
 }


 return (
   <View style={{ padding: 16, gap: 12 }}>
     <Text style={{ fontSize: 22, fontWeight: "700" }}>Login</Text>


     <View style={{ gap: 6 }}>
       <Text>Email</Text>
       <TextInput
         value={email}
         onChangeText={setEmail}
         autoCapitalize="none"
         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
       />
     </View>


     <View style={{ gap: 6 }}>
       <Text>Password</Text>
       <TextInput
         value={password}
         onChangeText={setPassword}
         secureTextEntry
         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
       />
     </View>


     <Pressable
       onPress={onLogin}
       style={{
         padding: 12,
         borderRadius: 8,
         borderWidth: 1,
         alignItems: "center",
       }}
     >
       <Text style={{ fontWeight: "600" }}>Sign In</Text>
     </Pressable>


     <Text style={{ opacity: 0.6 }}>
       Emits AUTH:LOGGED_IN + saves session:userId + optional NAV:GO
     </Text>
   </View>
 );
}
