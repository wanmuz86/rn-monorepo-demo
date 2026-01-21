import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { analytics, eventBus } from "rn-common-lib";


const CUSTOMERS = [
 { id: "c-001", name: "Aisyah" },
 { id: "c-002", name: "Daniel" },
 { id: "c-003", name: "Siti" },
];


export function CustomerListScreen() {
    
 function openCustomer(id) {
    // I call the analytics function, passing the props id of the pressed customer
   analytics.track({
     name: "BUTTON_CLICK",
     props: { id: `open_customer_${id}` },
   });


    // EMIT an EVENT NAVGO:GO from the common lib, by passing the next route "CUSTOMERDETAIL" and parameters
    // customer_id selected
   eventBus.emit("NAV:GO", { route: "CustomerDetail", params: { id } });
 }


 return (
   <View style={{ padding: 16, gap: 12 }}>
     <Text style={{ fontSize: 22, fontWeight: "700" }}>Customers</Text>


     <FlatList
       data={CUSTOMERS}
       keyExtractor={(x) => x.id}
       renderItem={({ item }) => (
         <Pressable
           onPress={() => openCustomer(item.id)}
           style={{
             padding: 12,
             borderRadius: 8,
             borderWidth: 1,
             marginBottom: 10,
           }}
         >
           <Text style={{ fontWeight: "600" }}>{item.name}</Text>
           <Text style={{ opacity: 0.6 }}>{item.id}</Text>
         </Pressable>
       )}
     />


     <Text style={{ opacity: 0.6 }}>(Lab) Emits NAV:GO for CustomerDetail</Text>
   </View>
 );
}
