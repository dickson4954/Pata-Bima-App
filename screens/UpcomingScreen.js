import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UpcomingScreen = () => {
  const [tab, setTab] = useState('Renewals');
  const renewals = [{ id: '1', reg: 'KBH123B' }, { id: '2', reg: 'KBH123B' }];
  const extensions = [];

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View>
        <Text style={styles.reg}>{item.reg}</Text>
        <Text style={styles.policyType}>Policy type</Text>
      </View>
      <View style={styles.cardRight}>
        <TouchableOpacity style={styles.renewBtn}>
          <Text style={styles.renewText}>Renew</Text>
        </TouchableOpacity>
        <Ionicons name="chevron-down" size={20} color="#555" style={{ marginLeft: 8 }} />
      </View>
    </View>
  );

  const renderContent = () => {
    const data = tab === 'Renewals' ? renewals : extensions;

    if (data.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <View style={styles.circle}>
            <Ionicons name="close" size={60} color="#999" />
          </View>
          <Text style={styles.emptyText}>No Upcoming Extensions</Text>
          <Text style={styles.emptySubText}>
            They are currently no upcoming Extensions
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Upcoming</Text>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#aaa" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
      </View>

      {/* Tab Toggle */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, tab === 'Renewals' && styles.activeTab]}
          onPress={() => setTab('Renewals')}
        >
          <Text style={styles.tabText}>Renewals({renewals.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'Extensions' && styles.activeTab]}
          onPress={() => setTab('Extensions')}
        >
          <Text style={styles.tabText}>Extensions({extensions.length})</Text>
        </TouchableOpacity>
      </View>

      {/* List or Empty Message */}
      {renderContent()}

      {/* Claims Button */}
      <TouchableOpacity style={styles.claimsBtn}>
        <Text style={styles.claimsText}>Claims</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default UpcomingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 42,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    padding: 4,
    borderRadius: 30,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 30,
  },
  activeTab: {
    backgroundColor: '#fff',
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reg: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  policyType: {
    color: '#666',
    fontSize: 12,
  },
  renewBtn: {
    backgroundColor: '#e6e6e6',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  renewText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  circle: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  emptySubText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
  claimsBtn: {
    backgroundColor: '#eee',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 10,
  },
  claimsText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#333',
  },
});
