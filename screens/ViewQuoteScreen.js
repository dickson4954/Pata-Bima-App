import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  SafeAreaView 
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ViewQuoteScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Safely destructure with defaults
  const {
    vehicleReg = 'N/A',
    year = 'N/A',
    valuation = 'N/A',
    selectedProvider = 'N/A',
    insuranceProduct = 'N/A',
  } = route.params || {};

  // Format date and time
  const currentDateTime = new Date();
  const formattedDate = currentDateTime.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = currentDateTime.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  const quotationId = Math.floor(100000 + Math.random() * 900000);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="close" size={28} color="#EB5757" />
          </TouchableOpacity>
          <Text style={styles.title}>Quote for {vehicleReg}</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Logo and Contact Info */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/logo.png.jpg')} 
              style={styles.logo} 
              resizeMode="contain" 
            />
            <Text style={styles.companyName}>Patabima</Text>
          </View>
          
          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>Phone: +254 706 451 781</Text>
            <Text style={styles.contactText}>Email: info@patabima.co.ke</Text>
            <Text style={styles.contactText}>Website: patabima.co.ke</Text>
          </View>
        </View>

        {/* Main Content */}
        <Text style={styles.mainHeading}>
          Insurance Quotation for {selectedProvider}
        </Text>

        {/* Information Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <InfoRow label="Car Registration" value={vehicleReg} />
          <InfoRow label="Year of Manufacture" value={year} />
          <InfoRow label="Valuation" value={`KES ${valuation}`} />
          <InfoRow label="Provider" value={selectedProvider} />
          <InfoRow label="Policy" value="Private Comprehensive" />
          <InfoRow label="Date" value={`${formattedDate}, ${formattedTime}`} />
          <InfoRow label="Quotation ID" value={quotationId} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estimated Amount</Text>
          <InfoRow label="Basic Premium Amount" value="KES 252,200.00" />
          <InfoRow label="Additional Premium Options" value="KES 0.00" />
          <InfoRow label="Training Levy" value="KES 504.40" />
          <InfoRow label="Policy Holder Compensation Fund" value="KES 630.50" />
          <InfoRow label="Stamp Duty" value="KES 40.00" />
          <InfoRow 
            label="Total Premium Amount" 
            value="KES 253,375.00 (gross)" 
            bold 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Options</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Option</Text>
            <Text style={styles.tableHeaderText}>Value</Text>
            <Text style={styles.tableHeaderText}>Limit of Liability</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Windscreen</Text>
            <Text style={styles.tableCell}>KES 0.00</Text>
            <Text style={styles.tableCell}>Inclusive</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <Text style={styles.paymentText}>
            Please pay to the Below MPESA Paybill:
          </Text>
          <Text style={styles.paymentDetail}>- Paybill No: 4114079</Text>
          <Text style={styles.paymentDetail}>- Account No: {vehicleReg}</Text>
        </View>

        <View style={styles.totalAmount}>
          <Text style={styles.totalText}>
            Amount: <Text style={styles.boldText}>KES 253,375.00</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Reusable component for info rows
const InfoRow = ({ label, value, bold = false }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={[styles.infoValue, bold && styles.boldText]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EB5757',
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 28,
  },
  logoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 40,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EB5757',
    marginLeft: 10,
  },
  contactInfo: {
    alignItems: 'flex-end',
  },
  contactText: {
    fontSize: 12,
    color: '#333',
  },
  mainHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
    textDecorationLine: 'underline',
  },
  section: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EB5757',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#555',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  tableCell: {
    fontSize: 14,
    color: '#555',
  },
  paymentText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  paymentDetail: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    marginBottom: 3,
  },
  totalAmount: {
    alignItems: 'center',
    marginTop: 10,
  },
  totalText: {
    fontSize: 16,
    color: '#000',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default ViewQuoteScreen;
