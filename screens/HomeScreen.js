import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Ionicons name="person-circle-outline" size={40} color="black" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.greeting}>Good Morning</Text>
              <Text style={styles.username}>John Doe</Text>
            </View>
          </View>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.chip}><Text>Today</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chip}><Text>Last Commission</Text></TouchableOpacity>
        </View>

        {/* Sales Card */}
        <View style={styles.salesCard}>
          <View style={styles.salesRow}>
            <Text style={styles.label}>My Sales</Text>
            <Text style={styles.label}>Period: <Text style={styles.value}>2 Day</Text></Text>
          </View>
          <View style={styles.salesRow}>
            <Text style={styles.subLabel}>Next Commission Date</Text>
            <Text style={styles.subLabel}>Policies Sold</Text>
          </View>
        </View>

        {/* Insurance Products */}
        <Text style={styles.sectionTitle}>Section: Insurance Products</Text>
        <View style={styles.productsRow}>
          {['Motor Vehicle Insurance', 'Medical Insurance', 'WIBA Insurance', 'Last Expense'].map((item, index) => (
            <View key={index} style={styles.productBox}>
              <View style={styles.squareBox} />
              <Text style={styles.productText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Campaigns */}
        <Text style={styles.sectionTitle}>Section: Campaigns</Text>
        <View style={styles.campaigns}>
          <View style={styles.campaignBox}></View>
          <View style={styles.campaignBox}></View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.actionBtn}><Text>Renewals(8)</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><Text>Extensions(2)</Text></TouchableOpacity>
        </View>
      </ScrollView>

     
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  greeting: { fontSize: 16, color: '#333' },
  username: { fontWeight: 'bold', fontSize: 16 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  chip: {
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  salesCard: {
    margin: 20,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0096FF',
  },
  salesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: { fontWeight: 'bold', fontSize: 16 },
  value: { fontWeight: 'normal' },
  subLabel: { color: 'gray', marginTop: 10 },
  sectionTitle: {
    marginHorizontal: 20,
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
  productsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  productBox: {
    alignItems: 'center',
    margin: 5,
    width: '45%',
  },
  squareBox: {
    width: 60,
    height: 60,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 5,
  },
  productText: {
    textAlign: 'center',
    fontSize: 12,
  },
  campaigns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
  campaignBox: {
    width: 140,
    height: 100,
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  actionBtn: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 10,
    marginTop: 3,
  },
});
