import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const VehicleInsuranceScreen8 = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // ✅ Get everything from Screen 7
  const {
    kraPin = '',
    firstName = '',
    lastName = '',
    registrationNumber = '',
    chassisNo = '',
    make = '',
    model = '',
    provider = '',
    insuranceProduct = '',
    coverStartDate = '',
  } = route.params || {};

  const [vehicleData, setVehicleData] = useState({
    kraPin,
    firstName,
    lastName,
    registration: registrationNumber, // initial editable field
    chassisNo,
    make,
    model,
  });

  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerification = () => {
    const trimmedInput = vehicleData.registration.trim().toUpperCase();
    const trimmedScanned = registrationNumber.trim().toUpperCase();

    if (trimmedInput !== trimmedScanned) {
      const msg = `Error: The provided reg.no (${vehicleData.registration}) does not match scanned (${registrationNumber})`;
      setErrorMessage(msg);
      setIsVerified(false);
      Alert.alert('Verification Failed', msg);
    } else {
      setErrorMessage('');
      setIsVerified(true);
      Alert.alert('Verified', 'Details match scanned registration number');
    }
  };

  const handleConfirm = () => {
    if (!isVerified) {
      Alert.alert('Not Verified', 'Please verify details first');
      return;
    }

    // ✅ Pass everything to screen 9
    navigation.navigate('VehicleInsurance9', {
      insuranceProduct,
      provider,
      coverStartDate, 
      registrationNumber,
      verifiedData: vehicleData,
    });
  };

  const handleInputChange = (field, value) => {
    setVehicleData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{insuranceProduct || 'TOR For Private'}</Text>
        <View style={styles.stepRow}>
          <Text style={styles.stepLabel}>1 KYC Details</Text>
          <View style={styles.steps}>
            {[2, 3, 4, 5, 6].map((step, index) => (
              <View
                key={index}
                style={[styles.stepCircle, step === 6 && styles.activeStepCircle]}
              >
                <Text style={[styles.stepNumber, step === 6 && styles.activeStepText]}>
                  {step}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.stepNote}>step indicator:</Text>
      </View>

      {/* Form */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>KYC Details</Text>

        {/* Personal Fields */}
        {['kraPin', 'firstName', 'lastName'].map((field, i) => (
          <View key={field}>
            <Text style={styles.label}>
              {field === 'kraPin' ? 'KRA PIN' : field === 'firstName' ? 'First Name' : 'Last Name'}
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={vehicleData[field]}
                onChangeText={(value) => handleInputChange(field, value)}
              />
            </View>
          </View>
        ))}

        {/* Verification Section */}
        <Text style={styles.sectionTitle}>Verify Vehicle Details</Text>
        <Text style={styles.instruction}>
          Please verify that the info matches scanned document
        </Text>
        <Text style={styles.instructionNote}>
          Must match registration number: <Text style={{ fontWeight: 'bold' }}>{registrationNumber}</Text>
        </Text>

        {/* Vehicle Fields */}
        {['registration', 'chassisNo', 'make', 'model'].map((field) => (
          <View key={field}>
            <Text style={styles.label}>
              {{
                registration: 'Car Registration Number',
                chassisNo: 'Chassis No',
                make: 'Make',
                model: 'Model',
              }[field]}
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={vehicleData[field]}
                onChangeText={(value) => handleInputChange(field, value)}
              />
            </View>
          </View>
        ))}

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerification}>
          <Text style={styles.verifyText}>
            {isVerified ? '✓ Verified' : 'Verify Details'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm & Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VehicleInsuranceScreen8;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D92027',
  },
  steps: {
    flexDirection: 'row',
    gap: 10,
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
    color: '#888',
    fontSize: 12,
  },
  activeStepText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stepNote: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    textAlign: 'right',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 140,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: '#111',
    marginBottom: 5,
    marginTop: 10,
  },
  inputWrapper: {
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  input: {
    fontSize: 15,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginTop: 20,
    marginBottom: 5,
  },
  instruction: {
    fontSize: 13,
    color: '#444',
    marginBottom: 3,
  },
  instructionNote: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontSize: 13,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  verifyButton: {
    backgroundColor: '#FFE5E5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D92027',
  },
  verifyText: {
    color: '#D92027',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#EB5757',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
