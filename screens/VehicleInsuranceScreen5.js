import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const VehicleInsuranceScreen5 = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // ✅ Extract all required params from route
  const {
    insuranceProduct,
    registrationNumber,
    provider,
    coverStartDate,
  } = route.params;

  const [documents, setDocuments] = useState({
    nationalId: null,
    kraPin: null,
    logbook: null,
    debitNote: null,
    certificate: null,
  });

  const handleFileSelect = async (field) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: false,
      });

      if (result?.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0];
        setDocuments((prev) => ({ ...prev, [field]: selectedFile }));
      }
    } catch (error) {
      console.warn("File selection failed:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{insuranceProduct}</Text>
      </View>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        <Text style={styles.stepLabel}>● KYC Documents</Text>
        <View style={styles.stepNumbers}>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <View
              key={num}
              style={[
                styles.stepCircle,
                num === 5 && styles.activeStep,
              ]}
            >
              <Text
                style={[
                  styles.stepNumber,
                  num === 5 && styles.activeStepText,
                ]}
              >
                {num}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Section Title */}
      <Text style={styles.title}>Debit Note Documents</Text>
      <Text style={styles.uploadText}>Please upload the required debit note documents below.</Text>

      {/* Upload Fields */}
      {[
        { label: "National ID", key: "nationalId" },
        { label: "KRA PIN", key: "kraPin" },
        { label: "Logbook", key: "logbook" },
        { label: "Debit Note", key: "debitNote" },
        { label: "Issued Certificate", key: "certificate" },
      ].map(({ label, key }) => (
        <View key={key} style={styles.checklistItem}>
          <View style={styles.docLeft}>
            <Ionicons name="cloud-upload-outline" size={24} color="#EB5757" />
            <Text style={styles.checklistText}>{label}</Text>
          </View>
          <TouchableOpacity
            style={styles.attachButton}
            onPress={() => handleFileSelect(key)}
          >
            <Text style={styles.attachText}>
              {documents[key] ? "Attached" : "Attach document"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* ✅ Updated Next Button with full param passing */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.navigate('VehicleInsurance6', {
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

export default VehicleInsuranceScreen5;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    padding: 25,
    flexGrow: 1,
  },
  headerRow: {
    marginBottom: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
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
    backgroundColor: '#EB5757',
  },
  stepNumber: {
    fontSize: 12,
    color: '#555',
  },
  activeStepText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 13,
    color: '#777',
    marginBottom: 20,
  },
  checklistItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  docLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checklistText: {
    fontSize: 15,
    color: '#000',
  },
  attachButton: {
    borderWidth: 1,
    borderColor: '#EB5757',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  attachText: {
    fontSize: 13,
    color: '#EB5757',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#EB5757',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
