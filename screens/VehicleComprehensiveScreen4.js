import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const providers = [
  {
    id: '1',
    name: 'Old Mutual',
    price: 'KES. 300,000',
    plan: 'Basic',
    coverage: 'Inclusive of Excess Protector, Political Violence & Terrorism, Radio Cassette',
    status: 'Approval Process Manual',
  },
  {
    id: '2',
    name: 'Cannon',
    price: 'KES. 300,000',
    plan: 'Basic',
    coverage: 'Inclusive of Radio Cassette',
    status: 'Approval Process Manual',
  },
  {
    id: '3',
    name: 'Sanlam',
    price: 'KES. 300,000',
    plan: 'Basic',
    coverage: 'Approval Process Manual',
    status: 'Approval Process Manual',
  },
  {
    id: '4',
    name: 'AIG',
    price: 'KES. 300,000',
    plan: 'Basic',
    coverage: 'Inclusive of Personal Accident Cover, Windscreen, Radio Cassette, Excess Protector',
    status: 'Approval Process Manual',
  },
  {
    id: '5',
    name: 'Jubilee Allianz',
    price: 'KES. 300,000',
    plan: 'Basic',
    coverage: 'Inclusive of Personal Accident Cover, Excess Protector',
    status: 'Replenishment in Progress',
  },
];

const optionalAddOns = [
  { id: 'addon1', label: 'Loss of use 10 days', price: 'KES. 30,000' },
  { id: 'addon2', label: 'Excess Protector', price: 'KES. 25,000' },
  { id: 'addon3', label: 'Political Violence & Terrorism', price: 'KES. 25,000' },
];

const additionalTopUps = [
  { id: 'topup1', label: 'Windscreen', price: 'KES. 7,000' },
  { id: 'topup2', label: 'Radio Cassette', price: 'Included' },
];

const VehicleInsuranceScreen4 = ({ navigation }) => {
  const route = useRoute();

  const {
    insuranceProduct,
    vehicleReg,
    valuation,
    year,
    make,
    model,
    windscreen,
    radio,
  } = route.params || {};

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [selectedTopUps, setSelectedTopUps] = useState({});

  const isFormComplete = () => {
    return selectedProvider !== null;
  };

  const handleNext = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmSelection = () => {
    navigation.navigate('VehicleComprehensive5', {
      insuranceProduct,
      vehicleReg,
      valuation,
      year,
      make,
      model,
      windscreen,
      radio,
      selectedProvider,
      selectedAddOns,
      selectedTopUps,
    });
    setShowConfirmModal(false);
  };

  const toggleAddOn = (item) => {
    setSelectedAddOns((prevState) => ({
      ...prevState,
      [item.id]: !prevState[item.id],
    }));
  };

  const toggleTopUp = (item) => {
    setSelectedTopUps((prevState) => ({
      ...prevState,
      [item.id]: !prevState[item.id],
    }));
  };

  const renderProviderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.providerRow}
      onPress={() => setSelectedProvider(item.name)}
    >
      <View style={styles.providerInfo}>
        <Text style={styles.providerName}>{item.name}</Text>
        <Text style={styles.providerPrice}>{item.price}</Text>
        <Text style={styles.providerPlan}>{item.plan}</Text>
        <Text style={styles.providerCoverage}>{item.coverage}</Text>
        <Text style={styles.providerStatus}>{item.status}</Text>
      </View>
      <Ionicons
        name={selectedProvider === item.name ? 'checkmark-circle' : 'radio-button-off'}
        size={24}
        color={selectedProvider === item.name ? '#EB5757' : '#000'}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <FlatList
        contentContainerStyle={styles.container}
        data={providers}
        renderItem={renderProviderItem}
        keyExtractor={(item) => item.id} // Ensure unique key for each provider
        ListHeaderComponent={
          <>
            <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>{insuranceProduct}</Text>
            </View>

            <View style={styles.stepRow}>
              <Text style={styles.stepLabel}>Select Provider</Text>
              <View style={styles.stepIndicators}>
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <View
                    key={`step-${step}`} // Ensure unique key for each step
                    style={[styles.stepCircle, step === 4 && styles.activeStepCircle]}
                  >
                    <Text style={[styles.stepText, step === 4 && styles.activeStepText]}>
                      {step}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <Text style={styles.label}>Select a Provider</Text>
          </>
        }
        ListFooterComponent={
          <TouchableOpacity
            style={[styles.nextButton, !isFormComplete() && { opacity: 0.5 }]}
            disabled={!isFormComplete()}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        }
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={showConfirmModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Select Insurance Provider</Text>
            <Text style={styles.modalSub}>KES. 275,000 Basic</Text>
            <Text style={styles.modalLabel}>Optional Add-ons</Text>

            {optionalAddOns.map((item) => (
              <View key={item.id} style={styles.addOnRow}>
                <TouchableOpacity onPress={() => toggleAddOn(item)}>
                  <Text>{selectedAddOns[item.id] ? '☑' : '☐'} {item.label}</Text>
                </TouchableOpacity>
                <Text>{item.price}</Text>
              </View>
            ))}

            <Text style={[styles.modalLabel, { marginTop: 10 }]}>Additional Top Ups</Text>
            <Text style={styles.modalNote}>
              These items are insured up to a limit. Top up for full coverage.
            </Text>

            {additionalTopUps.map((item) => (
              <View key={item.id} style={styles.addOnRow}>
                <TouchableOpacity onPress={() => toggleTopUp(item)}>
                  <Text>{selectedTopUps[item.id] ? '☑' : '☐'} {item.label}</Text>
                </TouchableOpacity>
                <Text>{item.price}</Text>
              </View>
            ))}

            <Text style={[styles.modalTotal]}>
              Sub-Total: <Text style={{ color: '#EB5757' }}>KES 275,000</Text>
            </Text>
            <Text style={{ fontSize: 12, color: '#666', marginBottom: 20 }}>
              Exclusive of Levies Basic
            </Text>

            <TouchableOpacity 
              style={styles.nextButton}
              onPress={handleConfirmSelection}
            >
              <Text style={styles.nextButtonText}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  headerRow: {
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
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
    marginLeft: 5,
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
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  label: {
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  providerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  providerPrice: {
    fontSize: 14,
    color: '#000',
  },
  providerPlan: {
    fontSize: 12,
    color: '#777',
  },
  providerCoverage: {
    fontSize: 12,
    color: '#777',
  },
  providerStatus: {
    fontSize: 12,
    color: '#777',
  },
  nextButton: {
    backgroundColor: '#EB5757',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalSub: {
    fontSize: 14,
    marginBottom: 10,
  },
  modalLabel: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalNote: {
    fontSize: 12,
    color: '#777',
    marginBottom: 10,
  },
  addOnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  modalTotal: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default VehicleInsuranceScreen4;
