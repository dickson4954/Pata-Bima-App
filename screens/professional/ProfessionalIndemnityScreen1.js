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
import RNPickerSelect from 'react-native-picker-select';

const underwritersOptions = ['AAR', 'CIC', 'Jubilee', 'Britam', 'APA'];
const benefitsOptions = ['Legal Cover', 'Loss of Documents', 'Fidelity Guarantee'];

const ProfessionalIndemnityScreen1 = ({ navigation }) => {
  const [form, setForm] = useState({
    companyName: '',
    profession: '',
    limit: '',
    directors: '',
    qualifyingStaff: '',
    otherStaff: '',
    grossFeesLastYear: '',
    projectedGrossFees: '',
    benefits: [],
    underwriters: [],
  });

  const [underwritersModalVisible, setUnderwritersModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFormValid =
    form.companyName &&
    form.profession &&
    form.limit &&
    form.directors &&
    form.qualifyingStaff &&
    form.otherStaff &&
    form.grossFeesLastYear &&
    form.projectedGrossFees;

  const toggleUnderwriter = (item) => {
    setForm((prev) => {
      const alreadySelected = prev.underwriters.includes(item);
      if (alreadySelected) {
        return {
          ...prev,
          underwriters: prev.underwriters.filter((u) => u !== item),
        };
      } else if (prev.underwriters.length < 3) {
        return { ...prev, underwriters: [...prev.underwriters, item] };
      }
      return prev;
    });
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
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Professional Indemnity</Text>
      </View>

      {/* Step Indicator */}
      <View style={styles.stepHeader}>
        <View style={styles.stepCircle}><Text style={styles.stepNumber}>1</Text></View>
        <Text style={styles.stepText}>Policy Details</Text>
      </View>

      {/* Input Fields */}
      {[
        { label: 'Company Name', key: 'companyName', placeholder: 'Enter company name' },
        { label: 'Profession', key: 'profession', placeholder: 'Enter profession/service provided' },
        { label: 'Limit of Liability', key: 'limit', placeholder: 'Enter limit of liability' },
        { label: 'Number of Directors', key: 'directors', placeholder: 'Enter number of directors' },
        { label: 'Number of Qualifying Staff', key: 'qualifyingStaff', placeholder: 'Enter number of qualifying staff' },
        { label: 'Number of Other Staff', key: 'otherStaff', placeholder: 'Enter number of other staff' },
        { label: 'Gross Fees/Earnings Last Financial Year', key: 'grossFeesLastYear', placeholder: 'Enter gross fees for last FY' },
        { label: 'Projected Gross Fees Next Financial Year', key: 'projectedGrossFees', placeholder: 'Enter projected gross fees for next FY' },
      ].map((item) => (
        <View key={item.key}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            style={styles.input}
            placeholder={item.placeholder}
            value={form[item.key]}
            onChangeText={(val) => setForm({ ...form, [item.key]: val })}
          />
        </View>
      ))}
{/* Additional Benefits */}
<Text style={styles.label}>Additional Benefits</Text>
<RNPickerSelect
  onValueChange={(val) => setForm({ ...form, benefits: val ? [val] : [] })}
  placeholder={{ label: 'Select additional benefits', value: null }}
  items={benefitsOptions.map((b) => ({ label: b, value: b }))}
  style={pickerStyles}
/>

{/* Preferred Underwriters */}
<Text style={styles.label}>Preferred Underwriters</Text>
<TouchableOpacity
  style={styles.dropdown}
  onPress={() => setUnderwritersModalVisible(true)}
>
  <Text style={styles.dropdownText}>
    {form.underwriters.length > 0
      ? form.underwriters.join(', ')
      : 'Select preferred underwriters'}
  </Text>
  <Ionicons name="chevron-down" size={20} color="#000" />
</TouchableOpacity>

{/* Apply Policy Button */}
<TouchableOpacity
  style={[styles.applyButton, !isFormValid && { backgroundColor: '#ccc', marginTop: 20 }]}
  disabled={!isFormValid || loading}
  onPress={handleApply}
>
  {loading ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <Text style={styles.applyButtonText}>Apply Policy</Text>
  )}
</TouchableOpacity>

      {/* Underwriters Selection Modal */}
      <Modal visible={underwritersModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select up to 3 underwriters</Text>
            {underwritersOptions.map((item) => (
              <TouchableOpacity
                key={item}
                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}
                onPress={() => toggleUnderwriter(item)}
              >
                <Ionicons
                  name={form.underwriters.includes(item) ? 'checkbox' : 'square-outline'}
                  size={22}
                  color="#E30613"
                  style={{ marginRight: 10 }}
                />
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setUnderwritersModalVisible(false)} style={styles.modalDoneBtn}>
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
            />
            <Text style={styles.successTitle}>Policy Application</Text>
            <Text style={styles.successText}>
              Professional Indemnity request was successfully submitted
            </Text>
            
            <View style={styles.successDetails}>
             
            </View>

            <TouchableOpacity
              style={styles.successButton}
              onPress={() => setSuccessModalVisible(false)}
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
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 12 },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E30613',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: { color: '#fff', fontWeight: 'bold' },
  stepText: { color: '#E30613', fontWeight: 'bold', marginLeft: 8, fontSize: 16 },
  label: { marginTop: 15, marginBottom: 6, fontWeight: 'bold', color: '#000' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownText: { color: '#000' },
  applyButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#E30613',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 8,
  },
  applyButtonText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
  },
  modalTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  modalDoneBtn: {
    backgroundColor: '#E30613',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  modalDoneText: { color: '#fff', fontWeight: 'bold' },
  // Success Modal Styles
  successModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  successModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  successImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  successDetails: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  successDetailText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 4,
  },
  successButton: {
    backgroundColor: '#27AE60',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  successButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const pickerStyles = {
  inputIOS: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    color: '#000',
    marginBottom: 10,
  },
  inputAndroid: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    color: '#000',
    marginBottom: 10,
  },
};

export default ProfessionalIndemnityScreen1;