import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const VehicleInsuranceScreen9 = () => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const navigation = useNavigation();
  const route = useRoute();

  // ✅ Extract everything passed from Screen 8
  const {
    insuranceType = 'Private Comprehensive',
    insurer = 'CIC Insurance',
    coverPeriod = '01 Jul 2025 - 30 Jun 2026',
    premium = 'KES 25,000',
    policyFee = 'KES 500',
    total = 'KES 25,500',
    verifiedData = {},
    registrationNumber = '',
    provider = '',
    insuranceProduct = '',
    coverStartDate = '',
  } = route.params || {};

  const {
    kraPin = '',
    firstName = '',
    lastName = '',
    registration = registrationNumber,
    chassisNo = '',
    make = '',
    model = '',
  } = verifiedData;

  const handlePayment = () => {
    if (!phoneNumber.startsWith('07') || phoneNumber.length !== 10) {
      Alert.alert('Invalid Number', 'Enter a valid Safaricom number starting with 07...');
      return;
    }

    Alert.alert('STK Push Sent', 'Please check your phone and enter your M-PESA PIN.');

    // ✅ Pass everything to Screen 10
    navigation.navigate('VehicleInsurance10', {
      insuranceType,
      insurer,
      coverPeriod,
      premium,
      policyFee,
      total,
      phoneNumber,
      verifiedData,
      provider,
      insuranceProduct,
      coverStartDate,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header & Step Indicator */}
      <View style={styles.stepHeader}>
        <Text style={styles.torTitle}>{insuranceProduct || 'TOR For Private'}</Text>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepLabel}>1 Payment</Text>
          <View style={styles.stepNumbers}>
            {[2, 3, 4, 5, 6].map((num, index) => (
              <View
                key={index}
                style={[styles.stepCircle, index === 5 ? styles.activeStep : null]}
              >
                <Text
                  style={[styles.stepNumber, index === 5 ? styles.activeStepText : null]}
                >
                  {num}
                </Text>
              </View>
            ))}
          </View>
          <Text style={styles.stepText}>Step Indicator:</Text>
        </View>
      </View>

      {/* Page Title */}
      <Text style={styles.pageTitle}>Payment</Text>

      {/* Policy Summary */}
      <Text style={styles.sectionTitle}>Policy Summary</Text>
      <View style={styles.box}>
        <Text style={styles.policyText}>
          <Text style={styles.boldText}>Insurance Type:</Text> {insuranceType}{'\n'}
          <Text style={styles.boldText}>Insurer:</Text> {insurer}{'\n'}
          <Text style={styles.boldText}>Cover Period:</Text> {coverPeriod}{'\n'}
          <Text style={styles.boldText}>Premium:</Text> {premium}
        </Text>
      </View>

      {/* Personal & Vehicle Details */}
      <Text style={styles.sectionTitle}>Verified Details</Text>
      <View style={styles.box}>
        <Text style={styles.policyText}>
          <Text style={styles.boldText}>KRA PIN:</Text> {kraPin}{'\n'}
          <Text style={styles.boldText}>First Name:</Text> {firstName}{'\n'}
          <Text style={styles.boldText}>Last Name:</Text> {lastName}{'\n'}
          <Text style={styles.boldText}>Reg. Number:</Text> {registration}{'\n'}
          <Text style={styles.boldText}>Chassis No:</Text> {chassisNo}{'\n'}
          <Text style={styles.boldText}>Make:</Text> {make}{'\n'}
          <Text style={styles.boldText}>Model:</Text> {model}
        </Text>
      </View>

      {/* Payment Method */}
      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View style={styles.paymentMethodBox}>
        <Image
          source={require('../../assets/mpesa.jpeg')}
          style={styles.mpesaLogo}
        />
        <Text style={styles.paymentLabel}>Mpesa</Text>
        <View style={styles.radioOuter}>
          <View style={styles.radioInner} />
        </View>
      </View>

      {/* Payment Summary */}
      <Text style={styles.sectionTitle}>Payment Summary</Text>
      <View style={styles.box}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Premium:</Text>
          <Text style={styles.summaryValue}>{premium}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Policy Fee:</Text>
          <Text style={styles.summaryValue}>{policyFee}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, styles.totalLabel]}>Total:</Text>
          <Text style={[styles.summaryValue, styles.totalLabel]}>{total}</Text>
        </View>
      </View>

      {/* M-PESA Phone Number */}
      <Text style={styles.inputLabel}>Add Mpesa Phone Number to pay</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="0722..."
        placeholderTextColor="#888"
        keyboardType="phone-pad"
      />

      {/* Payment Button */}
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Make Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default VehicleInsuranceScreen9;


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 25,
    paddingBottom: 60,
  },
  stepHeader: {
    marginBottom: 20,
  },
  torTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
  },
  stepLabel: {
    fontSize: 13,
    color: '#D50000',
  },
  stepText: {
    fontSize: 10,
    color: '#888',
  },
  stepNumbers: {
    flexDirection: 'row',
    gap: 8,
  },
  stepCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: '#D50000',
  },
  stepNumber: {
    fontSize: 12,
    color: '#777',
  },
  activeStepText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#222',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: '#222',
  },
  box: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
  },
  policyText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  paymentMethodBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
  },
  mpesaLogo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    marginRight: 15,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D50000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D50000',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  totalLabel: {
    fontWeight: 'bold',
    color: '#D50000',
  },
  inputLabel: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 30,
  },
  payButton: {
    backgroundColor: '#D50000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
