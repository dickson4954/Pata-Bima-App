import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Modal, FlatList, ScrollView,
  KeyboardAvoidingView, Platform
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const years = Array.from({ length: 40 }, (_, i) => `${new Date().getFullYear() - i}`);
const carMakesWithModels = {
  Toyota: ['Corolla', 'Hilux', 'Prado', 'RAV4'],
  Honda: ['Civic', 'CR-V', 'Accord'],
  BMW: ['X1', 'X3', '320i'],
  Nissan: ['Navara', 'Note', 'X-Trail'],
  Subaru: ['Impreza', 'Forester', 'Outback'],
  Mercedes: ['C200', 'E300', 'GLA'],
};

const formatNumberWithCommas = (num) => num.replace(/[^\d]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const VehicleComprehensive3 = ({ navigation }) => {
  const route = useRoute();
  const { insuranceProduct, vehicleType } = route.params || {};

  const [option, setOption] = useState('quotation');
  const [financialInterest, setFinancialInterest] = useState(null);
  const [vehicleIdType, setVehicleIdType] = useState('registration');

  const [vehicleReg, setVehicleReg] = useState('');
  const [valuation, setValuation] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [tonnage, setTonnage] = useState('');
  const [passengers, setPassengers] = useState('');
  const [windscreen, setWindscreen] = useState('');
  const [radio, setRadio] = useState('');

  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMakePicker, setShowMakePicker] = useState(false);
  const [showModelPicker, setShowModelPicker] = useState(false);

  const needsMakeModel = ['Private', 'PSV'].includes(vehicleType);
  const needsTonnage = ['Commercial', 'Special Classes', 'TukTuk'].includes(vehicleType);
  const needsPassengers = vehicleType === 'PSV';
  const needsWindscreenRadio = vehicleType !== 'Motorcycle';

  const isFormComplete = () =>
    vehicleReg && valuation && year &&
    (!needsMakeModel || (make && model)) &&
    (!needsTonnage || tonnage) &&
    (!needsPassengers || passengers);

  useEffect(() => {
    // Reset fields on vehicle type change
    setMake('');
    setModel('');
    setTonnage('');
    setPassengers('');
    if (!needsWindscreenRadio) {
      setWindscreen('');
      setRadio('');
    }
  }, [vehicleType]);

  const renderModal = (visible, data, onSelect, onClose) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSelect(item)} style={styles.modalItem}>
                <Text style={styles.modalText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={60}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.contentContainer}>
         <View style={styles.headerRow}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    <Ionicons name="arrow-back" size={24} color="#000" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>{insuranceProduct || 'Vehicle Details'}</Text>
</View>


          <View style={styles.stepRow}>
            <Text style={styles.stepLabel}>Policy Details</Text>
            <View style={styles.stepIndicators}>
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <View key={step} style={[styles.stepCircle, step === 3 && styles.activeStepCircle]}>
                  <Text style={[styles.stepText, step === 3 && styles.activeStepText]}>{step}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Option */}
          <View style={styles.formItem}>
            <Text style={styles.label}>Select an Option</Text>
            <View style={styles.radioGroup}>
              {['quotation', 'renew'].map((val) => (
                <TouchableOpacity key={val} style={styles.radioOption} onPress={() => setOption(val)}>
                  <View style={[styles.radioCircle, option === val && styles.selectedCircle]}>
                    {option === val && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioText}>{val === 'quotation' ? 'Get a Quotation' : 'Renew with us'}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Financial Interest */}
          <View style={styles.formItem}>
            <Text style={styles.label}>Financial Interest</Text>
            <View style={styles.radioGroup}>
              {['Yes', 'No'].map((val) => (
                <TouchableOpacity key={val} style={styles.radioOption} onPress={() => setFinancialInterest(val)}>
                  <View style={[styles.radioCircle, financialInterest === val && styles.selectedCircle]}>
                    {financialInterest === val && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioText}>{val}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Required Inputs */}
          <View style={styles.formItem}>
            <Text style={styles.label}>Vehicle Registration Number</Text>
            <TextInput style={styles.input} value={vehicleReg} onChangeText={setVehicleReg} placeholder="KDGXXXK" />
          </View>

          <View style={styles.formItem}>
            <Text style={styles.label}>Vehicle Valuation *</Text>
            <TextInput
              style={styles.input}
              value={valuation}
              onChangeText={(text) => setValuation(formatNumberWithCommas(text))}
              keyboardType="numeric"
              placeholder="e.g. 1,000,000"
            />
          </View>

          <View style={styles.formItem}>
            <Text style={styles.label}>Year of Manufacture *</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowYearPicker(true)}>
              <Text style={{ color: year ? '#000' : '#888' }}>{year || 'Select year'}</Text>
            </TouchableOpacity>
          </View>

          {/* Conditionally Rendered Inputs */}
          {needsMakeModel && (
            <>
              <View style={styles.formItem}>
                <Text style={styles.label}>Vehicle Make *</Text>
                <TouchableOpacity style={styles.input} onPress={() => setShowMakePicker(true)}>
                  <Text style={{ color: make ? '#000' : '#888' }}>{make || 'Select car make'}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.formItem}>
                <Text style={styles.label}>Vehicle Model *</Text>
                <TouchableOpacity style={styles.input} onPress={() => make && setShowModelPicker(true)}>
                  <Text style={{ color: model ? '#000' : '#888' }}>{model || 'Select car model'}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {needsTonnage && (
            <View style={styles.formItem}>
              <Text style={styles.label}>Vehicle Tonnage</Text>
              <TextInput
                style={styles.input}
                value={tonnage}
                onChangeText={setTonnage}
                placeholder="Enter tonnage"
                keyboardType="numeric"
              />
            </View>
          )}

          {needsPassengers && (
            <View style={styles.formItem}>
              <Text style={styles.label}>Number of Passengers</Text>
              <TextInput
                style={styles.input}
                value={passengers}
                onChangeText={setPassengers}
                placeholder="e.g. 14"
                keyboardType="numeric"
              />
            </View>
          )}

          {needsWindscreenRadio && (
            <>
              <View style={styles.formItem}>
                <Text style={styles.label}>Windscreen Value</Text>
                <TextInput
                  style={styles.input}
                  value={windscreen}
                  onChangeText={(text) => setWindscreen(formatNumberWithCommas(text))}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.formItem}>
                <Text style={styles.label}>Radio Cassette Value</Text>
                <TextInput
                  style={styles.input}
                  value={radio}
                  onChangeText={(text) => setRadio(formatNumberWithCommas(text))}
                  keyboardType="numeric"
                />
              </View>
            </>
          )}

          {/* Next */}
          <TouchableOpacity
            style={[styles.nextButton, !isFormComplete() && { opacity: 0.5 }]}
            disabled={!isFormComplete()}
            onPress={() => navigation.navigate('VehicleComprehensive4', {
              insuranceProduct, vehicleReg, valuation, year, make, model,
              windscreen, radio, tonnage, passengers, vehicleType
            })}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modals */}
      {renderModal(showYearPicker, years, (item) => { setYear(item); setShowYearPicker(false); }, () => setShowYearPicker(false))}
      {renderModal(showMakePicker, Object.keys(carMakesWithModels), (item) => { setMake(item); setModel(''); setShowMakePicker(false); }, () => setShowMakePicker(false))}
      {renderModal(showModelPicker, carMakesWithModels[make] || [], (item) => { setModel(item); setShowModelPicker(false); }, () => setShowModelPicker(false))}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
},
backButton: {
  marginRight: 10,
  justifyContent: 'center',
  alignItems: 'center',
},
headerTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#000',
},


  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  formItem: {
    marginBottom: 20,
  },
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  stepIndicators: {
    flexDirection: 'row',
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FADADD',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  activeStepCircle: {
    backgroundColor: '#EB5757',
  },
  stepText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  activeStepText: {
    color: '#fff',
  },
  stepLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 12,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#EB5757',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  selectedCircle: {
    backgroundColor: '#EB5757',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  radioText: {
    fontSize: 14,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 14,
    color: '#000',
  },
  nextButton: {
    backgroundColor: '#EB5757',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '85%',
    maxHeight: '75%',
    overflow: 'hidden',
  },
  modalItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  modalText: {
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    paddingVertical: 14,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  closeText: {
    color: '#EB5757',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default VehicleComprehensive3;