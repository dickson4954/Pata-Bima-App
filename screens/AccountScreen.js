import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MyAccountScreen = () => {
  const [activeTab, setActiveTab] = useState('Today');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* My Account Section */}
      <Text style={styles.sectionTitle}>My Account</Text>
      <View style={styles.accountCard}>
        <Ionicons name="person-circle-outline" size={70} color="#555" style={styles.profileIcon} />
        <View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.agentCode}>Sales Agent Code: 23422</Text>
        </View>
      </View>

      {/* My Earnings Section */}
      <Text style={styles.sectionTitle}>My Earnings</Text>
      <View style={styles.earningsCard}>
        <Text style={styles.earningsHeader}>Upcoming Commission</Text>
        <Text style={styles.earningsAmount}>KES 10000</Text>
        <Text style={styles.earningsText}>Your payout is scheduled 1st July, 2025</Text>
        <TouchableOpacity style={styles.earningsButton}>
          <Text style={styles.earningsButtonText}>View Earnings</Text>
        </TouchableOpacity>
      </View>

      {/* My Activity Section */}
      <Text style={styles.sectionTitle}>My Activity</Text>

      {/* Toggle Buttons */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, activeTab === 'Today' && styles.activeToggle]}
          onPress={() => setActiveTab('Today')}
        >
          <Text style={styles.toggleText}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, activeTab === 'Last Commission' && styles.activeToggle]}
          onPress={() => setActiveTab('Last Commission')}
        >
          <Text style={styles.toggleText}>Last Commission</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsBox}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Sales</Text>
          <Text style={styles.statValue}>0 policies</Text>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Production</Text>
          <Text style={styles.statValue}>KES 0</Text>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Commission</Text>
          <Text style={styles.statValue}>KES 0</Text>
        </View>
      </View>

      {/* Commission History */}
      <Text style={styles.sectionTitle}>Commission History</Text>
      <View style={styles.historyCard}>
        <Ionicons name="file-tray-full-outline" size={50} color="#555" style={{ marginBottom: 10 }} />
        <Text style={styles.historyTitle}>No Commission History</Text>
        <Text style={styles.historySubtitle}>Your commission transactions will appear here</Text>
      </View>
    </ScrollView>
  );
};

export default MyAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#222',
  },
  accountCard: {
    backgroundColor: '#fdecef',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  profileIcon: {
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
  },
  agentCode: {
    fontSize: 13,
    color: '#555',
    textDecorationLine: 'underline',
  },
  earningsCard: {
    backgroundColor: '#fdecef',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  earningsHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#222',
    marginBottom: 4,
  },
  earningsAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  earningsText: {
    fontSize: 13,
    color: '#555',
  },
  earningsButton: {
    marginTop: 12,
    backgroundColor: '#e30613',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },
  earningsButtonText: {
    fontWeight: '500',
    fontSize: 13,
    color: '#fff',
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  toggleBtn: {
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  activeToggle: {
    backgroundColor: '#ccc',
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000',
  },
  statsBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 16,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#ccc',
    marginVertical: 4,
  },
  statLabel: {
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 4,
    color: '#333',
  },
  statValue: {
    fontSize: 12,
    color: '#666',
  },
  historyCard: {
    backgroundColor: '#fdecef',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  historyTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
    color: '#333',
  },
  historySubtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
});
