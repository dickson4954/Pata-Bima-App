import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CommercialInsurance1 = () => {
  const navigation = useNavigation();
  const [selectedVehicleType, setSelectedVehicleType] = useState('Commercial');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const vehicleTypes = ['Commercial', 'Change'];
  
  const productGroups = [
    {
      category: 'Third Party(7)',
      options: [
        'TOR FOR Commercial',
        'Own Goods Third-Party',
        'General Carings Third-Party',
        'Commercial TuLtuk Third-Party', 
        'Commercial TuLtuk Third-Party externalible',
        'Own Goods Third-Party Extendible',
        'General Carings Third-Party Extendible'
      ]
    },
    {
      category: 'Comprehensive(3)',
      options: [
        'Commercial TuLtuk Comprehensive',
        'General Carings Comprehensive',
        'Own Goods Comprehensive'
      ]
    }
  ];

  const handleNext = () => {
    navigation.navigate('CommercialInsurance2', {
      vehicleType: selectedVehicleType,
      insuranceProduct: selectedProduct
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Insurance Type</Text>
      
      {/* Vehicle Type Selection - Single Bordered Box */}
      <View style={styles.section}>
        <Text style={styles.dropdownLabel}>Dropdown: Select Vehicle type</Text>
        <View style={styles.vehicleTypeContainer}>
          {vehicleTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.vehicleTypeOption,
                selectedVehicleType === type && styles.selectedVehicleType
              ]}
              onPress={() => setSelectedVehicleType(type)}
            >
              <Text style={styles.vehicleTypeText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Insurance Product Selection */}
      <View style={styles.section}>
        <Text style={styles.dropdownLabel}>DropDown: Select Insurance pro duct</Text>
        
        {productGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.productGroup}>
            <Text style={styles.productCategory}>{group.category}</Text>
            {group.options.map((product, productIndex) => (
              <TouchableOpacity 
                key={productIndex}
                style={styles.productOption}
                onPress={() => setSelectedProduct(product)}
              >
                <View style={styles.radioCircle}>
                  {selectedProduct === product && <View style={styles.selectedRb} />}
                </View>
                <Text style={styles.productText}>{product}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.nextButton, !selectedProduct && styles.disabledButton]}
        onPress={handleNext}
        disabled={!selectedProduct}
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
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  vehicleTypeContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  vehicleTypeOption: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedVehicleType: {
    backgroundColor: '#f0f0f0',
  },
  vehicleTypeText: {
    fontSize: 16,
    color: '#000',
  },
  productGroup: {
    marginBottom: 15,
  },
  productCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    paddingLeft: 10,
  },
  productOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  productText: {
    fontSize: 16,
    color: '#000',
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

export default CommercialInsurance1;