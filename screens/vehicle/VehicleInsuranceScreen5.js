import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { fetchPricing } from './pricingService'; // Import the pricing service

const VehicleInsuranceScreen5 = () => {
  const navigation = useNavigation();
  const route = useRoute();

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

  const [pricingInfo, setPricingInfo] = useState(null);
  const [loadingPricing, setLoadingPricing] = useState(false);

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

  const handleFileDelete = (field) => {
    setDocuments((prev) => ({ ...prev, [field]: null }));
  };

  const handleFetchPricing = async () => {
    setLoadingPricing(true);
    try {
      const vehicleDetails = {
        registrationNumber,
        // Add other vehicle details as needed
      };
      const pricing = await fetchPricing(provider.id, vehicleDetails);
      setPricingInfo(pricing);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch pricing information.');
    } finally {
      setLoadingPricing(false);
    }
  };

  useEffect(() => {
    handleFetchPricing(); // Fetch pricing when the component mounts
  }, [provider]); // Re-fetch when the provider changes

  const handleNext = () => {
    // Check if all required documents are attached
    const requiredDocuments = [
      'nationalId',
      'kraPin',
      'logbook',
      'debitNote',
      'certificate',
    ];

    const missingDocuments = requiredDocuments.filter(doc => !documents[doc]);

    if (missingDocuments.length > 0) {
      Alert.alert('Missing Documents', `Please attach the following documents: ${missingDocuments.join(', ')}`);
    } else {
      // Navigate to the next screen if all documents are attached
      navigation.navigate('VehicleInsurance6', {
        insuranceProduct,
        registrationNumber,
        provider,
        coverStartDate,
        documents, // Pass documents to the next screen
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{insuranceProduct}</Text>
      </View>

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

      <Text style={styles.title}>Debit Note Documents</Text>
      <Text style={styles.uploadText}>Please upload the required debit note documents below.</Text>

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
          {documents[key] ? (
            <View style={styles.documentActions}>
              <TouchableOpacity
                style={styles.attachButton}
                onPress={() => handleFileDelete(key)}
              >
                <Text style={styles.attachText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.attachButton}
              onPress={() => handleFileSelect(key)}
            >
              <Text style={styles.attachText}>Attach document</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* Display Pricing Information */}
      {loadingPricing ? (
        <Text>Loading pricing information...</Text>
      ) : pricingInfo ? (
        <View style={styles.pricingInfo}>
          <Text style={styles.pricingTitle}>Pricing Information</Text>
          <Text>Premium: {pricingInfo.premium}</Text>
          <Text>Coverage: {pricingInfo.coverage}</Text>
          {/* Add more pricing details as needed */}
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNext} // Call handleNext instead of navigating directly
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
  pricingInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    elevation: 1,
  },
  pricingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  documentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
