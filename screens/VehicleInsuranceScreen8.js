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
import { useNavigation } from '@react-navigation/native';

const VehicleInsuranceScreen8 = () => {
  const navigation = useNavigation();

  // State for vehicle data
  const [vehicleData, setVehicleData] = useState({
    kraPin: 'AO890030300033',
    firstName: 'John',
    lastName: 'Doe',
    registration: 'KPM 023A',
    chassisNo: 'MCX5K-0009694',
    make: 'TOPOFA',
    model: 'CBDJAK-DAD',
  });

  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerification = () => {
    // Compare with a specific expected registration number (e.g., from scanned data)
    const expectedRegistration = 'KDN 4231A'; // Adjust this based on your logic
    if (vehicleData.registration !== expectedRegistration) {
      setErrorMessage(`Error: The provided reg.no (${vehicleData.registration}) does not match`);
      setIsVerified(false);
      Alert.alert('Verification Failed', `Registration number does not match ${expectedRegistration}`);
    } else {
      setErrorMessage('');
      setIsVerified(true);
      Alert.alert('Verified', 'Details match scanned document');
    }
  };

  const handleConfirm = () => {
    if (isVerified) {
      navigation.navigate('VehicleInsurance9', { verifiedData: vehicleData });
    } else {
      Alert.alert('Not Verified', 'Please verify details first');
    }
  };

  // Handle text input changes
  const handleInputChange = (field, value) => {
    setVehicleData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.mainTitle}>KYC Details</Text>

        <Text style={styles.sectionTitle}>KRA PIN</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            value={vehicleData.kraPin}
            onChangeText={(value) => handleInputChange('kraPin', value)}
            editable={true}
          />
        </View>

        <Text style={styles.subSectionTitle}>First Name</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            value={vehicleData.firstName}
            onChangeText={(value) => handleInputChange('firstName', value)}
            editable={true}
          />
        </View>

        <Text style={styles.subSectionTitle}>Last Name</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            value={vehicleData.lastName}
            onChangeText={(value) => handleInputChange('lastName', value)}
            editable={true}
          />
        </View>

        <Text style={styles.sectionTitle}>Verify Vehicle Details</Text>
        <Text style={styles.instructionText}>
          Please verify the info from the scanned document.
        </Text>
        <Text style={styles.instructionText}>
          (Can you see this picture together with/about contact.)
        </Text>

        <Text style={styles.subSectionTitle}>Car Registration Number</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            value={vehicleData.registration}
            onChangeText={(value) => handleInputChange('registration', value)}
            editable={true}
          />
        </View>

        <Text style={styles.subSectionTitle}>Chasis No</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            value={vehicleData.chassisNo}
            onChangeText={(value) => handleInputChange('chassisNo', value)}
            editable={true}
          />
        </View>

        <Text style={styles.subSectionTitle}>Make</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            value={vehicleData.make}
            onChangeText={(value) => handleInputChange('make', value)}
            editable={true}
          />
        </View>

        <Text style={styles.subSectionTitle}>Model</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            value={vehicleData.model}
            onChangeText={(value) => handleInputChange('model', value)}
            editable={true}
          />
        </View>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </ScrollView>

      {/* Fixed Buttons Container */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerification}
          activeOpacity={0.7}
        >
          <Text style={styles.verifyButtonText}>
            {isVerified ? '✓ Verified' : 'Verify Details'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            !isVerified && styles.disabledButton,
          ]}
          onPress={handleConfirm}
          disabled={!isVerified}
          activeOpacity={0.7}
        >
          <Text style={styles.confirmButtonText}>Confirm & Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 150, // Space for buttons
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
    marginBottom: 5,
  },
  subSectionTitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 12,
    marginBottom: 5,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  inputText: {
    fontSize: 16,
    color: '#000',
  },
  instructionText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  verifyButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  verifyButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default VehicleInsuranceScreen8;