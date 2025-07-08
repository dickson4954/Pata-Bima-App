import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MedicalInsuranceScreen1 = () => {
  const navigation = useNavigation();

  const handleSelect = (type) => {
    if (type === 'Individual') {
      navigation.navigate('MedicalIndividualForm');
    } else {
      navigation.navigate('MedicalCorporateForm');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical Insurance</Text>
      </View>

      {/* Step Indicator */}
      <View style={styles.stepRow}>
        <View style={styles.stepCircle}>
          <Text style={styles.stepNumber}>1</Text>
        </View>
        <Text style={styles.stepLabel}>Policy Type</Text>
      </View>

      {/* Heading: Select Policy Details */}
      <Text style={styles.subHeading}>Select Policy Details</Text>

      {/* Policy Selection */}
      <View style={styles.cardRow}>
        <TouchableOpacity style={styles.card} onPress={() => handleSelect('Individual')}>
          <View style={styles.iconCircle}>
            <Ionicons name="person-outline" size={28} color="#EB5757" />
          </View>
          <Text style={styles.cardText}>Individual</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => handleSelect('Corporate')}>
          <View style={styles.iconCircle}>
            <Ionicons name="reader-outline" size={28} color="#EB5757" />
          </View>
          <Text style={styles.cardText}>Corporate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MedicalInsuranceScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  backButton: {
    paddingRight: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#EB5757',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  stepNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#EB5757',
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
    marginTop: 8,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff0f0',
    borderRadius: 12,
    paddingVertical: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  iconCircle: {
    backgroundColor: '#FFE8E8',
    borderRadius: 40,
    padding: 16,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});
