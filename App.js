import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Auth Screens
import WelcomeScreen from './screens/auth/WelcomeScreen';
import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import ForgotPasswordScreen from './screens/auth/ForgetPasswordScreen';

// Main Tabs
import MainTabs from './screens/MainTabs';

// Vehicle Insurance Screens
import VehicleInsuranceScreen1 from './screens/vehicle/VehicleInsuranceScreen1';
import VehicleInsuranceScreen2 from './screens/vehicle/VehicleInsuranceScreen2';
import VehicleInsuranceScreen3 from './screens/vehicle/VehicleInsuranceScreen3';
import VehicleInsuranceScreen5 from './screens/vehicle/VehicleInsuranceScreen5';
import VehicleInsuranceScreen6 from './screens/vehicle/VehicleInsuranceScreen6';
import VehicleInsuranceScreen7 from './screens/vehicle/VehicleInsuranceScreen7';
import VehicleInsuranceScreen8 from './screens/vehicle/VehicleInsuranceScreen8';
import VehicleInsuranceScreen9 from './screens/vehicle/VehicleInsuranceScreen9';
import VehicleInsuranceScreen10 from './screens/vehicle/VehicleInsuranceScreen10';
import VehicleInsuranceScreen11 from './screens/vehicle/VehicleInsuranceScreen11';

import VehicleComprehensiveScreen3 from './screens/vehicle/VehicleComprehensiveScreen3';
import VehicleComprehensiveScreen4 from './screens/vehicle/VehicleComprehensiveScreen4';
import VehicleComprehensiveScreen5 from './screens/vehicle/VehicleComprehensiveScreen5';
import VehicleComprehensiveScreen6 from './screens/vehicle/VehicleComprehensiveScreen6';
import VehicleComprehensiveScreen7 from './screens/vehicle/VehicleComprehensiveScreen7';
import VehicleComprehensiveScreen8 from './screens/vehicle/VehicleComprehensiveScreen8';

import CorporateDetailsScreen from './screens/vehicle/CorporateDetailsScreen1';

// Medical Insurance Screens
import MedicalInsuranceScreen1 from './screens/medical/MedicalInsuranceScreen1';
import MedicalIndividualForm from './screens/medical/MedicalIndividualForm';
import MedicalCorporateForm from './screens/medical/MedicalCorporateForm';

//WIBA Insurance Screens
import WibaInsuranceScreen1 from './screens/wiba/WibaInsuranceScreen1';

import LastExpenseInsuranceScreen1 from './screens/lastExpense/LastExpenseInsuranceScreen1';
import LastExpenseIndividualForm from './screens/lastExpense/LastExpenseIndividualForm';
import LastExpenseCorporateForm from './screens/lastExpense/LastExpenseCorporateForm';


import TravelInsuranceScreen1 from './screens/travel/TravelInsuranceScreen1';

// Professional Indemnity
import ProfessionalIndemnityScreen1 from './screens/professional/ProfessionalIndemnityScreen1';

import DomesticPackageScreen1 from './screens/domestic/DomesticPackageScreen1';



// Quotation View
import ViewQuoteScreen from './screens/vehicle/ViewQuoteScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>

        {/* Auth */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

        {/* Main Dashboard */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* Vehicle Insurance Flow */}
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
        <Stack.Screen name="VehicleComprehensive7" component={VehicleComprehensiveScreen7} />
        <Stack.Screen name="VehicleComprehensive8" component={VehicleComprehensiveScreen8} />

        <Stack.Screen name="CorporateDetailsScreen" component={CorporateDetailsScreen} />

        {/* Medical Insurance Flow */}
        <Stack.Screen name="MedicalInsurance1" component={MedicalInsuranceScreen1} />
        <Stack.Screen name="MedicalIndividualForm" component={MedicalIndividualForm} />
        <Stack.Screen name="MedicalCorporateForm" component={MedicalCorporateForm} />

         {/* WIBA Insurance Flow */}
         <Stack.Screen name="WibaInsurance1" component={WibaInsuranceScreen1} />


         <Stack.Screen name="LastExpenseInsurance1" component={LastExpenseInsuranceScreen1} /> 
         <Stack.Screen name="LastExpenseIndividualForm" component={LastExpenseIndividualForm} />
<Stack.Screen name="LastExpenseCorporateForm" component={LastExpenseCorporateForm} />


<Stack.Screen name="TravelInsurance1" component={TravelInsuranceScreen1} />


<Stack.Screen name="ProfessionalIndemnity1" component={ProfessionalIndemnityScreen1} />

<Stack.Screen name="DomesticPackage1" component={DomesticPackageScreen1} />





       
        {/* Quote Viewer */}
        <Stack.Screen name="ViewQuoteScreen" component={ViewQuoteScreen} />

       

      </Stack.Navigator>
    </NavigationContainer>
  );
}
