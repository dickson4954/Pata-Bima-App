import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const VehicleInsuranceScreen5 = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header and Steps */}
      <View style={styles.stepIndicator}>
        <Text style={styles.stepLabel}>● KYC Details</Text>
        <View style={styles.stepNumbers}>
          {[2, 3, 4, 5, 6].map((num, index) => (
            <View key={index} style={[styles.stepCircle, index === 4 ? styles.activeStep : {}]}>
              <Text style={[styles.stepNumber, index === 4 ? styles.activeStepText : {}]}>{num}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>KYC Details</Text>

      {/* Document Upload Section */}
      <Text style={styles.sectionTitle}>Upload Documents</Text>
      <Text style={styles.uploadText}>Please upload all the documents listed below</Text>

      {/* Document Checklist */}
      <View style={styles.checklistContainer}>
        {/* National ID */}
        <View style={styles.checklistItem}>
          <Text style={styles.checklistTextLeft}>National ID</Text>
          <TouchableOpacity style={styles.attachButton}>
            <Text style={styles.attachText}>Attach document</Text>
          </TouchableOpacity>
        </View>

        {/* KRA PIN */}
        <View style={styles.checklistItem}>
          <Text style={styles.checklistTextLeft}>KRA PIN</Text>
          <TouchableOpacity style={styles.attachButton}>
            <Text style={styles.attachText}>Attach document</Text>
          </TouchableOpacity>
        </View>

        {/* Logbook */}
        <View style={styles.checklistItem}>
          <Text style={styles.checklistTextLeft}>Logbook</Text>
          <TouchableOpacity style={styles.attachButton}>
            <Text style={styles.attachText}>Attach document</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('VehicleInsurance6')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default VehicleInsuranceScreen5;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    padding: 25,
    flexGrow: 1,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  stepNumbers: {
    flexDirection: 'row',
    gap: 10,
  },
  stepCircle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: '#4CAF50', // Green color for active step
  },
  stepNumber: {
    fontSize: 12,
    color: '#555',
  },
  activeStepText: {
    color: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 14,
    color: '#7F7F7F',
    marginBottom: 25,
  },
  checklistContainer: {
    marginBottom: 25,
  },
  checklistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  checklistTextLeft: {
    fontSize: 15,
    color: '#333',
  },
  attachButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  attachText: {
    fontSize: 13,
    color: '#888',
  },
  divider: {
    height: 1,
    backgroundColor: '#D1D1D1',
    marginVertical: 30,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});