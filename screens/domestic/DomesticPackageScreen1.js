import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

const underwritersOptions = ['AAR', 'CIC', 'Jubilee', 'Britam', 'APA'];

const DomesticPackageScreen1 = ({ navigation }) => {
  const [form, setForm] = useState({
    clientName: '',
    propertyLocation: '',
    itemSheet: null,
    underwriters: [],
  });

  const [underwritersModalVisible, setUnderwritersModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const isFormValid = form.clientName && form.propertyLocation && form.itemSheet;

  const toggleUnderwriter = (item) => {
    setForm((prev) => {
      const exists = prev.underwriters.includes(item);
      if (exists) {
        return {
          ...prev,
          underwriters: prev.underwriters.filter((u) => u !== item),
        };
      } else if (prev.underwriters.length < 3) {
        return {
          ...prev,
          underwriters: [...prev.underwriters, item],
        };
      }
      return prev;
    });
  };

  const handleFileSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });
      if (result.type === 'success') {
        setForm({ ...form, itemSheet: result.name });
      }
    } catch (err) {
      console.log('Document picker error:', err);
    }
  };

  const handleApply = () => {
    if (!isFormValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessModalVisible(true);
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Domestic Package</Text>
      </View>

      {/* Step Indicator */}
      <View style={styles.stepRow}>
        <View style={styles.stepCircle}><Text style={styles.stepNumber}>1</Text></View>
        <Text style={styles.stepText}>Policy Details</Text>
      </View>

      {/* Client Name */}
      <Text style={styles.label}>Client Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter client's full name"
        value={form.clientName}
        onChangeText={(val) => setForm({ ...form, clientName: val })}
      />

      {/* Property Location */}
      <Text style={styles.label}>Property Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter property address/location"
        value={form.propertyLocation}
        onChangeText={(val) => setForm({ ...form, propertyLocation: val })}
      />

      {/* Item Sheet Upload */}
      <View style={styles.uploadCard}>
        <View style={styles.uploadLeft}>
          <View style={styles.uploadIconCircle}>
            <Ionicons name="cloud-upload" size={24} color="#fff" />
          </View>
          <View>
            <Text style={styles.uploadLabel}>Item Sheet</Text>
            {form.itemSheet && (
              <Text style={styles.fileNameText} numberOfLines={1}>
                {form.itemSheet}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity 
          style={styles.uploadButton} 
          onPress={handleFileSelect}
          activeOpacity={0.7}
        >
          <Text style={styles.uploadButtonText}>
            {form.itemSheet ? 'Change file' : 'Select a file'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Preferred Underwriters */}
      <Text style={styles.label}>Preferred Underwriters</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setUnderwritersModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.dropdownText,
          !form.underwriters.length && styles.placeholderText
        ]}>
          {form.underwriters.length > 0
            ? form.underwriters.join(', ')
            : 'Select preferred underwriters'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#000" />
      </TouchableOpacity>

      {/* Apply Button */}
      <TouchableOpacity
        style={[styles.applyButton, !isFormValid && styles.disabledButton]}
        disabled={!isFormValid || loading}
        onPress={handleApply}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.applyButtonText}>Apply Policy</Text>
        )}
      </TouchableOpacity>

      {/* Underwriters Modal */}
      <Modal visible={underwritersModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select up to 3 underwriters</Text>
            {underwritersOptions.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.modalItem}
                onPress={() => toggleUnderwriter(item)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={form.underwriters.includes(item) ? 'checkbox' : 'square-outline'}
                  size={22}
                  color="#E30613"
                  style={styles.checkboxIcon}
                />
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              onPress={() => setUnderwritersModalVisible(false)} 
              style={styles.modalDoneBtn}
              activeOpacity={0.7}
            >
              <Text style={styles.modalDoneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={successModalVisible} transparent animationType="fade">
        <View style={styles.successModalOverlay}>
          <View style={styles.successModal}>
            <Image 
              source={require('../../assets/celebrate.png')} // Update with your image path
              style={styles.successImage}
              resizeMode="contain"
            />
            <Text style={styles.successTitle}>Policy Application Submitted</Text>
            
            <View style={styles.successDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Client:</Text>
                <Text style={styles.detailValue}>{form.clientName}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Property Location:</Text>
                <Text style={styles.detailValue}>{form.propertyLocation}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Item Sheet:</Text>
                <Text style={styles.detailValue} numberOfLines={1}>
                  {form.itemSheet || 'None'}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Underwriters:</Text>
                <Text style={styles.detailValue}>
                  {form.underwriters.length > 0 ? form.underwriters.join(', ') : 'None'}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setSuccessModalVisible(false)}
              style={styles.successButton}
              activeOpacity={0.7}
            >
              <Text style={styles.successButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginLeft: 12 
  },
  stepRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E30613',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  stepText: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E30613',
    borderBottomWidth: 2,
    borderBottomColor: '#E30613',
  },
  label: { 
    fontWeight: 'bold', 
    marginTop: 16, 
    marginBottom: 6 
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  uploadCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    padding: 12,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  uploadLeft: { 
    flexDirection: 'row', 
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  uploadIconCircle: {
    backgroundColor: '#E30613',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  uploadLabel: { 
    fontWeight: 'bold',
    fontSize: 14,
  },
  fileNameText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#E30613',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  uploadButtonText: { 
    color: '#E30613', 
    fontWeight: 'bold',
    fontSize: 14,
  },
  dropdown: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dropdownText: { 
    color: '#000',
    flex: 1,
  },
  placeholderText: {
    color: '#888',
  },
  applyButton: {
    backgroundColor: '#E30613',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  applyButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '85%',
  },
  modalTitle: { 
    fontWeight: 'bold', 
    fontSize: 16, 
    marginBottom: 12 
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkboxIcon: {
    marginRight: 10,
  },
  modalItemText: {
    fontSize: 16,
  },
  modalDoneBtn: {
    backgroundColor: '#E30613',
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalDoneText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  successModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  successModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
    alignItems: 'center',
  },
  successImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  successDetails: {
    width: '100%',
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#666',
    flex: 1,
  },
  detailValue: {
    flex: 1,
    textAlign: 'right',
    color: '#333',
  },
  successButton: {
    backgroundColor: '#E30613',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  successButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DomesticPackageScreen1;