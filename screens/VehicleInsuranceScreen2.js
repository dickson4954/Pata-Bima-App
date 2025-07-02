// screens/VehicleInsuranceScreen2.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const VehicleInsuranceScreen2 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { vehicleType } = route.params;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [thirdPartyOpen, setThirdPartyOpen] = useState(true);
  const [comprehensiveOpen, setComprehensiveOpen] = useState(false);

  const thirdPartyOptions = [
    'TPO For Private',
    'Private Third-party',
    'Private Third-party Extensible',
    'Private Motorcycle Third-party',
  ];

  const comprehensiveOptions = ['Private Comprehensive'];

  const handleNext = () => {
    if (selectedProduct) {
      navigation.navigate('VehicleInsurance3', {
        vehicleType,
        insuranceProduct: selectedProduct,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        <Text style={styles.stepLabel}>Insurance Type</Text>
        <View style={styles.stepNumbers}>
          {[2, 3, 4, 5, 6].map((num) => (
            <View key={num} style={styles.stepCircle}>
              <Text style={styles.stepNumber}>{num}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Vehicle Type Dropdown */}
      <Text style={styles.dropdownLabel}>Dropdown: Select Vehicle type</Text>
      <View style={styles.dropdownBox}>
        <Text style={styles.dropdownValue}>{vehicleType}</Text>
        <TouchableOpacity>
          <Text style={styles.changeBtn}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Insurance Product Dropdown */}
      <Text style={styles.dropdownLabel}>DropDown: Select Insurance product</Text>

      {/* Third Party Section */}
      <TouchableOpacity
        onPress={() => setThirdPartyOpen(!thirdPartyOpen)}
        style={styles.sectionHeader}
      >
        <Text style={styles.sectionTitle}>Third Party({thirdPartyOptions.length})</Text>
        <Ionicons
          name={thirdPartyOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
        />
      </TouchableOpacity>

      {thirdPartyOpen &&
        thirdPartyOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionRow}
            onPress={() => setSelectedProduct(option)}
          >
            <View style={styles.radioCircle}>
              {selectedProduct === option && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

      {/* Comprehensive Section */}
      <TouchableOpacity
        onPress={() => setComprehensiveOpen(!comprehensiveOpen)}
        style={styles.sectionHeader}
      >
        <Text style={styles.sectionTitle}>Comprehensive({comprehensiveOptions.length})</Text>
        <Ionicons
          name={comprehensiveOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
        />
      </TouchableOpacity>

      {comprehensiveOpen &&
        comprehensiveOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionRow}
            onPress={() => setSelectedProduct(option)}
          >
            <View style={styles.radioCircle}>
              {selectedProduct === option && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          !selectedProduct && { backgroundColor: '#ccc' },
        ]}
        disabled={!selectedProduct}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default VehicleInsuranceScreen2;

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  dropdownLabel: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '600',
    color: '#333',
  },
  dropdownBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  dropdownValue: {
    fontWeight: '600',
    fontSize: 14,
  },
  changeBtn: {
    fontWeight: '600',
    fontSize: 14,
    color: '#007AFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 14,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  optionText: {
    fontSize: 14,
    color: '#000',
  },
  nextButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});