import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const VehicleInsuranceScreen6 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header and Steps */}
      <View style={styles.stepIndicator}>
        <Text style={styles.stepLabel}>1 KYC Details</Text>
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
          <View style={styles.checkbox} />
          <Text style={styles.checklistText}>National ID</Text>
          <View style={styles.spacer} />
          <TouchableOpacity style={styles.attachButton}>
            <Text style={styles.attachText}>Attach document</Text>
          </TouchableOpacity>
        </View>

        {/* KRA PIN */}
        <View style={styles.checklistItem}>
          <View style={styles.checkbox} />
          <Text style={styles.checklistText}>KRA PIN</Text>
          <View style={styles.spacer} />
          <TouchableOpacity style={styles.attachButton}>
            <Text style={styles.attachText}>Attach document</Text>
          </TouchableOpacity>
        </View>

        {/* Logbook */}
        <View style={styles.checklistItem}>
          <View style={styles.checkbox} />
          <Text style={styles.checklistText}>Logbook</Text>
          <View style={styles.spacer} />
          <TouchableOpacity style={styles.attachButton}>
            <Text style={styles.attachText}>Attach document</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Fetching Details Section */}
      <View style={styles.fetchingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.fetchingText}>Fetching Details</Text>
        <Text style={styles.fetchingSubText}>We are fetching the details of the provided logbook</Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('VehicleInsurance7')} // Updated to match App.js
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VehicleInsuranceScreen6;

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
    backgroundColor: '#4CAF50',
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
    alignItems: 'center',
    marginBottom: 30,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#D3D3D3',
    marginRight: 15,
  },
  checklistText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  spacer: {
    width: 20,
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
  fetchingContainer: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  fetchingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  fetchingSubText: {
    fontSize: 14,
    color: '#7F7F7F',
    textAlign: 'center',
    marginTop: 5,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});