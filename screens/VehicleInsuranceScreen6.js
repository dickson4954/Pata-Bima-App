import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

const VehicleInsuranceScreen6 = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // ✅ Extract all necessary parameters
  const {
    insuranceProduct,
    registrationNumber,
    provider,
    coverStartDate,
  } = route.params || {};

  const [documents, setDocuments] = useState({
    nationalId: null,
    kraPin: null,
    logbook: null,
  });

  const pickDocument = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: false,
      });

      if (result?.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0];
        setDocuments((prev) => ({
          ...prev,
          [type]: selectedFile,
        }));
      }
    } catch (error) {
      console.error('Document pick error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Title */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{insuranceProduct || 'TOR For Private'}</Text>
      </View>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        <Text style={styles.stepLabel}>1 KYC Details</Text>
        <View style={styles.stepNumbers}>
          {[2, 3, 4, 5, 6].map((num, index) => (
            <View key={index} style={[styles.stepCircle, index === 4 && styles.activeStep]}>
              <Text style={[styles.stepNumber, index === 4 && styles.activeStepText]}>{num}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Titles */}
      <Text style={styles.title}>KYC Details</Text>
      <Text style={styles.sectionTitle}>Upload Documents</Text>
      <Text style={styles.uploadText}>Please upload all the documents listed below</Text>

      {/* Document Checklist */}
      {[
        { label: 'National ID', key: 'nationalId' },
        { label: 'KRA PIN', key: 'kraPin' },
        { label: 'Logbook', key: 'logbook' },
      ].map((doc) => (
        <View key={doc.key} style={styles.checklistItem}>
          <Ionicons name="document-text-outline" size={24} color="#EB5757" />
          <Text style={styles.checklistText}>{doc.label}</Text>
          <TouchableOpacity
            style={styles.attachButton}
            onPress={() => pickDocument(doc.key)}
          >
            <Text style={styles.attachText}>
              {documents[doc.key] ? 'Attached' : 'Attach document'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Fetching Details Section */}
      <View style={styles.fetchingContainer}>
        <Ionicons name="reload-circle" size={40} color="#EB5757" />
        <Text style={styles.fetchingText}>Fetching Details</Text>
        <Text style={styles.fetchingSubText}>
          We are fetching the details of the provided logbook
        </Text>
      </View>

      {/* ✅ Pass all data to Screen 7 */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.navigate('VehicleInsurance7', {
            insuranceProduct,
            registrationNumber,
            provider,
            coverStartDate,
          })
        }
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default VehicleInsuranceScreen6;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flexGrow: 1,
  },
  headerRow: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EB5757',
  },
  stepNumbers: {
    flexDirection: 'row',
    gap: 8,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F2C8C8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: '#EB5757',
  },
  stepNumber: {
    fontSize: 12,
    color: '#EB5757',
  },
  activeStepText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  uploadText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 24,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  checklistText: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    marginLeft: 10,
  },
  attachButton: {
    backgroundColor: '#EB5757',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 5,
  },
  attachText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  fetchingContainer: {
    backgroundColor: '#FFE5E5',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  fetchingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  fetchingSubText: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#EB5757',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
