import ProfileScreen from "./screens/ProfileScreen";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CreatePasswordScreen from "./screens/CreatePasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import ScheduleAppointmentScreen from "./screens/ScheduleAppointmentScreen";
import MyAppointmentsScreen from "./screens/MyAppointmentsScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ReviewScreen from "./screens/ReviewScreen";
import FamilyScreen from "./screens/FamilyScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Password" component={CreatePasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="ScheduleAppointment" component={ScheduleAppointmentScreen} />
        <Stack.Screen name="MyAppointments" component={MyAppointmentsScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="Family" component={FamilyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
