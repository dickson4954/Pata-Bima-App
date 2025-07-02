import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
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
  const [coverStartDate, setCoverStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const providers = [
    { price: 'KES. 3,300', label: 'Insurer A', mode: 'Flat' },
    { price: 'KES. 2,800', label: 'Insurer B', mode: 'Annual' },
    { price: 'KES. 4,500', label: 'Insurer C', mode: 'Once' },
  ];

  const handleNext = () => {
    if (selectedProvider && registrationNumber) {
      navigation.navigate('VehicleInsurance4', {
  vehicleType,
  insuranceProduct,
  registrationNumber,
  coverStartDate: coverStartDate.toISOString(), // ✅ Safe to serialize
  provider: selectedProvider,
});

    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header and Steps */}
      <View style={styles.stepIndicator}>
        <Text style={styles.stepLabel}>● Policy details</Text>
        <View style={styles.stepNumbers}>
          {[2, 3, 4, 5, 6].map((num, index) => (
            <View key={index} style={styles.stepCircle}>
              <Text style={styles.stepNumber}>{num}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Financial Interest */}
      <Text style={styles.sectionTitle}>Financial Interest</Text>
      <View style={styles.rowOptions}>
        {['Yes', 'No'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.radioButton, financialInterest === option && styles.selectedRadio]}
            onPress={() => setFinancialInterest(option)}
          >
            <Text style={styles.radioText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Vehicle Identification */}
      <Text style={styles.sectionTitle}>Select Vehicle Identification</Text>
      <View style={styles.rowOptions}>
        {['Vehicle Registration', 'Chassis Number'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.radioButton, identificationMethod === option && styles.selectedRadio]}
            onPress={() => setIdentificationMethod(option)}
          >
            <Text style={styles.radioText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Vehicle Reg Input */}
      <TextInput
        style={styles.input}
        placeholder="KDA 432A"
        value={registrationNumber}
        onChangeText={setRegistrationNumber}
      />

      {/* Date Picker */}
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

      {/* Provider List */}
      <Text style={styles.sectionTitle}>Select a Provider</Text>
      <Text style={styles.hintText}>
        Please note that processing times depend on certificate availability. Select to proceed
      </Text>
      {providers.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, selectedProvider?.label === item.label && styles.cardSelected]}
          onPress={() => setSelectedProvider(item)}
        >
          <Text style={styles.cardPrice}>{item.price}</Text>
          <Text style={styles.cardLabel}>{item.label}</Text>
          <Text style={styles.cardMode}>{item.mode}</Text>
        </TouchableOpacity>
      ))}

      {/* Dropdown Placeholder */}
      <TouchableOpacity style={styles.dropdownBox}>
        <Text style={styles.dropdownText}>{selectedProvider?.label || 'Select a Provider'}</Text>
        <Ionicons name="chevron-down" size={16} color="#000" />
      </TouchableOpacity>

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.nextButton, !(selectedProvider && registrationNumber) && { backgroundColor: '#ccc' }]}
        disabled={!(selectedProvider && registrationNumber)}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default VehicleInsuranceScreen3;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flexGrow: 1,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  stepNumbers: {
    flexDirection: 'row',
    gap: 8,
  },
  stepCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    fontSize: 12,
    color: '#555',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  rowOptions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  radioButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  selectedRadio: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  radioText: {
    color: '#000',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  inputDate: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardSelected: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  cardPrice: {
    fontWeight: 'bold',
  },
  cardLabel: {
    fontSize: 14,
  },
  cardMode: {
    fontSize: 12,
    color: '#555',
  },
  dropdownBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '600',
  },
  hintText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});