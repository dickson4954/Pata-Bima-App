import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

const QuoteGeneratedScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {
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
  } = route.params || {};

  const timestamp = new Date().toLocaleString('en-GB');

  const quoteText = `
🚗 Insurance Quote
Provider: ${selectedProvider}
Product: ${insuranceProduct}
Vehicle: ${make} ${model} (${year}) - Reg: ${vehicleReg}
Valuation: KES ${valuation}
Windscreen: ${windscreen || 'N/A'}
Radio: ${radio || 'N/A'}

✅ Optional Add-ons:
${Object.keys(selectedAddOns).filter((k) => selectedAddOns[k]).join('\n') || 'None'}

🔼 Top-ups:
${Object.keys(selectedTopUps).filter((k) => selectedTopUps[k]).join('\n') || 'None'}

🕒 Generated: ${timestamp}
`;

  const handleApplyNow = () => {
    Alert.alert('Apply Now', 'This will trigger the apply process.');
  };

  const handleGoBack = () => {
    navigation.navigate('VehicleComprehensive3');
  };

  const handleExit = () => {
    navigation.navigate('HomeScreen');
  };

  const handleViewQuote = () => {
    navigation.navigate('ViewQuoteScreen', {
      vehicleReg,
      year,
      valuation,
      selectedProvider,
      insuranceProduct,
    });
  };

  const handleDownloadQuote = () => {
    Alert.alert('Download Quote', 'This would trigger download (PDF/Print feature)');
  };

  const handleShareQuote = async () => {
    try {
      await Share.share({
        message: quoteText,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share quote.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.successMessageContainer}>
        <Ionicons name="rocket" size={50} color="#EB5757" />
        <Text style={styles.successMessage}>Quote Generated Successfully!</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>

      <TouchableOpacity style={styles.applyNowButton} onPress={handleApplyNow}>
        <Text style={styles.applyNowButtonText}>Apply Now</Text>
      </TouchableOpacity>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDownloadQuote}>
          <Ionicons name="download" size={24} color="#000" />
          <Text style={styles.actionButtonText}>Download Quote</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleViewQuote}>
          <Ionicons name="eye" size={24} color="#000" />
          <Text style={styles.actionButtonText}>View Quote</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleShareQuote}>
          <Ionicons name="share-social" size={24} color="#000" />
          <Text style={styles.actionButtonText}>Share Quote</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.goBackButtonText}>Go back to Quotations</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
        <Text style={styles.exitButtonText}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  successMessageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  successMessage: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  timestamp: {
    fontSize: 14,
    color: '#777',
  },
  applyNowButton: {
    backgroundColor: '#EB5757',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginBottom: 30,
  },
  applyNowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    textAlign: 'center',
  },
  goBackButton: {
    backgroundColor: '#F1F1F1',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginBottom: 20,
  },
  goBackButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exitButton: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  exitButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuoteGeneratedScreen;
