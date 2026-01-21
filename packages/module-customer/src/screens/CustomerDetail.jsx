import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { analytics } from "rn-common-lib";


// Will get the customer id from the props
export function CustomerDetailScreen(props) {
 const id =
   (props &&
     props.route &&
     props.route.params &&
     props.route.params.id) ||
   "unknown";


 useEffect(() => {
    // Call the SCREEN_VIEW analytics through common lib
   analytics.track({ name: "SCREEN_VIEW", props: { screen: "CustomerDetail" } });
   
 }, []);


 return (
   <View style={{ padding: 16, gap: 10 }}>
     <Text style={{ fontSize: 22, fontWeight: "700" }}>Customer Detail</Text>
     <Text>Customer ID: {id}</Text>
     <Text style={{ opacity: 0.6 }}>(Lab) Fetch customer data using id</Text>
   </View>
 );
}
