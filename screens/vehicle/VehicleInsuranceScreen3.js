import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';

const VehicleInsuranceScreen3 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { vehicleType, insuranceProduct } = route.params;

  const [financialInterest, setFinancialInterest] = useState('Yes');
  const [identificationMethod, setIdentificationMethod] = useState('Vehicle Registration');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [chassisNumber, setChassisNumber] = useState('');
  const [engineNumber, setEngineNumber] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [chassisError, setChassisError] = useState('');
  const [engineError, setEngineError] = useState('');
  const [coverStartDate, setCoverStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showExistingCoverCard, setShowExistingCoverCard] = useState(false);
  const [tonnage, setTonnage] = useState('');
  const [passengers, setPassengers] = useState('');

  const requiresTonnage = vehicleType === 'Commercial' || vehicleType === 'Special Classes';
  const requiresPassengers = vehicleType === 'PSV';

  useEffect(() => {
    // Clear related state when vehicleType changes
    console.log('vehicleType:', vehicleType, 'identificationMethod:', identificationMethod);
    setTonnage('');
    setPassengers('');
    setRegistrationNumber('');
    setChassisNumber('');
    setEngineNumber('');
    setSelectedProvider(null);
    setIdentificationMethod('Vehicle Registration'); // Reset to default to avoid state mismatch
  }, [vehicleType]);

  const providers = [
    { price: 'KES. 3,300', label: 'Insurer A', mode: 'Net' },
    { price: 'KES. 4,500', label: 'Insurer A', mode: 'Gross' },
  ];

  const handleNext = () => {
    // Reset error messages
    setRegistrationError('');
    setChassisError('');
    setEngineError('');

    let valid = true;

    if (identificationMethod === 'Vehicle Registration') {
      if (!registrationNumber.trim()) {
        setRegistrationError('Vehicle registration number is required.');
        valid = false;
      }
    } else if (identificationMethod === 'Chassis Number') {
      if (!chassisNumber.trim()) {
        setChassisError('Chassis number is required.');
        valid = false;
      }
      if (!engineNumber.trim()) {
        setEngineError('Engine number is required.');
        valid = false;
      }
    }

    if (valid) {
      setShowExistingCoverCard(true);
    }
  };

  const handleSubmitDebitNote = () => {
    setShowExistingCoverCard(false);
    navigation.navigate('VehicleInsurance5', {
      vehicleType,
      insuranceProduct,
      registrationNumber: identificationMethod === 'Vehicle Registration' ? registrationNumber : '',
      chassisNumber: identificationMethod === 'Chassis Number' ? chassisNumber : '',
      engineNumber: identificationMethod === 'Chassis Number' ? engineNumber : '',
      coverStartDate: coverStartDate.toISOString(),
      provider: selectedProvider,
      ...(requiresTonnage && { tonnage }),
      ...(requiresPassengers && { passengers }),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{insuranceProduct}</Text>
      </View>

      <View style={styles.policyDetailsHeader}>
        <Text style={styles.sectionTitle}>Policy Details</Text>
        <View style={styles.stepIndicatorRow}>
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <View key={step} style={step === 3 ? styles.stepCircleActive : styles.stepCircle}>
              <Text style={step === 3 ? styles.stepTextActive : styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.subLabel}>Financial interest</Text>
      <View style={styles.rowOptions}>
        {['Yes', 'No'].map((option) => (
          <TouchableOpacity key={option} style={styles.radioItem} onPress={() => setFinancialInterest(option)}>
            <View style={styles.radioCircle}>
              {financialInterest === option && <View style={styles.radioInnerCircle} />}
            </View>
            <Text style={styles.radioText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subLabel}>Select Vehicle identification</Text>
      <View style={styles.rowOptions}>
        {['Vehicle Registration', 'Chassis Number'].map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioItem}
            onPress={() => setIdentificationMethod(option)}
            activeOpacity={0.7}
          >
            <View style={styles.radioCircle}>
              {identificationMethod === option && <View style={styles.radioInnerCircle} />}
            </View>
            <Text style={styles.radioText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {identificationMethod === 'Vehicle Registration' && (
        <>
          <Text style={styles.subLabel}>Vehicle registration Number</Text>
          <TextInput
            style={styles.input}
            placeholder="KDN 423A"
            value={registrationNumber}
            onChangeText={setRegistrationNumber}
            autoComplete="off"
            autoCorrect={false}
            importantForAutofill="no"
          />
          {registrationError ? <Text style={styles.errorText}>{registrationError}</Text> : null}
        </>
      )}

      {identificationMethod === 'Chassis Number' && (
        <>
          <Text style={styles.subLabel}>Chassis Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter chassis number"
            value={chassisNumber}
            onChangeText={setChassisNumber}
            autoComplete="off"
            autoCorrect={false}
            importantForAutofill="no"
          />
          {chassisError ? <Text style={styles.errorText}>{chassisError}</Text> : null}

          <Text style={styles.subLabel}>Engine Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter engine number"
            value={engineNumber}
            onChangeText={setEngineNumber}
            autoComplete="off"
            autoCorrect={false}
            importantForAutofill="no"
          />
          {engineError ? <Text style={styles.errorText}>{engineError}</Text> : null}
        </>
      )}

      {/* Tonnage field */}
      {requiresTonnage && (
        <>
          <Text style={styles.subLabel}>Vehicle Tonnage (1 - 31)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter tonnage"
            keyboardType="numeric"
            value={tonnage}
            onChangeText={setTonnage}
            maxLength={2}
            autoComplete="off"
            autoCorrect={false}
            importantForAutofill="no"
            blurOnSubmit={false}
          />
        </>
      )}

      {/* Passengers field */}
      {requiresPassengers && (
        <>
          <Text style={styles.subLabel}>Number of Passengers</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number of passengers"
            keyboardType="numeric"
            value={passengers}
            onChangeText={setPassengers}
            autoComplete="off"
            autoCorrect={false}
            importantForAutofill="no"
            blurOnSubmit={false}
          />
        </>
      )}

      <Text style={styles.subLabel}>Cover start date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputDate}>
        <Text>{coverStartDate.toDateString()}</Text>
        <Ionicons name="calendar-outline" size={20} color="#000" />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={coverStartDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === 'ios');
            if (selectedDate) setCoverStartDate(selectedDate);
          }}
        />
      )}

      {registrationNumber.trim() !== '' && (
        <>
          <Text style={styles.subLabel}>Select a Provider</Text>
          <Text style={styles.helperText}>
            Please note that processing times depend on certificate availability.
          </Text>

          {providers.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.providerCard,
                selectedProvider?.label === item.label && selectedProvider?.mode === item.mode && styles.providerSelected,
              ]}
              onPress={() => setSelectedProvider(item)}
            >
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.providerName}>{item.label}</Text>
              <Text style={styles.mode}>{item.mode}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      <TouchableOpacity
        style={[styles.nextButton, !(selectedProvider && (registrationNumber || (identificationMethod === 'Chassis Number' && chassisNumber && engineNumber))) && { backgroundColor: '#ccc' }]}
        disabled={!(selectedProvider && (registrationNumber || (identificationMethod === 'Chassis Number' && chassisNumber && engineNumber)))}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={showExistingCoverCard} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity onPress={() => setShowExistingCoverCard(false)} style={styles.closeIcon}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Ionicons
              name="checkmark-circle-outline"
              size={36}
              color="#EB5757"
              style={{ alignSelf: 'center', marginBottom: 10 }}
            />
            <Text style={styles.cardTitle}>Vehicle Has Existing Cover</Text>
            <Text style={styles.cardNote}>
              Please adjust the start date of the new policy to begin after the existing cover expires
            </Text>
            <Text style={styles.detailLabel}>Vehicle Registration Number</Text>
            <Text style={styles.detailValue}>{registrationNumber}</Text>
            <Text style={styles.detailLabel}>Active Certificate Number</Text>
            <Text style={styles.detailValue}>CH342833</Text>
            <Text style={styles.detailLabel}>Issued By</Text>
            <Text style={styles.detailValue}>{selectedProvider?.label}</Text>
            <Text style={styles.detailLabel}>Expiry Date</Text>
            <Text style={styles.detailValue}>31/01/2026</Text>

            <TouchableOpacity style={styles.adjustButton} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.adjustButtonText}>Adjust Start Date</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitDebitNote}>
              <Text style={styles.submitButtonText}>Submit Debit Note</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default VehicleInsuranceScreen3;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
    flex: 1,
  },
  policyDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepIndicatorRow: {
    flexDirection: 'row',
    gap: 6,
  },
  stepCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EB5757',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 12,
    color: '#555',
  },
  stepTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  subLabel: {
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 14,
  },
  rowOptions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#EB5757',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EB5757',
  },
  radioText: {
    fontSize: 14,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  inputDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 16,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  providerCard: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  providerSelected: {
    borderWidth: 2,
    borderColor: '#EB5757',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  providerName: {
    fontSize: 14,
    color: '#000',
  },
  mode: {
    fontSize: 12,
    color: '#666',
  },
  nextButton: {
    backgroundColor: '#EB5757',
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  adjustButton: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EB5757',
    alignItems: 'center',
    marginTop: 20,
  },
  adjustButtonText: {
    color: '#EB5757',
    fontWeight: 'bold',
    fontSize: 15,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFE5E5',
    padding: 20,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
  },
  
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardNote: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 12,
    color: '#555',
    marginTop: 10,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#EB5757',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 12,
  },
});
