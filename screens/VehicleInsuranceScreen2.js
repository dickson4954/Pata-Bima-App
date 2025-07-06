// screens/VehicleInsuranceScreen2.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const insuranceProductsByVehicleType = {
  Private: {
    thirdParty: [
      'TOR FOR Private',
      'Private Third-party',
      'Private Third-party Extensible',
      'Private Motorcycle Third-party',
    ],
    comprehensive: [
        'Private Comprehensive',

    ],
  },
  Commercial: {
    thirdParty: [
      'TOR for Commercial',
      'Own Goods Third-Party',
      'General Cartage Third-Party',
      'Commercial TukTuk Third-Party',
      'Commercial TukTuk Third-Party Extensible',
      'Own Goods Third-Party Extensible',
      'General Cartage Third-Party Extensible',
    ],
    comprehensive: [
        'Commercial TukTuk Comprehensive',
        'General Cartage Comprehensive',
        'Own Goods Comprehensive'
    ], 
  },
  TukTuk: {
    thirdParty: [
      'PSV Tuk-tuk Third-party',
      'PSV Tuk-tuk Third-party Extendible',
      'Commercial TUKTUK Third-Party',
      'Commercial TUKTUK Third-Party Extendible'
    ],
    comprehensive: [
      'Commercial TukTuk Comprehensive',
      'PSV Tuk-Tuk Comprehensive'
    ],
  },
  Motorcycle: {
    thirdParty: [
      'Private Motorcycle Third-party',
      'PSV Motorcycle Third-Party',
      'PSV Motorcycle Third-party 6 Months',

    ],
    comprehensive: [
        'Private Motorcycle Comprehensive',
        'PSV Motorcycle Comprehensive',
        'PSV Motorcycle Comprehensive 6 Months'
    ],
  },
  'Special Classes': {
    thirdParty: [
        'Agricultural Tractor Third-party',
        'Commercial Institutional Third-Party Extendible',
        'Commercial Institutional Third-Party',
        'KG Plate Third-Party',
        'Driving School Third-Party'

    ],
    comprehensive: [
        'Agricultural Tractor Comprehensive',
        'Commercial Institutional Comprehensive',
        'Driving School Comprehensive',
        'Fuel Tankers Comprehensive',
        'Commercial Ambulance Comprehensive'

    ],
  },
  PSV: {
    thirdParty: [
        'PSV Uber Third-party',
        'PSV Tuk-Tuk Third-Party',
        'PSV Tuk-Tuk Third-Party Extendible',
        '1 Month PSV Matatu Third-Party',
        '2 Weeks PSV Matatu Third-Party',
        'PSV Uber Third-Party Extendible',
        'PSV Tour van Third-Party',
        '1 Week PSV Matatu Third-Party'
    ],
    comprehensive: [
        'PSV Uber Comprehensive',
        'PSV Tour Van Comprehensive'
    ],
  },
};

const VehicleInsuranceScreen2 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { vehicleType } = route.params;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [thirdPartyOpen, setThirdPartyOpen] = useState(true);
  const [comprehensiveOpen, setComprehensiveOpen] = useState(false);

  const thirdPartyOptions = insuranceProductsByVehicleType[vehicleType]?.thirdParty || [];
  const comprehensiveOptions = insuranceProductsByVehicleType[vehicleType]?.comprehensive || [];

  const handleNext = () => {
  if (!selectedProduct) return;

  const isComprehensive = comprehensiveOptions.includes(selectedProduct);

  navigation.navigate(
    isComprehensive ? 'VehicleComprehensive3' : 'VehicleInsurance3',
    {
      vehicleType,
      insuranceProduct: selectedProduct,
    }
  );
};
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Step Indicator */}
      <View style={styles.stepRow}>
        <Text style={styles.stepLabel}>Insurance Type</Text>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <View
            key={num}
            style={num === 2 ? styles.stepCircleActive : styles.stepCircle}
          >
            <Text style={num === 2 ? styles.stepTextActive : styles.stepText}>
              {num}
            </Text>
          </View>
        ))}
      </View>

      {/* Vehicle Type Box */}
      <Text style={styles.dropdownLabel}>DropDown: Select Vehicle type</Text>
      <View style={styles.vehicleBox}>
        <View style={styles.vehicleLeft}>
          <FontAwesome5
            name="car-side"
            size={20}
            color="#EB5757"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.vehicleText}>{vehicleType}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.changeBtn}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Insurance product label */}
      <Text style={styles.dropdownLabel}>DropDown: Select insurance product</Text>

      {/* Third Party Group */}
      <TouchableOpacity
        style={styles.groupHeader}
        onPress={() => setThirdPartyOpen(!thirdPartyOpen)}
      >
        <Text style={styles.groupTitle}>
          Third Party ({thirdPartyOptions.length})
        </Text>
        <Ionicons
          name={thirdPartyOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#000"
        />
      </TouchableOpacity>

      {thirdPartyOpen &&
        thirdPartyOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionRow, { marginBottom: 12 }]}
            onPress={() => setSelectedProduct(option)}
          >
            <View style={styles.radioOuter}>
              {selectedProduct === option && (
                <Ionicons name="checkmark" size={12} color="#fff" />
              )}
            </View>
            <Text
              style={[
                styles.optionText,
                selectedProduct === option && styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}

      {/* Comprehensive Group (only if any) */}
      {comprehensiveOptions.length > 0 && (
        <>
          <TouchableOpacity
            style={styles.groupHeader}
            onPress={() => setComprehensiveOpen(!comprehensiveOpen)}
          >
            <Text style={styles.groupTitle}>
              Comprehensive ({comprehensiveOptions.length})
            </Text>
            <Ionicons
              name={comprehensiveOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#000"
            />
          </TouchableOpacity>

          {comprehensiveOpen &&
            comprehensiveOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.optionRow, { marginBottom: 12 }]}
                onPress={() => setSelectedProduct(option)}
              >
                <View style={styles.radioOuter}>
                  {selectedProduct === option && (
                    <Ionicons name="checkmark" size={12} color="#fff" />
                  )}
                </View>
                <Text
                  style={[
                    styles.optionText,
                    selectedProduct === option && styles.optionTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
        </>
      )}

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.nextButton, !selectedProduct && { opacity: 0.5 }]}
        onPress={handleNext}
        disabled={!selectedProduct}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default VehicleInsuranceScreen2;

// Styles stay unchanged...
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
    flexGrow: 1,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  stepCircleActive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EB5757',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepTextActive: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  stepLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  dropdownLabel: {
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
  },
  vehicleBox: {
    backgroundColor: '#FFF0F0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  changeBtn: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  groupTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#EB5757',
    backgroundColor: '#EB5757',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  optionText: {
    fontSize: 14,
    color: '#000',
  },
  optionTextSelected: {
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#EB5757',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
