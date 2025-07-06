import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

const QuoteGeneratedScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    insuranceProduct = 'N/A',
    vehicleReg = 'N/A',
    valuation = '0',
    year = 'N/A',
    make = 'N/A',
    model = 'N/A',
    windscreen = 'N/A',
    radio = 'N/A',
    selectedProvider = 'N/A',
    selectedAddOns = {},
    selectedTopUps = {},
    filterType = 'All',
  } = route.params || {};

  const timestamp = new Date().toLocaleString('en-GB');

  const quoteText = `
🚗 Insurance Quote
Provider: ${selectedProvider}
Product: ${insuranceProduct}
Vehicle: ${make} ${model} (${year}) - Reg: ${vehicleReg}
Valuation: KES ${valuation}
Windscreen: ${windscreen}
Radio: ${radio}

✅ Optional Add-ons:
${Object.keys(selectedAddOns).filter((k) => selectedAddOns[k]).join('\n') || 'None'}

🔼 Top-ups:
${Object.keys(selectedTopUps).filter((k) => selectedTopUps[k]).join('\n') || 'None'}

🕒 Generated: ${timestamp}
`;

  const calculatePremium = () => {
    return `KES ${parseInt(valuation).toLocaleString('en-US')}.00 (gross)`;
  };

  const newQuote = {
    plate: vehicleReg,
    reg: vehicleReg,
    provider: selectedProvider,
    insuranceProduct,
    valuation,
    year,
    premium: calculatePremium(),
    date: new Date().toLocaleDateString('en-GB'),
    applied: false,
  };

  const handleApplyNow = () => {
    navigation.navigate('VehicleComprehensive6', {
      vehicleReg,
      year,
      valuation,
      selectedProvider,
      insuranceProduct,
      selectedAddOns,
      selectedTopUps,
    });
  };

  const handleGoBack = () => {
    navigation.navigate('MainTabs', {
      screen: 'Quotations',
      params: {
        newQuote,
        fromView: true,
        filterType,
      },
    });
  };

  const handleExit = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'MainTabs',
          state: {
            routes: [
              {
                name: 'Quotations',
                params: {
                  newQuote,
                  fromView: true,
                  filterType,
                },
              },
            ],
          },
        },
      ],
    });
  };

  const handleViewQuote = () => {
    navigation.navigate('ViewQuoteScreen', {
      vehicleReg,
      year,
      valuation,
      selectedProvider,
      insuranceProduct,
      filterType,
    });
  };

  const handleDownloadQuote = () => {
    Alert.alert('Download Quote', 'This would trigger download (PDF/Print feature)');
  };

  const handleShareQuote = async () => {
    try {
      await Share.share({ message: quoteText });
    } catch (error) {
      Alert.alert('Error', `Failed to share quote: ${error.message}`);
    }
  };

  const actions = [
    { title: 'Download Quote', icon: 'download', onPress: handleDownloadQuote },
    { title: 'View Quote', icon: 'eye', onPress: handleViewQuote },
    { title: 'Share Quote', icon: 'share-social', onPress: handleShareQuote },
  ];

  const renderActionButton = (item) => (
    <TouchableOpacity style={styles.actionButton} onPress={item.onPress}>
      <Ionicons name={item.icon} size={24} color="#000" />
      <Text style={styles.actionButtonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={[
        { key: 'successMessage', type: 'message' },
        { key: 'applyNow', type: 'button' },
        { key: 'actions', type: 'actions' },
        { key: 'goBack', type: 'button' },
        { key: 'exit', type: 'button' },
      ]}
      renderItem={({ item }) => {
        switch (item.type) {
          case 'message':
            return (
              <View style={styles.successMessageContainer}>
                <Ionicons name="rocket" size={50} color="#EB5757" />
                <Text style={styles.successMessage}>Quote Generated Successfully!</Text>
                <Text style={styles.timestamp}>{timestamp}</Text>
              </View>
            );
          case 'button':
            return (
              <TouchableOpacity
                style={item.key === 'applyNow' ? styles.applyNowButton : styles.redButton}
                onPress={item.key === 'applyNow' ? handleApplyNow : item.key === 'goBack' ? handleGoBack : handleExit}
              >
                <Text style={styles.applyNowButtonText}>{item.key === 'applyNow' ? 'Apply Now' : item.key === 'goBack' ? 'Go back to Quotations' : 'Exit'}</Text>
              </TouchableOpacity>
            );
          case 'actions':
            return (
              <View style={styles.actionsContainer}>
                {actions.map(renderActionButton)}
              </View>
            );
          default:
            return null;
        }
      }}
      keyExtractor={(item) => item.key}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  redButton: {
    backgroundColor: '#EB5757', // Red color for Go Back and Exit buttons
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginBottom: 20,
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
    flex: 1,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    textAlign: 'center',
  },
  goBackButton: {
    backgroundColor: '#EB5757', // Red color for Go Back button
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginBottom: 20,
  },
  exitButton: {
    backgroundColor: '#EB5757', // Red color for Exit button
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
});

export default QuoteGeneratedScreen;
