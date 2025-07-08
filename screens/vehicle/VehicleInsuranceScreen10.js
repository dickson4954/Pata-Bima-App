import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const VehicleInsuranceScreen10 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [phoneNumber, setPhoneNumber] = useState('');

  const {
    insuranceType = 'Private Comprehensive',
    insurer = 'CIC Insurance (example)',
    coverPeriod = '01 Jul 2025 - 30 Jun 2026',
    premium = 'KES 25,000',
  } = route.params || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header and Step Indicator */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>TOR For Private</Text>
        <View style={styles.stepRow}>
          <Text style={styles.stepLabel}>1 Payment</Text>
          <View style={styles.steps}>
            {[2, 3, 4, 5, 6].map((step, index) => (
              <View
                key={index}
                style={[styles.stepCircle, step === 6 && styles.activeStepCircle]}
              >
                <Text
                  style={[styles.stepNumber, step === 6 && styles.activeStepText]}
                >
                  {step}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.stepNote}>Step Indicator:</Text>
      </View>

      {/* Payment Section */}
      <Text style={styles.sectionTitle}>Payment</Text>

      {/* Policy Summary Card */}
      <Text style={styles.subTitle}>Policy Summary</Text>
      <View style={styles.cardBox}>
        <Text style={styles.policyLine}><Text style={styles.bold}>Insurance Type:</Text> {insuranceType}</Text>
        <Text style={styles.policyLine}><Text style={styles.bold}>Insurer:</Text> {insurer}</Text>
        <Text style={styles.policyLine}><Text style={styles.bold}>Cover Period:</Text> {coverPeriod}</Text>
        <Text style={styles.policyLine}><Text style={styles.bold}>Premium:</Text> {premium}</Text>
      </View>

      {/* Payment Method Card */}
      <Text style={styles.subTitle}>Payment Method</Text>
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

      {/* Payment Summary Card */}
      <Text style={styles.subTitle}>Payment Summary</Text>
      <View style={styles.transactionCard}>
        <Image
          source={require('../../assets/alert bell icon.png')} // You can update this with your bell icon
          style={styles.bellIcon}
        />
        <Text style={styles.transactionTitle}>Transaction Pending</Text>
        <Text style={styles.transactionText}>
          An STK push has been sent to your phone for authorization. Enter your pin to complete this transaction
        </Text>
      </View>

      {/* NEXT Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('VehicleInsurance11')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default VehicleInsuranceScreen10;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepLabel: {
    color: '#D92027',
    fontWeight: 'bold',
    fontSize: 13,
  },
  steps: {
    flexDirection: 'row',
    gap: 8,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStepCircle: {
    backgroundColor: '#D92027',
  },
  stepNumber: {
    fontSize: 12,
    color: '#888',
  },
  activeStepText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stepNote: {
    fontSize: 10,
    color: '#888',
    marginTop: 4,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  cardBox: {
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 20,
  },
  policyLine: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  bold: {
    fontWeight: 'bold',
  },
  paymentMethodBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
  },
  mpesaLogo: {
    width: 90,
    height: 35,
    resizeMode: 'contain',
    marginRight: 12,
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
    borderColor: '#D92027',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D92027',
  },
  transactionCard: {
    backgroundColor: '#FFE5E5',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  bellIcon: {
    width: 50,
    height: 50,
    marginBottom: 15,
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D92027',
    marginBottom: 10,
  },
  transactionText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#D92027',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
