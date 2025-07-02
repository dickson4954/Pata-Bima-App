import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';

const VehicleInsuranceScreen9 = () => {
  const [phoneNumber, setPhoneNumber] = React.useState('0722....');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Payment Header */}
      <Text style={styles.header}>Payment</Text>
      
      {/* Policy Summary */}
      <Text style={styles.sectionTitle}>Policy Summary</Text>
      <View style={styles.summaryBox}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Insurance Type:</Text>
          <Text style={styles.summaryValue}>Private Comprehensive</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Insurer:</Text>
          <Text style={styles.summaryValue}>CIC Insurance (example)</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Cover:</Text>
          <Text style={styles.summaryValue}>Plexica 0.347305 – $0.Jun 2036</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Premium:</Text>
          <Text style={styles.summaryValue}>K$3,5000</Text>
        </View>
      </View>

      {/* Payment Option */}
      <Text style={styles.sectionTitle}>Payment Option</Text>
      <View style={styles.paymentOptionBox}>
        <View style={styles.paymentOptionRow}>
          <Text style={styles.paymentOptionLabel}>M-PESA</Text>
          <Image 
            source={require('../assets/mpesa.jpeg')}
            style={styles.mpesaLogo}
          />
        </View>
      </View>

      {/* Payment Summary */}
      <Text style={styles.sectionTitle}>Payment Summary</Text>
      <View style={styles.paymentSummaryBox}>
        <View style={styles.paymentSummaryRow}>
          <Text style={styles.paymentSummaryLabel}>Premium:</Text>
          <Text style={styles.paymentSummaryValue}>K$3,5000</Text>
        </View>
        <View style={styles.paymentSummaryRow}>
          <Text style={styles.paymentSummaryLabel}>Policy Fee:</Text>
          <Text style={styles.paymentSummaryValue}>K$5,900</Text>
        </View>
        <View style={[styles.paymentSummaryRow, styles.totalRow]}>
          <Text style={styles.paymentSummaryLabel}>Total:</Text>
          <Text style={styles.paymentSummaryValue}>K$3,53500</Text>
        </View>
      </View>

      {/* Phone Number Input */}
      <Text style={styles.phoneNumberLabel}>Add Mpesa Phone Number to pay</Text>
      <TextInput
        style={styles.phoneNumberInput}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholder="0722...."
        placeholderTextColor="#999"
      />

      {/* Pay Now Button */}
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>

      {/* Verification Circle with M-Pesa Logo */}
      <View style={styles.verificationContainer}>
        <View style={styles.verificationCircle}>
          <Image 
            source={require('../assets/mpesa.jpeg')}
            style={styles.verificationLogo}
          />
        </View>
        <Text style={styles.verificationText}>Payment secured by M-PESA</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
    marginBottom: 10,
  },
  summaryBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#555',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  paymentOptionBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  paymentOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentOptionLabel: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  mpesaLogo: {
    width: 80,
    height: 30,
    resizeMode: 'contain',
  },
  paymentSummaryBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  paymentSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
    marginTop: 5,
  },
  paymentSummaryLabel: {
    fontSize: 16,
    color: '#555',
  },
  paymentSummaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  phoneNumberLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    marginTop: 10,
  },
  phoneNumberInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  payButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  verificationContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  verificationCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 10,
  },
  verificationLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  verificationText: {
    marginTop: 5,
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default VehicleInsuranceScreen9;