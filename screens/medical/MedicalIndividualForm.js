import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView,
  TouchableOpacity, Platform, Modal, FlatList, Image, ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

const inpatientOptions = [
  { label: '500,000', value: '500000' },
  { label: '2,000,000', value: '2000000' },
  { label: '3,000,000', value: '3000000' },
  { label: '4,000,000', value: '4000000' },
  { label: '5,000,000', value: '5000000' },
  { label: '10,000,000', value: '10000000' },
];

const underwritersOptions = ['AAR', 'CIC', 'Jubilee', 'Britam', 'APA'];

const MedicalIndividualForm = () => {
  const navigation = useNavigation();

  const [inpatientLimit, setInpatientLimit] = useState('');
  const [outpatient, setOutpatient] = useState(false);
  const [dentalOptical, setDentalOptical] = useState(false);
  const [maternity, setMaternity] = useState(false);
  const [age, setAge] = useState('');
  const [spouseAge, setSpouseAge] = useState('');
  const [children, setChildren] = useState('');
  const [underwriters, setUnderwriters] = useState([]);
  const [showUnderwriterModal, setShowUnderwriterModal] = useState(false);
  const [ageError, setAgeError] = useState('');
  const [spouseAgeError, setSpouseAgeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const toggleUnderwriter = (name) => {
    const isSelected = underwriters.includes(name);
    if (isSelected) {
      setUnderwriters(underwriters.filter(item => item !== name));
    } else if (underwriters.length < 3) {
      setUnderwriters([...underwriters, name]);
    }
  };

  const validateAge = (text) => {
    setAge(text);
    const num = parseInt(text);
    if (num && num < 18) {
      setAgeError('Age must be at least 18 years');
    } else {
      setAgeError('');
    }
  };

  const validateSpouseAge = (text) => {
    setSpouseAge(text);
    const num = parseInt(text);
    if (num && num < 18) {
      setSpouseAgeError('Spouse age must be at least 18 years');
    } else {
      setSpouseAgeError('');
    }
  };

  const isFormValid = inpatientLimit && age && !ageError && !spouseAgeError;

  const renderUnderwriterModal = () => (
    <Modal visible={showUnderwriterModal} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <FlatList
            data={underwritersOptions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => toggleUnderwriter(item)}
              >
                <Checkbox
                  value={underwriters.includes(item)}
                  onValueChange={() => toggleUnderwriter(item)}
                  color={underwriters.includes(item) ? '#A52A2A' : undefined}
                />
                <Text style={styles.modalText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={() => setShowUnderwriterModal(false)} style={styles.modalClose}>
            <Text style={styles.modalCloseText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const handleApply = () => {
    if (!isFormValid) return;
    setLoading(true);
    // Simulate a loading delay (e.g., 2 seconds)
    setTimeout(() => {
      setLoading(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical Insurance</Text>
      </View>

      <View style={styles.stepRow}>
        <View style={styles.stepCircle}><Text style={styles.stepText}>1</Text></View>
        <View style={[styles.stepCircle, styles.activeStepCircle]}><Text style={[styles.stepText, styles.activeStepText]}>2</Text></View>
        <Text style={styles.stepLabel}>Policy Details</Text>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>Inpatient Limit</Text>
        <RNPickerSelect
          onValueChange={setInpatientLimit}
          items={inpatientOptions}
          style={pickerSelectStyles}
          value={inpatientLimit}
          placeholder={{ label: 'Select inpatient limits', value: '' }}
          useNativeAndroidPickerStyle={false}
          Icon={() => <Ionicons name="chevron-down" size={20} color="#888" />}
        />

        <Text style={[styles.label, { marginTop: 20 }]}>Additional Benefits</Text>

        <View style={styles.checkboxRow}>
          <Checkbox value={outpatient} onValueChange={setOutpatient} color={outpatient ? '#A52A2A' : undefined} />
          <Text style={styles.checkboxLabel}>Outpatient Cover</Text>
        </View>

        {outpatient && (
          <View style={[styles.checkboxRow, { marginLeft: 28 }]}>
            <Checkbox value={dentalOptical} onValueChange={setDentalOptical} color={dentalOptical ? '#A52A2A' : undefined} />
            <Text style={styles.checkboxLabel}>Dental & Optical Cover</Text>
          </View>
        )}

        <View style={styles.checkboxRow}>
          <Checkbox value={maternity} onValueChange={setMaternity} color={maternity ? '#A52A2A' : undefined} />
          <Text style={styles.checkboxLabel}>Maternity Cover</Text>
        </View>

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter age"
          value={age}
          onChangeText={validateAge}
        />
        {ageError !== '' && <Text style={styles.errorText}>{ageError}</Text>}

        <Text style={styles.label}>Spouse Age</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter spouse age"
          value={spouseAge}
          onChangeText={validateSpouseAge}
        />
        {spouseAgeError !== '' && <Text style={styles.errorText}>{spouseAgeError}</Text>}

        <Text style={styles.label}>Number of Children</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter number of children"
          value={children}
          onChangeText={setChildren}
        />

        <Text style={styles.label}>Preferred Underwriters</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setShowUnderwriterModal(true)}>
          <Text style={{ color: underwriters.length > 0 ? '#000' : '#888' }}>
            {underwriters.length > 0 ? underwriters.join(', ') : 'Select preferred underwriters'}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#888" style={{ position: 'absolute', right: 10, top: 14 }} />
        </TouchableOpacity>

        {renderUnderwriterModal()}

        <TouchableOpacity
          style={[styles.button, !isFormValid && { backgroundColor: '#ddd' }]}
          disabled={!isFormValid || loading}
          onPress={handleApply}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Apply Policy</Text>}
        </TouchableOpacity>
      </View>

      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <Image source={require('../../assets/celebrate.png')} style={styles.successIcon} />
            <Text style={styles.successTitle}>Policy Application</Text>
            <Text style={styles.successText}>
              Medical Insurance request was successfully submitted
            </Text>
            <Text style={styles.successText}>
              Number of Beneficiaries: {children ? parseInt(children) + 2 : 3}
            </Text>
            <Text style={styles.successText}>
              Inpatient Limit: {inpatientLimit ? `Ksh ${inpatientLimit}` : '500,000'}
            </Text>
            <TouchableOpacity
              style={styles.successButton}
              onPress={() => setShowSuccessModal(false)}
            >
              <Text style={styles.successButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MedicalIndividualForm;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: { marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#D3D3D3',
    paddingVertical: 10,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FADADD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  activeStepCircle: { backgroundColor: '#A52A2A' },
  stepText: { fontWeight: 'bold', color: '#000' },
  activeStepText: { color: '#fff' },
  stepLabel: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  formSection: { paddingHorizontal: 20, paddingBottom: 30, backgroundColor: '#D3D3D3' },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 20,
    color: '#000',
  },
  input: {
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: { marginLeft: 8, fontSize: 14, color: '#333' },
  dropdown: {
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    padding: 14,
    marginTop: 8,
    position: 'relative',
  },
  button: {
    backgroundColor: '#A52A2A',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  errorText: {
    fontSize: 13,
    color: '#A52A2A',
    marginTop: 4,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '85%',
    maxHeight: '75%',
    paddingVertical: 20,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  modalText: { marginLeft: 10, fontSize: 16, color: '#000' },
  modalClose: { alignItems: 'center', marginTop: 10 },
  modalCloseText: { fontSize: 16, fontWeight: 'bold', color: '#A52A2A' },
  successModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    width: '85%',
  },
  successIcon: {
    width: 80,
    height: 80,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 16,
  },
  successText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 12,
    textAlign: 'center',
  },
  successButton: {
    backgroundColor: '#27AE60',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginTop: 10,
  },
  successButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#f6f6f6',
    color: '#000',
    borderRadius: 8,
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#f6f6f6',
    color: '#000',
    borderRadius: 8,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 14,
  },
});