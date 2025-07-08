import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';

const VehicleComprehensive6 = ({ navigation }) => {
  const route = useRoute();
  const { insuranceProduct = 'New Motor Vehicle Insurance' } = route.params || {};

  const documents = [
    'National ID',
    'KRA PIN',
    'Logbook',
    'Debit Note',
    'Issued Certificate',
  ];

  const [uploadedDocs, setUploadedDocs] = useState({});

  const pickDocument = async (docName) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ 
        type: '*/*',
        copyToCacheDirectory: true
      });
      
      console.log('Document Picker Result:', result);
      
      if (result && !result.canceled && result.assets && result.assets.length > 0) {
        setUploadedDocs(prev => ({
          ...prev,
          [docName]: {
            uploaded: true,
            uri: result.assets[0].uri,
            name: result.assets[0].name
          }
        }));
      }
    } catch (err) {
      console.log('Document pick error:', err);
    }
  };

  const deleteDocument = (docName) => {
    setUploadedDocs(prev => ({
      ...prev,
      [docName]: {
        uploaded: false,
        uri: null,
        name: null
      }
    }));
  };

  const allDocumentsUploaded = documents.every(doc => uploadedDocs[doc]?.uploaded);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>{insuranceProduct}</Text>
        </View>

        {/* KYC + Steps */}
        <View style={styles.kycRow}>
          <Text style={styles.kycText}>KYC Documents</Text>
          <View style={styles.stepsContainer}>
            <View style={styles.activeStep}><Text style={styles.stepText}>1</Text></View>
            <View style={styles.inactiveStep}><Text style={styles.stepText}>2</Text></View>
            <View style={styles.inactiveStep}><Text style={styles.stepText}>3</Text></View>
          </View>
        </View>
      </View>

      {/* Upload Section */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Debit Note Documents</Text>
        <Text style={styles.uploadTitle}>Upload Documents</Text>
        <Text style={styles.uploadSubtitle}>
          Please upload the required debit note documents below.
        </Text>

        {documents.map((doc) => (
          <View key={doc} style={styles.documentRow}>
            <View style={styles.iconContainer}>
              {uploadedDocs[doc]?.uploaded ? (
                <>
                  <Ionicons name="checkmark-circle" size={24} color="#FF0000" />
                  {uploadedDocs[doc]?.uri && (
                    <Image 
                      source={{ uri: uploadedDocs[doc].uri }} 
                      style={styles.previewImage}
                    />
                  )}
                </>
              ) : (
                <Ionicons name="cloud-upload-outline" size={24} color="#FF0000" />
              )}
            </View>
            <Text style={styles.documentText}>{doc}</Text>
            <TouchableOpacity
              style={styles.attachButton}
              onPress={() => pickDocument(doc)}
            >
              <Text style={styles.attachText}>
                {uploadedDocs[doc]?.uploaded ? 'Re-upload Document' : 'Attach Document'}
              </Text>
            </TouchableOpacity>
            {uploadedDocs[doc]?.uploaded && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteDocument(doc)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: allDocumentsUploaded ? '#E30613' : '#E0E0E0' }]}
          onPress={() => {
            if (allDocumentsUploaded) {
              navigation.navigate('VehicleComprehensive8', {
                ...route.params,
                uploadedDocuments: uploadedDocs
              });
            }
          }}
          disabled={!allDocumentsUploaded}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  kycRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  kycText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  stepsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  activeStep: {
    backgroundColor: '#FF0000',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveStep: {
    backgroundColor: '#F2F2F2',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 20,
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  uploadSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 20,
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  iconContainer: {
    width: 36,
    height: 36,
    backgroundColor: '#FFE5E5',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  documentText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  attachButton: {
    borderWidth: 1,
    borderColor: '#FF0000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  attachText: {
    color: '#FF0000',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteText: {
    color: '#FF0000',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomButtonContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  nextButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  previewImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    right: -5,
    bottom: -5,
  }
});

export default VehicleComprehensive6;
