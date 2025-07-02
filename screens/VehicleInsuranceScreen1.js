import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const VehicleInsuranceScreen1 = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const vehicleTypes = [
    { name: 'Private', icon: 'car-outline', screen: 'VehicleInsurance2' },
    {
      name: 'Commercial',
      icon: 'truck-outline',
      screen: 'CommercialInsurance1',
      note: 'You can include any car under Commercial use.',
    },
    { name: 'PSV', icon: 'bus-outline', screen: 'VehicleInsurance2' },
    { name: 'Special Classes', icon: 'construct-outline', screen: 'VehicleInsurance2' },
    { name: 'Motorcycle', icon: 'bicycle-outline', screen: 'VehicleInsurance2' },
    { name: 'TukTuk', icon: 'car-sport-outline', screen: 'VehicleInsurance2' },
  ];

  const handleNext = () => {
    if (selected) {
      navigation.navigate(selected.screen, {
        vehicleType: selected.name,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        <Text style={styles.stepLabel}>● Vehicle Type</Text>
        <View style={styles.stepNumbers}>
          {[2, 3, 4, 5, 6].map((num, index) => (
            <View key={index} style={styles.stepCircle}>
              <Text style={styles.stepNumber}>{num}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Vehicle Grid */}
      <View style={styles.grid}>
        {vehicleTypes.map((type, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              selected?.name === type.name && styles.cardSelected,
            ]}
            onPress={() => setSelected(type)}
          >
            <Ionicons name={type.icon} size={32} color="#E30613" />
            <Text style={styles.cardTitle}>{type.name}</Text>
            {type.note && <Text style={styles.cardNote}>{type.note}</Text>}
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Button */}
      <TouchableOpacity
        style={[
          styles.bottomButton,
          !selected && styles.bottomButtonDisabled,
        ]}
        onPress={handleNext}
        disabled={!selected}
      >
        <Text style={styles.bottomButtonText}>
          Check Vehicle For Existing Cover
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingTop: 40,
    paddingHorizontal: 15,
    flexGrow: 1,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  stepLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  stepNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 15,
    columnGap: 15,
    marginBottom: 30,
  },
  card: {
    width: (width - 60) / 2,
    aspectRatio: 1,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDECEC',
    borderWidth: 1,
    borderColor: '#F5C6CB',
  },
  cardSelected: {
    borderColor: '#E30613',
    borderWidth: 2,
    shadowColor: '#E30613',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    textAlign: 'center',
  },
  cardNote: {
    fontSize: 11,
    color: '#555',
    marginTop: 4,
    textAlign: 'center',
  },
  bottomButton: {
    backgroundColor: '#E30613',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonDisabled: {
    backgroundColor: '#ccc',
  },
  bottomButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default VehicleInsuranceScreen1;
