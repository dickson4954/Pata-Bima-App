import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ViewQuoteScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Use fallback/default values if params are not passed properly
  const {
    vehicleReg = 'N/A',
    year = 'N/A',
    valuation = 'N/A',
    selectedProvider = 'N/A',
    insuranceProduct = 'N/A',
  } = route.params || {};

  const currentDateTime = new Date();
  const formattedDate = currentDateTime.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = currentDateTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const quotationId = Math.floor(100000 + Math.random() * 900000);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#EB5757" /> {/* Close button in red */}
        </TouchableOpacity>
        <Text style={styles.title}>Quote for Reg No: {vehicleReg}</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.logoRow}>
        {/* Logo and name on the left */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png.jpg')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.patabimaName}>Patabima</Text> {/* Name below logo in bold red */}
        </View>

        {/* Contact info on the right */}
        <View style={styles.contactRight}>
          <Text style={styles.infoText}>Phone: +254 706 451 781</Text>
          <Text style={styles.infoText}>Email: info@patabima.co.ke</Text>
          <Text style={styles.infoText}>Website: https://patabima.co.ke</Text>
        </View>
      </View>

      <Text style={styles.centerHeading}>Insurance Quotation for {selectedProvider}</Text>

      <View style={styles.sectionBox}>
        <Text style={styles.subHeader}>Basic Information</Text>
        <Text style={styles.item}>Car Registration: {vehicleReg}</Text>
        <Text style={styles.item}>Year of Manufacture: {year}</Text>
        <Text style={styles.item}>Valuation: KES {valuation}</Text>
        <Text style={styles.item}>Provider: {selectedProvider}</Text>
        <Text style={styles.item}>Policy: Private Comprehensive</Text>
        <Text style={styles.item}>Date: {formattedDate}, {formattedTime}</Text>
        <Text style={styles.item}>Quotation ID: {quotationId}</Text>
      </View>

      <View style={styles.sectionBox}>
        <Text style={styles.subHeader}>Estimated Amount</Text>
        <Text style={styles.item}>Basic Premium Amount: KES 252,200.00</Text>
        <Text style={styles.item}>Additional Premium Options: KES 0.00</Text>
        <Text style={styles.item}>Training Levy: KES 504.40</Text>
        <Text style={styles.item}>Policy Holder Compensation Fund: KES 630.50</Text>
        <Text style={styles.item}>Stamp Duty: KES 40.00</Text>
        <Text style={styles.itemBold}>Total Premium Amount: KES 253,375.00 (gross)</Text>
      </View>

      <View style={styles.sectionBox}>
        <Text style={styles.subHeader}>Options</Text>
        <View style={styles.optionRow}>
          <Text style={styles.item}>Option</Text>
          <Text style={styles.item}>Value</Text>
          <Text style={styles.item}>Limit of Liability</Text>
        </View>
        <View style={styles.optionRow}>
          <Text style={styles.item}>Windscreen</Text>
          <Text style={styles.item}>KES 0.00</Text>
          <Text style={styles.item}>Inclusive</Text>
        </View>
      </View>

      <View style={styles.sectionBox}>
        <Text style={styles.subHeader}>Payment Details</Text>
        <Text style={styles.item}>Please pay to the Below MPESA Paybill:</Text>
        <Text style={styles.item}>- Paybill No: 4114079</Text>
        <Text style={styles.item}>- Account No: Car Registration</Text>
      </View>

      <Text style={styles.amountFooter}>Amount: <Text style={{ fontWeight: 'bold' }}>KES 253,375.00</Text></Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    color: '#EB5757', // Red title
    fontWeight: 'bold',
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 40,
    marginLeft: 10,
  },
  patabimaName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EB5757', // Red color for Patabima name
    marginLeft: 10,
  },
  contactRight: {
    alignItems: 'flex-end',
  },
  infoText: {
    fontSize: 12,
    color: '#333',
  },
  centerHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  sectionBox: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  subHeader: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#EB5757', // Red color
  },
  item: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  itemBold: {
    fontSize: 14,
    color: '#000',
    marginTop: 6,
    fontWeight: 'bold',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  amountFooter: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ViewQuoteScreen;
