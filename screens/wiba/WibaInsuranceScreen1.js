import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Modal, Image, ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker'; // Use expo-document-picker

const underwritersOptions = ['AAR', 'CIC', 'Jubilee', 'Britam', 'APA'];

const WibaInsuranceScreen1 = ({ navigation }) => {
  const [companyName, setCompanyName] = useState('');
  const [departments, setDepartments] = useState([
    { name: '', count: '', salary: '', id: Date.now() }
  ]);
  const [selectedUnderwriters, setSelectedUnderwriters] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // Will store file details
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [underwriterModalVisible, setUnderwriterModalVisible] = useState(false);


  const addDepartment = () => {
    setDepartments([...departments, { name: '', count: '', salary: '', id: Date.now() }]);
  };

  const removeDepartment = (id) => {
    setDepartments(departments.filter((d) => d.id !== id));
  };

  const updateDepartment = (index, field, value) => {
    const updated = [...departments];
    updated[index][field] = value;
    setDepartments(updated);
  };

  const handleUnderwriterChange = (val) => {
    if (selectedUnderwriters.includes(val)) {
      setSelectedUnderwriters(selectedUnderwriters.filter(u => u !== val));
    } else if (selectedUnderwriters.length < 3) {
      setSelectedUnderwriters([...selectedUnderwriters, val]);
    }
  };

  const isFormValid = companyName && departments.some(d => d.count && d.name && d.salary) && selectedFile; // Include file validation

  const handleApply = () => {
    if (!isFormValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const handleFilePick = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: 'image/*', // Restrict to images only
      });
      if (file.assets && file.assets.length > 0) {
        setSelectedFile(file.assets[0]); // Store the first selected image
      }
    } catch (err) {
      console.log('Error picking file:', err);
    }
  };

  const handleDeleteFile = () => {
    setSelectedFile(null); // Reset selected file
  };

  const totalEmployees = departments.reduce((sum, dept) => sum + (parseInt(dept.count) || 0), 0);
  const totalAnnualSalary = departments.reduce((sum, dept) => sum + (parseInt(dept.salary) || 0), 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>WIBA Insurance</Text>
      </View>

      {/* Step Indicator */}
      <View style={styles.stepHeader}>
        <View style={styles.stepCircle}>
          <Text style={styles.stepNumber}>1</Text>
        </View>
        <Text style={styles.stepText}>Policy Details</Text>
      </View>

      {/* Company Name */}
      <Text style={styles.label}>Company Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter company name"
        value={companyName}
        onChangeText={setCompanyName}
      />

      {/* Department Details */}
      <Text style={styles.label}>Department Details</Text>
      {departments.map((dept, index) => (
        <View key={dept.id} style={styles.departmentCard}>
          <TouchableOpacity onPress={() => removeDepartment(dept.id)} style={styles.closeIcon}>
            <Ionicons name="close-circle-outline" size={20} color="#E30613" />
          </TouchableOpacity>

          <Text style={styles.fieldLabel}>Department Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter department name"
            value={dept.name}
            onChangeText={(val) => updateDepartment(index, 'name', val)}
          />

          <Text style={styles.fieldLabel}>Employee Count</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="numeric"
            value={dept.count}
            onChangeText={(val) => updateDepartment(index, 'count', val)}
          />

          <Text style={styles.fieldLabel}>Total Annual Salary</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="numeric"
            value={dept.salary}
            onChangeText={(val) => updateDepartment(index, 'salary', val)}
          />
        </View>
      ))}

      {/* Add Department */}
      <TouchableOpacity style={styles.addBtn} onPress={addDepartment}>
        <Text style={styles.addBtnText}>Add Department</Text>
      </TouchableOpacity>

      {/* Employee File Upload */}
      <View style={styles.fileUpload}>
        <View style={styles.fileIconBox}>
          {selectedFile ? (
            <Image
              source={{ uri: selectedFile.uri }}
              style={styles.selectedImage}
            />
          ) : (
            <Ionicons name="cloud-upload-outline" size={20} color="#E30613" />
          )}
          <Text style={styles.fileLabel}>Employee Details</Text>
        </View>
        <TouchableOpacity
          style={styles.selectFileBtn}
          onPress={selectedFile ? handleDeleteFile : handleFilePick}
          disabled={selectedFile === null && loading}
        >
          <Text style={styles.selectFileText}>
            {selectedFile ? 'Delete' : 'Select a file'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Underwriters */}
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


<Modal visible={underwriterModalVisible} transparent animationType="slide">
  <View style={styles.modalOverlay}>
    <View style={styles.successModal}>
      <Text style={styles.successTitle}>Select up to 3 underwriters</Text>
      {underwritersOptions.map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => handleUnderwriterChange(item)}
          style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}
        >
          <Ionicons
            name={selectedUnderwriters.includes(item) ? 'checkbox' : 'square-outline'}
            size={22}
            color="#E30613"
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 14 }}>{item}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.successButton}
        onPress={() => setUnderwriterModalVisible(false)}
      >
        <Text style={styles.successButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

     

      {/* Apply Button */}
      <TouchableOpacity
        style={[styles.applyButton, !isFormValid && { backgroundColor: '#ccc' }]}
        disabled={!isFormValid || loading}
        onPress={handleApply}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.applyButtonText}>Apply Policy</Text>}
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <Image source={require('../../assets/celebrate.png')} style={styles.successIcon} />
            <Text style={styles.successTitle}>Policy Application</Text>
            <Text style={styles.successText}>
              WIBA Insurance request was successfully submitted
            </Text>
            <Text style={styles.successText}>
              Company Name: {companyName || 'N/A'}
            </Text>
            <Text style={styles.successText}>
              Total Employees: {totalEmployees || '0'}
            </Text>
            <Text style={styles.successText}>
              Total Annual Salary: {totalAnnualSalary || '0'}
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

export default WibaInsuranceScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#000',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
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
    fontWeight: 'bold',
  },
  stepText: {
    color: '#E30613',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
  label: {
    marginTop: 15,
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
  },
  departmentCard: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fafafa',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 2,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  addBtn: {
    borderWidth: 1,
    borderColor: '#E30613',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 15,
  },
  addBtnText: {
    color: '#E30613',
    fontWeight: 'bold',
  },
  fileUpload: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  fileIconBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileLabel: {
    color: '#000',
    marginLeft: 5,
  },
  selectFileBtn: {
    borderWidth: 1,
    borderColor: '#E30613',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  selectFileText: {
    color: '#E30613',
  },
  selectedImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  dropdownWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
  },
  dropdownText: {
    fontSize: 14,
    paddingVertical: 10,
    color: '#000',
  },
  selectedText: {
    marginTop: 5,
    color: '#555',
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
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