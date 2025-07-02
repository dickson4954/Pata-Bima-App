import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const VehicleInsuranceScreen4 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { 
    vehicleType, 
    insuranceProduct,
    registrationNumber,
    provider
  } = route.params;

  const [clientDetails, setClientDetails] = useState('Logbook');
  const [vehicleDetails, setVehicleDetails] = useState('Logbook');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString('en-GB')
  );

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toLocaleDateString('en-GB');
      setStartDate(formatted);
    }
  };

  const handleSubmit = () => {
    navigation.navigate('VehicleInsurance5', {
      vehicleType,
      insuranceProduct,
      registrationNumber,
      provider,
      startDate,
      clientDetails,
      vehicleDetails
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        <Text style={styles.stepLabel}>● Policy details</Text>
        <View style={styles.stepNumbers}>
          {[2, 3, 4, 5, 6].map((num) => (
            <View key={num} style={styles.stepCircle}>
              <Text style={styles.stepNumber}>{num}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Client Details */}
      <Text style={styles.sectionTitle}>Client Details</Text>
      <TouchableOpacity
        style={[
          styles.radioRow,
          clientDetails === 'Logbook' && styles.radioRowSelected,
        ]}
        onPress={() => setClientDetails('Logbook')}
      >
        <View style={styles.radioCircle}>
          {clientDetails === 'Logbook' && <View style={styles.radioDot} />}
        </View>
        <Text style={styles.radioLabel}>Logbook</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.radioRow,
          clientDetails === 'KRA PIN Certificate' && styles.radioRowSelected,
        ]}
        onPress={() => setClientDetails('KRA PIN Certificate')}
      >
        <View style={styles.radioCircle}>
          {clientDetails === 'KRA PIN Certificate' && <View style={styles.radioDot} />}
        </View>
        <Text style={styles.radioLabel}>KRA PIN Certificate</Text>
      </TouchableOpacity>

      {/* Vehicle Details Dropdown */}
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Vehicle Details as Per</Text>
      <View style={styles.dropdownBox}>
        <Text style={styles.dropdownText}>{vehicleDetails}</Text>
        <Ionicons name="chevron-down" size={18} color="#555" />
      </View>

      {/* Existing Cover Card */}
      <View style={styles.existingCard}>
        <Ionicons name="shield-checkmark-outline" size={30} color="#555" style={{ alignSelf: 'center', marginBottom: 10 }} />
        <Text style={styles.existingTitle}>Vehicle Has Existing Cover</Text>
        <Text style={styles.subText}>
          Please adjust the start date of the new policy to begin after the existing cover expires
        </Text>

        <Text style={styles.detailText}>Vehicle Registration</Text>
        <Text style={styles.detailValue}>{registrationNumber}</Text>

        <Text style={styles.detailText}>Active Certificate Number</Text>
        <Text style={styles.detailValue}>CH342833</Text>

        <Text style={styles.detailText}>Issued By</Text>
        <Text style={styles.detailValue}>{provider?.label || 'Insurer'}</Text>

        <Text style={styles.detailText}>Expiry Date</Text>
        <Text style={styles.detailValue}>11/04/2025</Text>

        {/* Adjust Start Date */}
        <Text style={styles.sectionTitle}>Adjust Start Date</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{startDate}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Submit Debit Note</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flexGrow: 1,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepLabel: {
    fontWeight: 'bold',
    fontSize: 14,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioRowSelected: {
    opacity: 1,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  radioLabel: {
    fontSize: 14,
    color: '#000',
  },
  dropdownBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '600',
  },
  existingCard: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  existingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  subText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 12,
    color: '#555',
    marginTop: 10,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  dateInput: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default VehicleInsuranceScreen4;