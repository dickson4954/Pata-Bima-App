import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const VehicleInsuranceScreen7 = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Fetching data passed from Screen 5 or 6
  const {
    kraPin = 'A099003030303',
    firstName = 'John',
    lastName = 'Doe',
    registrationNumber = 'Not provided',
    chassisNo = 'NCKSC - 000950',
    make = 'TOYOTA',
    model = 'CDBJKE-DMD',
    provider,
    insuranceProduct,
    coverStartDate,
  } = route.params || {};

  const handleConfirm = () => {
    navigation.navigate('VehicleInsurance8', {
      kraPin,
      firstName,
      lastName,
      registrationNumber,
      chassisNo,
      make,
      model,
      provider,
      insuranceProduct,
      coverStartDate,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>TOR For Private</Text>
      </View>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        <Text style={styles.stepTextActive}>1 KYC Details</Text>
        <View style={styles.stepNumbers}>
          {[2, 3, 4, 5, 6].map((step) => (
            <View key={step} style={styles.stepCircle}>
              <Text style={styles.stepNumber}>{step}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.stepIndicatorLabel}>step indicator:</Text>
      </View>

      {/* Main Card */}
      <View style={styles.card}>
        <View style={styles.cardHeaderBar} />
        <Text style={styles.cardTitle}>Scan Complete</Text>

        {/* Personal Details */}
        <Text style={styles.sectionHeader}>Verify Personal Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>KRA PIN</Text>
          <Text style={styles.value}>{kraPin}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>First Name</Text>
          <Text style={styles.value}>{firstName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Last Name</Text>
          <Text style={styles.value}>{lastName}</Text>
        </View>

        {/* Vehicle Info */}
        <Text style={styles.sectionHeader}>Verify Vehicle Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Car Registration</Text>
          <Text style={styles.value}>{registrationNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Chassis No</Text>
          <Text style={styles.value}>{chassisNo}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Make</Text>
          <Text style={styles.value}>{make}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Model</Text>
          <Text style={styles.value}>{model}</Text>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.goBack()}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm & Proceed</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default VehicleInsuranceScreen7;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flexGrow: 1,
  },
  headerRow: {
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  stepTextActive: {
    fontSize: 14,
    color: '#EB5757',
    fontWeight: 'bold',
  },
  stepNumbers: {
    flexDirection: 'row',
    gap: 6,
  },
  stepCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EB5757',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepIndicatorLabel: {
    fontSize: 10,
    color: '#555',
    position: 'absolute',
    right: 0,
    top: 18,
  },
  card: {
    backgroundColor: '#FFE5E5',
    borderRadius: 20,
    padding: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeaderBar: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#555',
    fontSize: 13,
  },
  value: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
  editButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EB5757',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#EB5757',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#EB5757',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
