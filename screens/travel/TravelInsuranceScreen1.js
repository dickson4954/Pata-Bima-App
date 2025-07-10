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
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const purposeOptions = ['Leisure', 'Business', 'Education', 'Medical', 'Other'];
const underwritersOptions = ['AAR', 'CIC', 'Jubilee', 'Britam', 'APA'];

const TravelInsuranceForm = () => {
  const navigation = useNavigation();

  const [clientName, setClientName] = useState('');
  const [age, setAge] = useState('');
  const [destination, setDestination] = useState('');
  const [purpose, setPurpose] = useState('');
  const [showPurposeModal, setShowPurposeModal] = useState(false);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [returnDate, setReturnDate] = useState(new Date());
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [selectedUnderwriters, setSelectedUnderwriters] = useState([]);
  const [showUnderwritersModal, setShowUnderwritersModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleUnderwriter = (item) => {
    if (selectedUnderwriters.includes(item)) {
      setSelectedUnderwriters(selectedUnderwriters.filter(u => u !== item));
    } else if (selectedUnderwriters.length < 3) {
      setSelectedUnderwriters([...selectedUnderwriters, item]);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isFormValid = clientName && age && destination && purpose && departureDate && returnDate && selectedUnderwriters.length > 0;

  const handleApply = () => {
    if (isFormValid) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccessModal(true);
      }, 1500);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header with back icon */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Travel Insurance</Text>
      </View>

      {/* Policy Details Section with step indicator */}
      <View style={styles.sectionHeader}>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepNumber}>1</Text>
        </View>
        <Text style={styles.sectionTitle}>Policy Details</Text>
      </View>

      {/* Client Name */}
      <Text style={styles.label}>Client Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter traveler's full name"
        value={clientName}
        onChangeText={setClientName}
      />

      {/* Traveler's Age */}
      <Text style={styles.label}>Traveler's Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      {/* Destination */}
      <Text style={styles.label}>Destination</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter destination country/region"
        value={destination}
        onChangeText={setDestination}
      />

      {/* Purpose of Travel */}
      <Text style={styles.label}>Purpose of Travel</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowPurposeModal(true)}
      >
        <Text style={purpose ? styles.inputText : styles.placeholderText}>
          {purpose || 'Select purpose of travel'}
        </Text>
      </TouchableOpacity>

      {/* Purpose Modal */}
      <Modal visible={showPurposeModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Purpose of Travel</Text>
            <FlatList
              data={purposeOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setPurpose(item);
                    setShowPurposeModal(false);
                  }}
                  style={styles.modalItem}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowPurposeModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Departure Date */}
      <Text style={styles.label}>Departure Date</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDeparturePicker(true)}
      >
        <Text style={styles.inputText}>
          {formatDate(departureDate)}
        </Text>
      </TouchableOpacity>
      {showDeparturePicker && (
        <DateTimePicker
          value={departureDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDeparturePicker(false);
            if (selectedDate) {
              setDepartureDate(selectedDate);
            }
          }}
        />
      )}

      {/* Return Date */}
      <Text style={styles.label}>Return Date</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowReturnPicker(true)}
      >
        <Text style={styles.inputText}>
          {formatDate(returnDate)}
        </Text>
      </TouchableOpacity>
      {showReturnPicker && (
        <DateTimePicker
          value={returnDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowReturnPicker(false);
            if (selectedDate) {
              setReturnDate(selectedDate);
            }
          }}
        />
      )}

      {/* Preferred Underwriters */}
      <Text style={styles.label}>Preferred Underwriters</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowUnderwritersModal(true)}
      >
        <Text style={selectedUnderwriters.length > 0 ? styles.inputText : styles.placeholderText}>
          {selectedUnderwriters.length > 0 ? selectedUnderwriters.join(', ') : 'Select preferred underwriters'}
        </Text>
      </TouchableOpacity>

      {/* Underwriters Modal */}
      <Modal visible={showUnderwritersModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
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
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowUnderwritersModal(false)}
            >
              <Text style={styles.modalCloseText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Apply Policy Button */}
      <TouchableOpacity
        style={[styles.applyButton, !isFormValid && { backgroundColor: '#ccc' }]}
        disabled={!isFormValid || isLoading}
        onPress={handleApply}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.applyButtonText}>Apply Policy</Text>
        )}
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.successModalOverlay}>
          <View style={styles.successModal}>
            <Image 
              source={require('../../assets/celebrate.png')}
              style={styles.successImage}
            />
            <Text style={styles.successTitle}>Policy Application</Text>
            <Text style={styles.successText}>
              Travel Insurance request was successfully submitted
            </Text>
            
            <View style={styles.successDetails}>
              
            </View>

            <TouchableOpacity
              style={styles.successButton}
              onPress={closeSuccessModal}
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
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 8,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E30613',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E30613',
  },
  label: {
    marginTop: 15,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 10,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
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
    borderRadius: 10,
    width: '80%',
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  modalCloseBtn: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#E30613',
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  applyButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#E30613',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
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

export default TravelInsuranceForm;