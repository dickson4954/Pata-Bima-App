import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

const VehicleComprehensive5 = () => {
  const [policyHolderType, setPolicyHolderType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyReg, setCompanyReg] = useState('');
  const [valuer, setValuer] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleNext = () => {
    setShowModal(true);
  };

  const isFormValid =
    policyHolderType &&
    valuer &&
    ((policyHolderType === 'Individual' && idNumber) ||
      (policyHolderType === 'Corporate' && companyName && companyReg));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}>Private Comprehensive</Text>
      </View>

      {/* Step Progress */}
      <View style={styles.stepContainer}>
        {[1, 2, 3, 4, 5].map((num) => (
          <View key={num} style={styles.circle}>
            <Text style={styles.circleText}>{num}</Text>
          </View>
        ))}
        <View style={styles.circle}>
          <Text style={styles.circleText}>Policy Holder</Text>
        </View>
        <View style={[styles.circle, styles.fadedCircle]}>
          <Text style={styles.circleText}>6</Text>
        </View>
      </View>

      {/* Policy Holder Type */}
      <Text style={styles.label}>Policy Holder Type</Text>
      <View style={styles.dropdownWrapper}>
        <RNPickerSelect
          onValueChange={(value) => {
            setPolicyHolderType(value);
            setIdNumber('');
            setCompanyName('');
            setCompanyReg('');
          }}
          placeholder={{ label: 'Select Policy Holder Type', value: null }}
          items={[
            { label: 'Individual', value: 'Individual' },
            { label: 'Corporate', value: 'Corporate' },
          ]}
          style={pickerStyles}
        />
      </View>

      {/* Individual Fields */}
      {policyHolderType === 'Individual' && (
        <>
          <Text style={styles.label}>ID Number</Text>
          <View style={styles.dropdownWrapper}>
            <TextInput
              placeholder="Enter ID Number"
              value={idNumber}
              onChangeText={setIdNumber}
              keyboardType="numeric"
              style={styles.inputText}
            />
          </View>
        </>
      )}

      {/* Corporate Fields */}
      {policyHolderType === 'Corporate' && (
        <>
          <Text style={styles.label}>Company Name</Text>
          <View style={styles.dropdownWrapper}>
            <TextInput
              placeholder="Enter Company Name"
              value={companyName}
              onChangeText={setCompanyName}
              style={styles.inputText}
            />
          </View>

          <Text style={styles.label}>Company Registration No.</Text>
          <View style={styles.dropdownWrapper}>
            <TextInput
              placeholder="Enter Company Registration Number"
              value={companyReg}
              onChangeText={setCompanyReg}
              style={styles.inputText}
            />
          </View>
        </>
      )}

      {/* Valuer */}
      <Text style={styles.label}>Choose Valuer *</Text>
      <View style={styles.dropdownWrapper}>
        <RNPickerSelect
          onValueChange={(value) => setValuer(value)}
          placeholder={{ label: 'Select a Valuer', value: null }}
          items={[
            { label: 'Prima', value: 'Prima' },
            { label: 'Union Valuers', value: 'Union Valuers' },
            { label: 'Capital Alliance Valuers and Assessors', value: 'Capital Alliance' },
            { label: 'Regent', value: 'Regent' },
            { label: 'AA', value: 'AA' },
            { label: 'Ukumbi', value: 'Ukumbi' },
            { label: 'Solvit Ltd', value: 'Solvit Ltd' },
          ]}
          style={pickerStyles}
        />
      </View>

      {/* Cover Start Date */}
      <Text style={styles.label}>Cover Start Date</Text>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.datePicker}
      >
        <Text style={styles.dateText}>
          {startDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.nextBtn,
          isFormValid ? { backgroundColor: '#E30613' } : { backgroundColor: '#ccc' },
        ]}
        onPress={handleNext}
        disabled={!isFormValid}
      >
        <Text style={styles.nextBtnText}>Next</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Vehicle Has Existing Cover</Text>
            <Text style={styles.warningText}>
              Please adjust the start date of the new policy to begin after the existing cover expires
            </Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Vehicle Registration Number</Text>
              <Text style={styles.detailValue}>KDN432A</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Active Certificate Number</Text>
              <Text style={styles.detailValue}>C31029144</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Issued By</Text>
              <Text style={styles.detailValue}>GA Insurance limited</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Expiry Date</Text>
              <Text style={styles.detailValue}>31/01/2026</Text>
            </View>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#E30613' }]}
              onPress={() => {
                setShowModal(false);
                // Optionally update date
              }}
            >
              <Text style={styles.modalButtonText}>Adjust Start Date</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButtonOutline]}
              onPress={() => {
                setShowModal(false);
                // Proceed with debit note submission
              }}
            >
              <Text style={[styles.modalButtonText, { color: '#00A651' }]}>
                Submit Debit Note
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VehicleComprehensive5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  circle: {
    backgroundColor: '#E30613',
    borderRadius: 20,
    padding: 10,
    minWidth: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadedCircle: {
    backgroundColor: '#eee',
  },
  circleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },
  dropdownWrapper: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 14 : 0,
    marginBottom: 10,
  },
  inputText: {
    fontSize: 14,
    paddingVertical: 12,
    color: '#333',
  },
  datePicker: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  dateText: {
    color: '#333',
  },
  nextBtn: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  nextBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Modal Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  warningText: {
    backgroundColor: '#FFF7E6',
    color: '#8A6D3B',
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
    fontSize: 13,
  },
  detailRow: {
    marginBottom: 8,
  },
  detailLabel: {
    color: '#777',
    fontSize: 12,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  modalButton: {
    paddingVertical: 14,
    backgroundColor: '#E30613',
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  modalButtonOutline: {
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E30613',
  },
  modalButtonText: {
    fontWeight: 'bold',
    color: '#fff]',
  },
});

const pickerStyles = {
  inputIOS: {
    fontSize: 14,
    paddingVertical: 12,
    color: '#333',
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 8,
    color: '#333',
  },
};
