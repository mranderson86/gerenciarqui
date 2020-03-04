import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../pages/public/Login";

const AuthStack = createStackNavigator();

// Rota de navigação login / cadastro
function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#FFFFFF",
        headerStyle: {
          backgroundColor: "#F7F7F7"
        }
      }}
    >
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }}
      />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;
