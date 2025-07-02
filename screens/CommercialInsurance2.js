import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CommercialInsurance2 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [financialInterest, setFinancialInterest] = useState('Yes');
  const [vehicleIdMethod, setVehicleIdMethod] = useState('Vehicle Registration');
  const [registrationNumber, setRegistrationNumber] = useState('KEN AESIA');
  const [chassisNumber, setChassisNumber] = useState('');
  const [date, setDate] = useState(new Date('2020-12-22'));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tonnage, setTonnage] = useState('31');
  const [selectedProvider, setSelectedProvider] = useState(null);

  const providers = [
    { 
      net: 'KES A.300', 
      gross: 'KES A.350',
      name: 'Forum A',
      insured: 'Insured'
    },
    { 
      net: 'KES A.500', 
      gross: 'KES A.550',
      name: 'Orrors',
      insured: 'Insured'
    }
  ];

  const handleNext = () => {
    navigation.navigate('CommercialInsurance3', {
      insuranceProduct: route.params.insuranceProduct,
      financialInterest,
      vehicleIdMethod,
      registrationNumber,
      chassisNumber,
      coverStartDate: date.toLocaleDateString(),
      tonnage,
      selectedProvider
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.mainHeader}>Policy details</Text>
      <Text style={styles.subHeader}>Policy Details</Text>

      {/* Financial Interest */}
      <View style={styles.section}>
        <Text style={styles.label}>Financial interest</Text>
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.radioOption} 
            onPress={() => setFinancialInterest('Yes')}
          >
            <View style={styles.radioCircle}>
              {financialInterest === 'Yes' && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioLabel}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.radioOption} 
            onPress={() => setFinancialInterest('No')}
          >
            <View style={styles.radioCircle}>
              {financialInterest === 'No' && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioLabel}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Vehicle Identification */}
      <View style={styles.section}>
        <Text style={styles.label}>Select Vehicle Identification</Text>
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.radioOption}
            onPress={() => setVehicleIdMethod('Vehicle Registration')}
          >
            <View style={styles.radioCircle}>
              {vehicleIdMethod === 'Vehicle Registration' && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioLabel}>Vehicle Registration</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.radioOption}
            onPress={() => setVehicleIdMethod('Chassis Number')}
          >
            <View style={styles.radioCircle}>
              {vehicleIdMethod === 'Chassis Number' && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioLabel}>Chassis Number</Text>
          </TouchableOpacity>
        </View>

        {vehicleIdMethod === 'Vehicle Registration' ? (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Vehicle Registration Number</Text>
            <TextInput
              style={styles.input}
              value={registrationNumber}
              onChangeText={setRegistrationNumber}
            />
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Chassis Number</Text>
            <TextInput
              style={styles.input}
              value={chassisNumber}
              onChangeText={setChassisNumber}
              placeholder="Enter chassis number"
            />
          </View>
        )}
      </View>

      {/* Cover Start Date */}
      <View style={styles.section}>
        <Text style={styles.label}>Cover start Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            value={date.toLocaleDateString()}
            editable={false}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}
      </View>

      {/* Tonnage */}
      <View style={styles.section}>
        <Text style={styles.label}>Tonnage (up to 31)</Text>
        <TextInput
          style={styles.input}
          value={tonnage}
          onChangeText={setTonnage}
          keyboardType="numeric"
        />
      </View>

      {/* Providers */}
      <View style={styles.section}>
        <Text style={styles.label}>Select a Provider</Text>
        {providers.map((provider, index) => (
          <View key={index} style={[
            styles.providerContainer,
            selectedProvider?.name === provider.name && styles.providerSelected
          ]}>
            <TouchableOpacity
              style={styles.providerContent}
              onPress={() => setSelectedProvider(provider)}
            >
              <View style={styles.providerPriceContainer}>
                <Text style={styles.netLabel}>Net:</Text>
                <Text style={styles.providerPrice}>{provider.net}</Text>
                <Text style={styles.grossLabel}>Gross:</Text>
                <Text style={styles.providerPrice}>{provider.gross}</Text>
              </View>
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.insuredText}>{provider.insured}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Only Next Button at the bottom */}
      <TouchableOpacity
        style={[styles.nextButton, !selectedProvider && styles.disabledButton]}
        onPress={handleNext}
        disabled={!selectedProvider}
      >
        <Text style={styles.nextButtonText}>Next</Text>
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
  mainHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  providerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  providerSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  providerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  providerPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  netLabel: {
    fontSize: 14,
    color: '#555',
    marginRight: 5,
  },
  grossLabel: {
    fontSize: 14,
    color: '#555',
    marginLeft: 15,
    marginRight: 5,
  },
  providerPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  providerInfo: {
    alignItems: 'flex-end',
  },
  providerName: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  insuredText: {
    fontSize: 14,
    color: '#007AFF',
    fontStyle: 'italic',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CommercialInsurance2;