import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const insuranceProducts = [
  { label: 'Vehicle Insurance', icon: 'car-sport-outline' },
  { label: 'Medical Insurance', icon: 'medkit-outline' },
  { label: 'WIBA Insurance', icon: 'briefcase-outline' },
  { label: 'Last Expense', icon: 'heart-outline' },
  { label: 'Travel Insurance', icon: 'airplane-outline' },
  { label: 'Personal Accident', icon: 'body-outline' },
  { label: 'Professional Indemnity', icon: 'briefcase-outline' },
  { label: 'Domestic Package', icon: 'home-outline' },
];

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Extensions');

  const handleProductPress = (product) => {
    if (product === 'Vehicle Insurance') {
      navigation.navigate('VehicleInsurance1');
    }
     if (product === 'Medical Insurance') {
      navigation.navigate('MedicalInsurance1');
    }
    if (product === 'WIBA Insurance') {
      navigation.navigate('WibaInsurance1');
    }
    if (product === 'Last Expense') {
      navigation.navigate('LastExpenseInsurance1');
    }
    if (product === 'Travel Insurance') {
      navigation.navigate('TravelInsurance1');
    }
    if (product === 'Professional Indemnity') {
      navigation.navigate('ProfessionalIndemnity1');
    }
    if (product === 'Domestic Package') {
      navigation.navigate('DomesticPackage1');
    }
  };

  const renderExtensions = () => (
    <View style={styles.extensionsList}>
      {['KBH123B', 'KDA456X'].map((plate) => (
        <View
          key={plate}
          style={[styles.extensionCard, { backgroundColor: '#F8D7DA' }]}
        >
          <View style={styles.extensionRow}>
            <View>
              <Text style={[styles.policyNumber, { color: '#E30613' }]}>{plate}</Text>
              <Text style={styles.policyType}>
                {plate === 'KBH123B' ? 'Comprehensive' : 'Third Party'}
              </Text>
            </View>
            <TouchableOpacity style={styles.renewButton}>
              <Text style={styles.renewText}>Renew</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderRenewals = () => (
    <View style={styles.extensionsList}>
      <View style={[styles.extensionCard, { backgroundColor: '#F8D7DA' }]}>
        <View style={styles.extensionRow}>
          <View>
            <Text style={[styles.policyNumber, { color: '#E30613' }]}>KCE987G</Text>
            <Text style={styles.policyType}>Comprehensive</Text>
          </View>
          <TouchableOpacity style={styles.renewButton}>
            <Text style={styles.renewText}>Renew</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const pages = chunkArray(insuranceProducts, 4);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>K</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Good Afternoon</Text>
            <Text style={styles.username}>Kelvin Kahoi</Text>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Today</Text>
              <Text style={styles.statsLabel}>Since Last Commission</Text>
            </View>
          </View>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </View>

        {/* My Sales Card */}
        <View style={styles.mySalesCard}>
          <View style={styles.mySalesTop}>
            <View style={styles.topStatsRow}>
              <View>
                <Text style={styles.mySalesTitle}>My Sales</Text>
                <Text style={styles.statsTitle}>Kes. 0</Text>
              </View>
              <View>
                <Text style={styles.statsTitle}>1 Day</Text>
              </View>
            </View>
          </View>

          <View style={styles.mySalesBottom}>
            <View style={styles.salesInfoRowFlat}>
              <View>
                <Text style={styles.salesInfoLabelBlack}>Next Commission Date</Text>
                <Text style={styles.salesInfoValueBlack}>Wed, Jul 16</Text>
              </View>
              <View>
                <Text style={styles.salesInfoLabelBlack}>Policies Sold</Text>
                <Text style={styles.salesInfoValueBlack}>0</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Insurance Products */}
        <Text style={styles.sectionTitle}>Insurance Products</Text>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {pages.map((group, index) => (
            <View key={index} style={styles.productPage}>
              {group.map((product, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.productBox}
                  onPress={() => handleProductPress(product.label)}
                >
                  <Ionicons name={product.icon} size={28} color="#E30613" />
                  <Text style={styles.productText}>{product.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>

        {/* Campaigns */}
        <Text style={styles.sectionTitle}>Campaigns</Text>
        <View style={{ height: 100 }} />

        {/* Upcoming Renewals */}
        <Text style={styles.sectionTitle}>Upcoming Renewals</Text>
        <View style={styles.toggleTabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Renewals' ? styles.activeTab : styles.inactiveTab]}
            onPress={() => setActiveTab('Renewals')}
          >
            <Text style={activeTab === 'Renewals' ? styles.activeTabText : styles.inactiveTabText}>
              Renewals (0)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Extensions' ? styles.activeTab : styles.inactiveTab]}
            onPress={() => setActiveTab('Extensions')}
          >
            <Text style={activeTab === 'Extensions' ? styles.activeTabText : styles.inactiveTabText}>
              Extensions (0)
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'Extensions' ? renderExtensions() : renderRenewals()}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 30, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  greeting: { fontSize: 14, color: '#555' },
  username: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  statsRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 4,
  },
  statsLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#333',
  },
  mySalesCard: {
    marginHorizontal: 15,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  mySalesTop: {
    backgroundColor: '#E30613',
    padding: 15,
  },
  mySalesBottom: {
    backgroundColor: '#fff',
    padding: 15,
  },
  topStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mySalesTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  salesInfoRowFlat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  salesInfoLabelBlack: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 2,
  },
  salesInfoValueBlack: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
    sectionTitle: {
    marginHorizontal: 15,
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  productPage: {
    width: screenWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  productBox: {
    width: screenWidth / 2.5,
    marginVertical: 10,
    alignItems: 'center',
  },
  productText: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  },
  toggleTabs: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
    justifyContent: 'space-around',
  },
  tab: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  activeTab: {
    backgroundColor: '#E30613',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  inactiveTab: {
    backgroundColor: '#E0E0E0',
  },
  inactiveTabText: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 14,
  },
  extensionsList: {
    marginHorizontal: 15,
  },
  extensionCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  extensionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  policyNumber: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  policyType: {
    fontSize: 12,
    color: '#666',
  },
  renewButton: {
    backgroundColor: '#E30613',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  renewText: { color: 'white', fontWeight: 'bold' },
});
