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
  ActivityIndicator,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const underwritersOptions = ['AAR', 'CIC', 'Jubilee', 'Britam', 'APA'];

const LastExpenseCorporateForm = () => {
  const navigation = useNavigation();

  const [companyName, setCompanyName] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [employeeAges, setEmployeeAges] = useState('');
  const [coverLimit, setCoverLimit] = useState('');
  const [selectedUnderwriters, setSelectedUnderwriters] = useState([]);
  const [underwriterModalVisible, setUnderwriterModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleUnderwriter = (item) => {
    if (selectedUnderwriters.includes(item)) {
      setSelectedUnderwriters(selectedUnderwriters.filter(u => u !== item));
    } else if (selectedUnderwriters.length < 3) {
      setSelectedUnderwriters([...selectedUnderwriters, item]);
    }
  };

  const isFormValid = companyName && employeeCount && employeeAges && coverLimit && selectedUnderwriters.length > 0;

  const handleApply = () => {
    if (isFormValid) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowSuccessModal(true);
        // Start the animation when modal shows
        Animated.timing(animation, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.back(1.7)),
          useNativeDriver: true,
        }).start();
      }, 2000);
    }
  };

  const closeSuccessModal = () => {
    // Reset animation when closing
    animation.setValue(0);
    setShowSuccessModal(false);
  };

  // Interpolate the animation for the image position
  const imagePosition = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0], // Moves from bottom (300) to center (0)
  });

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

      {/* Inputs */}
      <Text style={styles.label}>Company Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter company name"
        value={companyName}
        onChangeText={setCompanyName}
      />

      <Text style={styles.label}>Number of Employees</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of employees"
        keyboardType="numeric"
        value={employeeCount}
        onChangeText={setEmployeeCount}
      />

      <Text style={styles.label}>Employee Ages</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 25,30,35,40"
        value={employeeAges}
        onChangeText={setEmployeeAges}
      />

      <Text style={styles.label}>Cover Limit</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter cover limit"
        keyboardType="numeric"
        value={coverLimit}
        onChangeText={setCoverLimit}
      />

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
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.applyButtonText}>Apply Policy</Text>}
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <Text style={styles.successTitle}>Policy Application</Text>
            
            {/* Animated celebration image */}
            <Animated.View style={[
              styles.celebrationContainer,
              { transform: [{ translateY: imagePosition }] }
            ]}>
              <Image 
                source={require('../../assets/celebrate.png')} // Update path as needed
                style={styles.celebrationImage}
                resizeMode="contain"
              />
            </Animated.View>
            
            <Text style={styles.successText}>
              Last Expense request was successfully submitted
            </Text>
            
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
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
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
    paddingVertical: 10,
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
  successModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    width: '85%',
    alignSelf: 'center',
    marginVertical: '30%',
  },
  successTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  successText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
    textAlign: 'center',
  },
  successButton: {
    backgroundColor: '#27AE60',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginTop: 20,
  },
  successButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  celebrationContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  celebrationImage: {
    width: 150,
    height: 150,
  },
});

export default LastExpenseCorporateForm