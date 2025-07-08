import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import * as DocumentPicker from 'expo-document-picker';

const VehicleComprehensive8 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { insuranceProduct = 'New Motor Vehicle Insurance' } = route.params || {};

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    kraPin: '',
    coverDuration: '',
    amountPaid: '',
    paymentProof: '',
    mpesaMessage: '',
    uploadedFile: null, // To store the uploaded file information
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result && !result.canceled && result.assets && result.assets.length > 0) {
        setForm((prev) => ({
          ...prev,
          uploadedFile: {
            uri: result.assets[0].uri,
            name: result.assets[0].name,
          },
        }));
      }
    } catch (err) {
      console.log('Document pick error:', err);
    }
  };

  const renderConditionalPaymentField = () => {
    switch (form.paymentProof) {
      case 'Bank':
        return (
          <View style={styles.uploadContainer}>
            <Text style={styles.inputLabel}>Upload Bank Slip *</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
              <Ionicons name="cloud-upload-outline" size={20} color="#FF0000" />
              <Text style={styles.uploadButtonText}>
                {form.uploadedFile ? form.uploadedFile.name : 'Upload Bank Slip'}
              </Text>
            </TouchableOpacity>
          </View>
        );
      case 'MPESA':
        return (
          <>
            <Text style={styles.inputLabel}>MPESA Payment Message *</Text>
            <TextInput
              style={styles.input}
              placeholder="Paste MPESA payment message"
              value={form.mpesaMessage}
              onChangeText={(text) => handleChange('mpesaMessage', text)}
              multiline
              numberOfLines={4}
            />
          </>
        );
      case 'Cheque':
        return (
          <View style={styles.uploadContainer}>
            <Text style={styles.inputLabel}>Upload Cheque *</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
              <Ionicons name="cloud-upload-outline" size={20} color="#FF0000" />
              <Text style={styles.uploadButtonText}>
                {form.uploadedFile ? form.uploadedFile.name : 'Upload Cheque'}
              </Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>{insuranceProduct}</Text>
        </View>

        {/* Steps */}
        <View style={styles.kycRow}>
          <View style={styles.stepWrapper}>
            <View style={styles.redStep}><Text style={styles.stepText}>1</Text></View>
            <View style={styles.redStep}><Text style={styles.stepText}>2</Text></View>
            <View style={styles.inactiveStep}><Text style={styles.stepText}>3</Text></View>
          </View>
          <Text style={styles.detailsText}>Details</Text>
        </View>
      </View>

      {/* Form */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Debit Note Details</Text>
        <Text style={styles.subtitle}>Provide the debit note details below.</Text>

        <Text style={styles.inputLabel}>Client First Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. John"
          value={form.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
        />

        <Text style={styles.inputLabel}>Client Last Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Doe"
          value={form.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
        />

        <Text style={styles.inputLabel}>KRA PIN *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. A012345678Z"
          value={form.kraPin}
          onChangeText={(text) => handleChange('kraPin', text)}
        />

        <Text style={styles.inputLabel}>Cover Duration *</Text>
        <RNPickerSelect
          onValueChange={(value) => handleChange('coverDuration', value)}
          placeholder={{ label: 'Select duration', value: null }}
          items={[
            { label: '1 week', value: '1 week' },
            { label: '2 weeks', value: '2 weeks' },
            { label: '1 month', value: '1 month' },
            { label: '6 months', value: '6 months' },
            { label: '9 months', value: '9 months' },
            { label: '10 months', value: '10 months' },
            { label: '11 months', value: '11 months' },
            { label: '1 year', value: '1 year' },
          ]}
          style={pickerSelectStyles}
          value={form.coverDuration}
        />

        <Text style={styles.inputLabel}>Total Amount Paid *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 10,000"
          keyboardType="numeric"
          value={form.amountPaid}
          onChangeText={(text) => handleChange('amountPaid', text)}
        />

        <Text style={styles.inputLabel}>Payment Proof *</Text>
        <RNPickerSelect
          onValueChange={(value) => handleChange('paymentProof', value)}
          placeholder={{ label: 'Select method', value: null }}
          items={[
            { label: 'Bank', value: 'Bank' },
            { label: 'Cheque', value: 'Cheque' },
            { label: 'MPESA', value: 'MPESA' },
          ]}
          style={pickerSelectStyles}
          value={form.paymentProof}
        />

        {renderConditionalPaymentField()}
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VehicleComprehensive8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  kycRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  stepWrapper: {
    flexDirection: 'row',
    gap: 8,
  },
  redStep: {
    backgroundColor: '#FF0000',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveStep: {
    backgroundColor: '#F2F2F2',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  detailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF0000',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    fontSize: 14,
    marginBottom: 15,
  },
  bottomButtonContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  nextButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  uploadContainer: {
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: '#FFEAEA',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF0000',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  uploadButtonText: {
    fontSize: 14,
    color: '#FF0000',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    fontSize: 14,
    color: '#000',
    marginBottom: 15,
  },
  inputAndroid: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    fontSize: 14,
    color: '#000',
    marginBottom: 15,
  },
  placeholder: {
    color: '#888',
  },
};
