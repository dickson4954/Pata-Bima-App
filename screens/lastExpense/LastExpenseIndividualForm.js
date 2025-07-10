import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const underwritersOptions = ['AAR', 'CIC', 'Jubilee', 'Britam', 'APA'];

const LastExpenseIndividualForm = () => {
  const navigation = useNavigation();

  const [age, setAge] = useState('');
  const [coverLimit, setCoverLimit] = useState('');
  const [selectedUnderwriters, setSelectedUnderwriters] = useState([]);
  const [underwriterModalVisible, setUnderwriterModalVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const toggleUnderwriter = (item) => {
    if (selectedUnderwriters.includes(item)) {
      setSelectedUnderwriters(selectedUnderwriters.filter(u => u !== item));
    } else if (selectedUnderwriters.length < 3) {
      setSelectedUnderwriters([...selectedUnderwriters, item]);
    }
  };

  const isFormValid = age && coverLimit && selectedUnderwriters.length > 0;

  const handleApply = () => {
    if (isFormValid) {
      setShowSuccessModal(true);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Last Expense</Text>
      </View>

      {/* Step Indicator */}
      <View style={styles.stepRow}>
        <View style={styles.stepCircle}><Text style={styles.stepNumber}>1</Text></View>
        <View style={styles.stepCircle}><Text style={styles.stepNumber}>2</Text></View>
        <Text style={styles.stepLabel}>Policy Details</Text>
      </View>

      {/* Age Input */}
      <Text style={styles.label}>Client Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      {/* Cover Limit */}
      <Text style={styles.label}>Cover Limit</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter cover limit"
        keyboardType="numeric"
        value={coverLimit}
        onChangeText={setCoverLimit}
      />

      {/* Underwriters Dropdown */}
      <Text style={styles.label}>Preferred Underwriters</Text>
      <TouchableOpacity
        style={styles.dropdownWrapper}
        onPress={() => setUnderwriterModalVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {selectedUnderwriters.length > 0
            ? selectedUnderwriters.join(', ')
            : 'Select preferred underwriters'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#000" />
      </TouchableOpacity>

      {/* Underwriters Modal */}
      <Modal visible={underwriterModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: width * 0.9 }]}>
            <Text style={styles.modalTitle}>Select up to 3 underwriters</Text>
            <FlatList
              data={underwritersOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => toggleUnderwriter(item)}
                  style={styles.modalItem}
                >
                  <Ionicons
                    name={selectedUnderwriters.includes(item) ? 'checkbox' : 'square-outline'}
                    size={22}
                    color="#E30613"
                    style={{ marginRight: 10 }}
                  />
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setUnderwriterModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Apply Policy Button */}
      <TouchableOpacity
        style={[styles.applyButton, !isFormValid && { backgroundColor: '#ccc' }]}
        disabled={!isFormValid}
        onPress={handleApply}
      >
        <Text style={styles.applyButtonText}>Apply Policy</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.successModal, { width: width * 0.9 }]}>
            <Image 
              source={require('../../assets/celebrate.png')} 
              style={styles.successIcon} 
            />
            <Text style={styles.successTitle}>Policy Application</Text>
            <Text style={styles.successText}>
              Last Expense request was successfully submitted
            </Text>
          
            <View style={styles.underwritersContainer}>
             
             
            </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#E30613',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  stepNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E30613',
  },
  label: {
    marginTop: 10,
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  dropdownWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 30,
  },
  dropdownText: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  applyButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#E30613',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  modalItemText: {
    fontSize: 16,
  },
  modalCloseBtn: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#E30613',
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  successModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  successIcon: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 6,
    textAlign: 'center',
  },
  underwritersContainer: {
    width: '100%',
    marginVertical: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
  },
  underwritersLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  underwritersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  underwriterItem: {
    fontSize: 16,
    color: '#555',
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 4,
    backgroundColor: '#eee',
    borderRadius: 4,
  },
  successButton: {
    backgroundColor: '#27AE60',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 16,
  },
  successButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LastExpenseIndividualForm;