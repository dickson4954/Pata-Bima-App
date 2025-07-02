import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Extensions');

  const handleProductPress = (product) => {
    if (product === 'Motor Vehicle Insurance') {
      navigation.navigate('VehicleInsurance1');
    }
    // Add other product navigations as needed
  };

  const renderExtensions = () => (
    <View style={styles.extensionsList}>
      {['KBH123B', 'KDA456X'].map((plate, index) => (
        <View
          key={plate}
          style={[
            styles.extensionCard,
            { backgroundColor: '#F8D7DA' },
          ]}
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

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.username}>John Doe</Text>
          </View>
          <Ionicons name="notifications-outline" size={24} color="#E30613" />
        </View>

        {/* My Sales Card */}
        <View style={styles.salesCard}>
          <View style={styles.salesTopRow}>
            <Text style={styles.salesTitle}>My Sales</Text>
            <Text style={styles.salesPeriod}>
              Period: <Text style={styles.redText}>2 Day</Text>
            </Text>
          </View>
          <View style={styles.salesBottomRow}>
            <View>
              <Text style={styles.subLabel}>Next Commission</Text>
              <Text style={styles.redText}>Date: Tue, July 1</Text>
            </View>
            <View>
              <Text style={styles.subLabel}>Policies Sold</Text>
              <Text style={styles.redText}>2</Text>
            </View>
          </View>
        </View>

        {/* Insurance Products */}
        <Text style={styles.sectionTitle}>Section: Insurance Products</Text>
        <View style={styles.productsRow}>
          <TouchableOpacity
            style={styles.productBox}
            onPress={() => handleProductPress('Motor Vehicle Insurance')}
          >
            <Ionicons name="car-sport-outline" size={28} color="#E30613" />
            <Text style={styles.productText}>Motor Vehicle Insurance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.productBox}>
            <Ionicons name="medkit-outline" size={28} color="#E30613" />
            <Text style={styles.productText}>Medical Insurance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.productBox}>
            <Ionicons name="briefcase-outline" size={28} color="#E30613" />
            <Text style={styles.productText}>WIBA Insurance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.productBox}>
            <Ionicons name="heart-outline" size={28} color="#E30613" />
            <Text style={styles.productText}>Last Expense</Text>
          </TouchableOpacity>
        </View>

        {/* Campaigns */}
        <Text style={styles.sectionTitle}>Section: Campaigns</Text>

        {/* Spacer between Campaigns and Upcoming Extensions */}
        <View style={{ height: 70 }} />

        {/* Upcoming Extensions */}
        <Text style={styles.sectionTitle}>Section: Upcoming Extensions</Text>
        <View style={styles.toggleTabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Renewals' ? styles.activeTab : styles.inactiveTab]}
            onPress={() => setActiveTab('Renewals')}
          >
            <Text
              style={activeTab === 'Renewals' ? styles.activeTabText : styles.inactiveTabText}
            >
              Renewals (8)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Extensions' ? styles.activeTab : styles.inactiveTab]}
            onPress={() => setActiveTab('Extensions')}
          >
            <Text
              style={activeTab === 'Extensions' ? styles.activeTabText : styles.inactiveTabText}
            >
              Extensions (2)
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  userInfo: {},
  greeting: { fontSize: 16, color: '#000' },
  username: { fontSize: 18, fontWeight: 'bold' },
  salesCard: {
    backgroundColor: '#E30613',
    margin: 15,
    borderRadius: 12,
    padding: 15,
  },
  salesTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  salesBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  salesTitle: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  salesPeriod: { color: 'white' },
  redText: { color: 'white', fontWeight: 'bold' },
  subLabel: { color: 'white', fontSize: 12 },
  sectionTitle: {
    marginHorizontal: 15,
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
  productsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  productBox: {
    alignItems: 'center',
    margin: 10,
    width: '40%',
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
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  activeTab: {
    backgroundColor: '#E30613',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inactiveTab: {
    backgroundColor: '#e0e0e0',
  },
  inactiveTabText: {
    color: '#555',
    fontWeight: 'bold',
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
