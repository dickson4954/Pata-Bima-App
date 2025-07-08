import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const CorporateDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { insuranceProduct = 'New Motor Vehicle Insurance' } = route.params || {};

  const [clientDetailsAsPer, setClientDetailsAsPer] = useState('Logbook');
  const [vehicleDetailsAsPer, setVehicleDetailsAsPer] = useState('');
  const [kraPin, setKraPin] = useState('');

  const vehicleDetailsOptions =
    clientDetailsAsPer === 'Logbook'
      ? [{ label: 'Logbook', value: 'Logbook' }]
      : [
          { label: 'Logbook', value: 'Logbook' },
          { label: 'NTSA Documents', value: 'NTSA Documents' },
          { label: 'Import Document', value: 'Import Document' },
        ];

  const showKraInput =
    clientDetailsAsPer === 'KRA PIN Certificate' &&
    (vehicleDetailsAsPer === 'NTSA Documents' || vehicleDetailsAsPer === 'Import Document');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{insuranceProduct}</Text>
      </View>

      {/* Step Indicator */}
      <View style={styles.stepContainer}>
        {[1, 2, 3, 4, 5].map((num) => (
          <View key={num} style={[styles.circle, num === 2 && styles.activeCircle]}>
            <Text style={[styles.circleText, num === 2 && { color: '#fff' }]}>{num}</Text>
          </View>
        ))}
      </View>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>Basic Client Details</Text>

      {/* Radio Buttons Vertical */}
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.label}>Client Details as Per</Text>
        {['Logbook', 'KRA PIN Certificate'].map((option, index) => (
          <TouchableOpacity
            key={option}
            style={[styles.radioOption, index === 1 && { marginTop: 10 }]}
            onPress={() => {
              setClientDetailsAsPer(option);
              setVehicleDetailsAsPer('');
              setKraPin('');
            }}
          >
            <View style={styles.radioCircle}>
              {clientDetailsAsPer === option && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioLabel}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Dropdown */}
      <Text style={styles.label}>Vehicle Details as Per</Text>
      <View style={styles.dropdownWrapper}>
        <RNPickerSelect
          value={vehicleDetailsAsPer}
          onValueChange={(value) => setVehicleDetailsAsPer(value)}
          placeholder={{ label: 'Select an Item', value: null }}
          items={vehicleDetailsOptions}
          style={pickerStyles}
          useNativeAndroidPickerStyle={false}
          Icon={() => <Ionicons name="chevron-down" size={20} color="#fff" />}
        />
      </View>

      {/* KRA PIN Field */}
      {showKraInput && (
        <>
          <Text style={styles.label}>Client's KRA PIN</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter KRA PIN"
              value={kraPin}
              onChangeText={setKraPin}
              style={styles.inputText}
            />
          </View>
        </>
      )}

      {/* Info Card - always visible */}
      <View style={styles.infoCard}>
        <Image
          source={require('../../assets/star.png')} // Update this path based on your assets folder
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>
          Select the <Text style={{ fontWeight: 'bold' }}>"Logbook"</Text> option to enjoy a quicker, automated application experience!
        </Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity
  style={styles.nextBtn}
  onPress={() => navigation.navigate('VehicleInsurance5')}
>
  <Text style={styles.nextBtnText}>Next</Text>
</TouchableOpacity>

    </ScrollView>
  );
};

export default CorporateDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    backgroundColor: '#E30613',
  },
  circleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E30613',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E30613',
  },
  radioLabel: {
    fontSize: 14,
    color: '#333',
  },
  dropdownWrapper: {
    backgroundColor: '#E30613',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    marginBottom: 20,
  },
  inputWrapper: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    marginBottom: 20,
  },
  inputText: {
    fontSize: 14,
    paddingVertical: 12,
    color: '#333',
  },
  infoCard: {
    backgroundColor: '#FCE8E9',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    gap: 10,
  },
  infoIcon: {
    width: 14,
    height: 14,
    marginTop: 1,
  },
  infoText: {
    fontSize: 13,
    color: '#E30613',
    flex: 1,
  },
  nextBtn: {
    backgroundColor: '#E30613',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  nextBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const pickerStyles = {
  inputIOS: {
    fontSize: 14,
    color: '#fff',
    paddingVertical: 12,
  },
  inputAndroid: {
    fontSize: 14,
    color: '#fff',
    paddingVertical: 8,
  },
  placeholder: {
    color: '#fff',
  },
};
