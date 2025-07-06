import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Auth Screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgetPasswordScreen';
import MainTabs from './screens/MainTabs';

// Private Vehicle Insurance Screens
import VehicleInsuranceScreen1 from './screens/VehicleInsuranceScreen1';
import VehicleInsuranceScreen2 from './screens/VehicleInsuranceScreen2';
import VehicleInsuranceScreen3 from './screens/VehicleInsuranceScreen3';

import VehicleInsuranceScreen5 from './screens/VehicleInsuranceScreen5';
import VehicleInsuranceScreen6 from './screens/VehicleInsuranceScreen6';
import VehicleInsuranceScreen7 from './screens/VehicleInsuranceScreen7';
import VehicleInsuranceScreen8 from './screens/VehicleInsuranceScreen8';
import VehicleInsuranceScreen9 from './screens/VehicleInsuranceScreen9';
import VehicleInsuranceScreen10 from './screens/VehicleInsuranceScreen10';
import VehicleInsuranceScreen11 from './screens/VehicleInsuranceScreen11';

import VehicleComprehensiveScreen3 from './screens/VehicleComprehensiveScreen3';
import VehicleComprehensiveScreen4 from './screens/VehicleComprehensiveScreen4';
import VehicleComprehensiveScreen5 from './screens/VehicleComprehensiveScreen5';
import VehicleComprehensiveScreen6 from './screens/VehicleComprehensiveScreen6';
import ViewQuoteScreen from './screens/ViewQuoteScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        {/* Auth & Main Navigation */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* Private Vehicle Insurance Flow */}
        <Stack.Screen name="VehicleInsurance1" component={VehicleInsuranceScreen1} />
        <Stack.Screen name="VehicleInsurance2" component={VehicleInsuranceScreen2} />
        <Stack.Screen name="VehicleInsurance3" component={VehicleInsuranceScreen3} />
        
        <Stack.Screen name="VehicleInsurance5" component={VehicleInsuranceScreen5} />
        <Stack.Screen name="VehicleInsurance6" component={VehicleInsuranceScreen6} />
        <Stack.Screen name="VehicleInsurance7" component={VehicleInsuranceScreen7} />
        <Stack.Screen name="VehicleInsurance8" component={VehicleInsuranceScreen8} />
        <Stack.Screen name="VehicleInsurance9" component={VehicleInsuranceScreen9} />
        <Stack.Screen name="VehicleInsurance10" component={VehicleInsuranceScreen10} />
         <Stack.Screen name="VehicleInsurance11" component={VehicleInsuranceScreen11} />

        <Stack.Screen name="VehicleComprehensive3" component={VehicleComprehensiveScreen3} />
         <Stack.Screen name="VehicleComprehensive4" component={VehicleComprehensiveScreen4} />
         <Stack.Screen name="VehicleComprehensive5" component={VehicleComprehensiveScreen5} />
          <Stack.Screen name="VehicleComprehensive6" component={VehicleComprehensiveScreen6} />


        <Stack.Screen name="ViewQuoteScreen" component={ViewQuoteScreen} />



        {/* Other Insurance Types */}
        {/* <Stack.Screen name="MedicalInsurance" component={MedicalInsuranceScreen} />
        <Stack.Screen name="WIBAInsurance" component={WIBAInsuranceScreen} />
        <Stack.Screen name="LastExpense" component={LastExpenseScreen} />
        <Stack.Screen name="Upcoming" component={UpcomingScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}