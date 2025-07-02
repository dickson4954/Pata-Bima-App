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
import VehicleInsuranceScreen4 from './screens/VehicleInsuranceScreen4';
import VehicleInsuranceScreen5 from './screens/VehicleInsuranceScreen5';
import VehicleInsuranceScreen6 from './screens/VehicleInsuranceScreen6';
import VehicleInsuranceScreen7 from './screens/VehicleInsuranceScreen7';
import VehicleInsuranceScreen8 from './screens/VehicleInsuranceScreen8';
import VehicleInsuranceScreen9 from './screens/VehicleInsuranceScreen9';

// Commercial Vehicle Insurance Screens
import CommercialInsurance1 from './screens/CommercialInsurance1';
import CommercialInsurance2 from './screens/CommercialInsurance2';
import CommercialInsurance3 from './screens/CommercialInsurance3';
import CommercialInsurance4 from './screens/CommercialInsurance4';


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
        <Stack.Screen name="VehicleInsurance4" component={VehicleInsuranceScreen4} />
        <Stack.Screen name="VehicleInsurance5" component={VehicleInsuranceScreen5} />
        <Stack.Screen name="VehicleInsurance6" component={VehicleInsuranceScreen6} />
        <Stack.Screen name="VehicleInsurance7" component={VehicleInsuranceScreen7} />
        <Stack.Screen name="VehicleInsurance8" component={VehicleInsuranceScreen8} />
        <Stack.Screen name="VehicleInsurance9" component={VehicleInsuranceScreen9} />

        {/* Commercial Vehicle Insurance Flow */}
        <Stack.Screen 
          name="CommercialInsurance1" 
          component={CommercialInsurance1}
          options={{ title: 'Commercial Insurance' }}
        />
        <Stack.Screen 
          name="CommercialInsurance2" 
          component={CommercialInsurance2}
          options={{ title: 'Policy Details' }}
        />
         <Stack.Screen 
          name="CommercialInsurance3" 
          component={CommercialInsurance3}
          options={{ title: 'Vehicle Details' }}
        />
        <Stack.Screen 
          name="CommercialInsurance4" 
          component={CommercialInsurance4}
          options={{ title: 'KYC Documents' }}
        />


        {/* Other Insurance Types */}
        {/* <Stack.Screen name="MedicalInsurance" component={MedicalInsuranceScreen} />
        <Stack.Screen name="WIBAInsurance" component={WIBAInsuranceScreen} />
        <Stack.Screen name="LastExpense" component={LastExpenseScreen} />
        <Stack.Screen name="Upcoming" component={UpcomingScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}