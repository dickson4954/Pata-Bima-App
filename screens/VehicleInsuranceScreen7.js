import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const VehicleInsuranceScreen7 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Get the passed parameters
  const {
    kraPin = 'A09B0030050023',
    firstName = 'Join',
    lastName = 'Doe',
    registration = 'KDA 42304',
    chassisNo = 'NCSRC 0001860',
    make = 'TOROTA',
    model = 'CIDUJK DND'
  } = route.params || {};

  const handleConfirm = () => {
    navigation.navigate('VehicleInsurance8', {
      kraPin,
      firstName,
      lastName,
      registration,
      chassisNo,
      make,
      model
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Curved Container */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Details Confirmation</Text>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {/* Personal Details */}
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>KRA PIN</Text>
          <Text style={styles.detailValue}>{kraPin}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>First Name</Text>
          <Text style={styles.detailValue}>{firstName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Last Name</Text>
          <Text style={styles.detailValue}>{lastName}</Text>
        </View>

        {/* Vehicle Details */}
        <Text style={styles.sectionTitle}>Vehicle Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Registration</Text>
          <Text style={styles.detailValue}>{registration}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Chassis No</Text>
          <Text style={styles.detailValue}>{chassisNo}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Make</Text>
          <Text style={styles.detailValue}>{make}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Model</Text>
          <Text style={styles.detailValue}>{model}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmButtonText}>Confirm & Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    flexGrow: 1,
  },
  headerContainer: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  contentContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#555',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  editButton: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  editButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 180,
  },
  confirmButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default VehicleInsuranceScreen7;