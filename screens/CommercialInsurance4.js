import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const KYCDetails = () => {
  const navigation = useNavigation();
  const [documents, setDocuments] = useState({
    nationalID: { checked: false, attached: false },
    kraPIN: { checked: false, attached: false },
    logbook: { checked: false, attached: false }
  });

  const handleNext = () => {
    navigation.navigate('NextScreen');
  };

  const toggleCheckbox = (doc) => {
    setDocuments({
      ...documents,
      [doc]: {
        ...documents[doc],
        checked: !documents[doc].checked
      }
    });
  };

  const toggleAttachment = (doc) => {
    setDocuments({
      ...documents,
      [doc]: {
        ...documents[doc],
        attached: !documents[doc].attached
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.mainHeader}>KYC Details</Text>
      <Text style={styles.subHeader}>KYC Details</Text>

      {/* Upload Documents Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Upload Documents</Text>
        <Text style={styles.instructionText}>Please upload all the documents listed below</Text>

        {/* Document List */}
        <View style={styles.documentList}>
          {/* National ID */}
          <View style={styles.documentItem}>
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => toggleCheckbox('nationalID')}
            >
              <View style={[styles.checkbox, documents.nationalID.checked && styles.checked]}>
                {documents.nationalID.checked && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.documentLabel}>National ID</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleAttachment('nationalID')}>
              <Text style={[styles.attachmentText, documents.nationalID.attached && styles.attached]}>
                {documents.nationalID.attached ? 'Attached documents' : 'Attach documents'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* KRA PIN */}
          <View style={styles.documentItem}>
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => toggleCheckbox('kraPIN')}
            >
              <View style={[styles.checkbox, documents.kraPIN.checked && styles.checked]}>
                {documents.kraPIN.checked && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.documentLabel}>KRA PIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleAttachment('kraPIN')}>
              <Text style={[styles.attachmentText, documents.kraPIN.attached && styles.attached]}>
                {documents.kraPIN.attached ? 'Attached documents' : 'Attach documents'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Logbook */}
          <View style={styles.documentItem}>
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => toggleCheckbox('logbook')}
            >
              <View style={[styles.checkbox, documents.logbook.checked && styles.checked]}>
                {documents.logbook.checked && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.documentLabel}>Logbook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleAttachment('logbook')}>
              <Text style={[styles.attachmentText, documents.logbook.attached && styles.attached]}>
                {documents.logbook.attached ? 'Attached documents' : 'Attach documents'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flexGrow: 1,
  },
  mainHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  documentList: {
    marginLeft: 10,
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
  },
  documentLabel: {
    fontSize: 16,
    color: '#000',
  },
  attachmentText: {
    color: '#007AFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  attached: {
    color: '#4CAF50',
    textDecorationLine: 'none',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default KYCDetails;