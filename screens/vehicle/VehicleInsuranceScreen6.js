import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert,
  Easing, // Import Easing here
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

const VehicleInsuranceScreen6 = () => {
  const navigation = useNavigation();
  const route = useRoute();

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

  const [fetching, setFetching] = useState(false);
  const [fetchingComplete, setFetchingComplete] = useState(false);
  const spinAnim = useRef(new Animated.Value(0)).current;

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const pickDocument = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: false,
      });

      if (result && !result.canceled && result.assets && result.assets.length > 0) {
        setDocuments(prev => ({
          ...prev,
          [type]: result.assets[0]
        }));
        startVerification();
      }
    } catch (error) {
      console.error('Document pick error:', error);
      Alert.alert('Error', 'Failed to select document');
    }
  };

  const removeDocument = (type) => {
    setDocuments(prev => ({
      ...prev,
      [type]: null
    }));
    if (fetchingComplete) {
      setFetchingComplete(false);
    }
  };

  const startVerification = () => {
    if (Object.values(documents).every(doc => doc !== null)) {
      setFetching(true);
      
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear
        })
      ).start();

      // Simulate document verification (replace with actual API call)
      setTimeout(() => {
        setFetching(false);
        setFetchingComplete(true);
        spinAnim.stopAnimation();
      }, 2000); // Reduced from 3000ms to 2000ms for better UX
    }
  };

  const handleNextPress = () => {
    if (!Object.values(documents).every(doc => doc) || !fetchingComplete) {
      Alert.alert(
        'Action Required',
        'Please upload all documents and wait for verification',
        [{ text: 'OK' }]
      );
      return;
    }

    navigation.navigate('VehicleInsurance7', {
      insuranceProduct,
      registrationNumber,
      provider,
      coverStartDate,
    });
  };

  useEffect(() => {
    // Automatically start verification when all documents are uploaded
    if (Object.values(documents).every(doc => doc !== null) && !fetchingComplete) {
      startVerification();
    }
  }, [documents]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{insuranceProduct || 'Insurance Application'}</Text>
      </View>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        <Text style={styles.stepLabel}>KYC Documents</Text>
        <View style={styles.stepNumbers}>
          {[1, 2, 3, 4, 5].map((num, index) => (
            <View key={index} style={[
              styles.stepCircle,
              index === 4 && styles.activeStep
            ]}>
              <Text style={[
                styles.stepNumber,
                index === 4 && styles.activeStepText
              ]}>
                {num}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Title Section */}
      <Text style={styles.title}>KYC Verification</Text>
      <Text style={styles.sectionTitle}>Required Documents</Text>
      <Text style={styles.uploadText}>Please upload all documents listed below</Text>

      {/* Document List */}
      {[
        { label: 'National ID', key: 'nationalId', icon: 'id-card' },
        { label: 'KRA PIN', key: 'kraPin', icon: 'card' },
        { label: 'Logbook', key: 'logbook', icon: 'book' },
      ].map((doc) => (
        <View key={doc.key} style={styles.checklistItem}>
          <Ionicons name={doc.icon} size={24} color="#EB5757" />
          <Text style={styles.checklistText}>{doc.label}</Text>
          {documents[doc.key] ? (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeDocument(doc.key)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => pickDocument(doc.key)}
            >
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* Verification Status */}
      <View style={[
        styles.statusContainer,
        !fetching && !fetchingComplete && styles.statusPending,
        fetching && styles.statusVerifying,
        fetchingComplete && styles.statusComplete
      ]}>
        {fetching ? (
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Ionicons name="sync" size={40} color="#EB5757" />
          </Animated.View>
        ) : fetchingComplete ? (
          <Ionicons name="checkmark-circle" size={40} color="#EB5757" />
        ) : (
          <Ionicons name="alert-circle" size={40} color="#EB5757" />
        )}
        
        <Text style={styles.statusTitle}>
          {fetching ? 'Verifying Documents...' : 
           fetchingComplete ? 'Verification Complete!' : 
           'Documents Required'}
        </Text>
        
        <Text style={styles.statusText}>
          {fetching ? 'Please wait while we verify your documents' : 
           fetchingComplete ? 'All documents verified successfully' : 
           'Please upload all required documents'}
        </Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          (!fetchingComplete || !Object.values(documents).every(doc => doc)) && styles.nextButtonDisabled
        ]}
        onPress={handleNextPress}
        disabled={!fetchingComplete || !Object.values(documents).every(doc => doc)}
      >
        <Text style={styles.nextButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
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
    alignItems: 'center',
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
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  checklistText: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    marginLeft: 12,
  },
  uploadButton: {
    backgroundColor: '#EB5757',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#EB5757',
  },
  deleteText: {
    color: '#EB5757',
    fontSize: 13,
    fontWeight: '500',
  },
  statusContainer: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  statusPending: {
    backgroundColor: '#FFE5E5',
  },
  statusVerifying: {
    backgroundColor: '#FFECD6',
  },
  statusComplete: {
    backgroundColor: '#E5F7ED',
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  statusText: {
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
  },
  nextButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default VehicleInsuranceScreen6;
