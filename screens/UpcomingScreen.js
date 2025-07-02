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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UpcomingScreen = () => {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('Renewals');

  const renewals = [
    {
      id: '1',
      title: 'Annual Policy Renewal',
      vehicle: 'KDH123H',
      date: '2025-07-10',
      provider: 'Jubilee',
      premium: 'Ksh. 22,000',
    },
    {
      id: '2',
      title: 'Quarterly Policy Renewal',
      vehicle: 'KBZ456Y',
      date: '2025-08-15',
      provider: 'APA',
      premium: 'Ksh. 10,500',
    },
  ];

  const extensions = [
    {
      id: '3',
      title: '6-Month Extension',
      vehicle: 'KDA789T',
      date: '2025-07-12',
      provider: 'Britam',
      premium: 'Ksh. 13,000',
    },
    {
      id: '4',
      title: '3-Month Extension',
      vehicle: 'KCE321L',
      date: '2025-09-05',
      provider: 'CIC',
      premium: 'Ksh. 8,200',
    },
  ];

  const data = tab === 'Renewals' ? renewals : extensions;

  const filteredItems = data.filter((item) =>
    item.vehicle.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const today = new Date();
    const itemDate = new Date(item.date);
    const isPastDue = itemDate < today;

    return (
      <View style={[styles.card, isPastDue && styles.pastDueCard]}>
        <View style={styles.cardHeader}>
          <Ionicons name="calendar" size={20} color="black" />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.policyType}>{item.vehicle}</Text>
          </View>
          <View style={styles.dateTag}>
            <Text style={styles.statusText}>{item.date}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.row}>
            <Text style={styles.label}>Insurance Provider:</Text>
            <Text style={styles.value}>{item.provider}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Premium:</Text>
            <Text style={styles.value}>{item.premium}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text>View Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderContent = () => {
    if (filteredItems.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <View style={styles.circle}>
            <Ionicons name="close" size={60} color="#999" />
          </View>
          <Text style={styles.emptyText}>No Upcoming {tab}</Text>
          <Text style={styles.emptySubText}>
            There are currently no upcoming {tab}.
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredItems}
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
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" />
        <TextInput
          placeholder="Search by Vehicle"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
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

      {/* Upcoming List or Empty State */}
      {renderContent()}

      {/* Claims Button */}
      <TouchableOpacity style={styles.claimsBtnRed}>
        <Text style={styles.claimsTextWhite}>Claims</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default UpcomingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  searchInput: { marginLeft: 10, flex: 1 },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    padding: 4,
    borderRadius: 30,
    marginBottom: 10,
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
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  pastDueCard: {
    backgroundColor: '#ffebe8',
    borderColor: '#E30613',
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  policyType: { fontSize: 12, color: '#555' },
  dateTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginLeft: 'auto',
    backgroundColor: '#E30613',
  },
  statusText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  cardBody: {
    marginTop: 10,
    marginBottom: 10,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  value: {
    fontSize: 13,
    color: '#555',
  },
  button: {
    borderWidth: 1,
    borderColor: '#aaa',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
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
  claimsBtnRed: {
    backgroundColor: '#E30613',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 10,
  },
  claimsTextWhite: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
});