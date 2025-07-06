import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const VehicleInsuranceScreen1 = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const vehicleTypes = [
    { name: 'Private', icon: <FontAwesome5 name="car-side" size={30} color="#EB5757" />, screen: 'VehicleInsurance2' },
    { name: 'Commercial', icon: <FontAwesome5 name="truck-moving" size={30} color="#EB5757" />, screen: 'VehicleInsurance2' },

    { name: 'PSV', icon: <FontAwesome5 name="bus" size={30} color="#EB5757" />, screen: 'VehicleInsurance2' },
    { name: 'Special Classes', icon: <MaterialCommunityIcons name="tow-truck" size={30} color="#EB5757" />, screen: 'VehicleInsurance2' },
    { name: 'Motorcycle', icon: <FontAwesome5 name="motorcycle" size={30} color="#EB5757" />, screen: 'VehicleInsurance2' },
    { name: 'TukTuk', icon: <MaterialCommunityIcons name="rickshaw" size={30} color="#EB5757" />, screen: 'VehicleInsurance2' },
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
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Motor Vehicle insurance</Text>
      </View>

      {/* Step Indicator */}
      <View style={styles.stepRow}>
        <View style={styles.stepCircleActive}>
          <Text style={styles.stepTextActive}>1</Text>
        </View>
        {[2, 3, 4, 5, 6].map((num) => (
          <View key={num} style={styles.stepCircle}>
            <Text style={styles.stepText}>{num}</Text>
          </View>
        ))}
        <Text style={styles.stepLabel}>Step Indicator</Text>
      </View>

      {/* Cards */}
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
            {type.icon}
            <Text style={styles.cardText}>{type.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Red Button */}
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={handleNext}
        disabled={!selected}
      >
        <FontAwesome5 name="car" size={18} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.bottomButtonText}>Check Vehicle For Existing Cover</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  headerRow: {
    marginBottom: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    gap: 8,
  },
  stepCircleActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 12,
    color: '#333',
  },
  stepLabel: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666',
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
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#EB5757',
    backgroundColor: '#fff',
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  bottomButton: {
    backgroundColor: '#EB5757',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default VehicleInsuranceScreen1;
