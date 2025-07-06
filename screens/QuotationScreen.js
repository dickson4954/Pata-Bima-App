import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const QuotationScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const quotations = [
    {
      plate: 'KDH123H',
      applied: false,
      provider: '---',
      date: '---',
      premium: '---',
      reg: '---',
    },
    {
      plate: 'KBC 1234D',
      applied: true,
      provider: 'Definite',
      date: '6/29/2025',
      premium: 'Ksh. 32,696 (gross)',
      reg: 'KDH123H',
    },
  ];

  const filteredQuotations =
    selectedFilter === 'All'
      ? quotations
      : quotations.filter((q) => q.applied === (selectedFilter === 'Applied'));

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Quotation</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#aaa" />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>

        {/* Filters: All + toggle */}
        <View style={styles.filtersRow}>
          <TouchableOpacity
            style={[
              styles.filterBtn,
              selectedFilter === 'All' && styles.activeBtn,
            ]}
            onPress={() => setSelectedFilter('All')}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === 'All' && styles.activeText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          <View style={styles.toggleContainer}>
            {['Applied', 'Unapplied'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.toggleBtn,
                  selectedFilter === filter && styles.activeToggleBtn,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.toggleText,
                    selectedFilter === filter && styles.activeToggleText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Cards */}
        {filteredQuotations.map((q, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="document-text-outline" size={20} color="black" />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.cardTitle}>{q.plate}</Text>
                <Text style={styles.policyType}>Policy Type: PVC</Text>
              </View>
              <View
                style={[
                  styles.statusTag,
                  q.applied ? styles.appliedTag : styles.unappliedTag,
                ]}
              >
                <Text style={styles.statusText}>
                  {q.applied ? 'Applied' : 'Unapplied'}
                </Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.row}>
                <Text style={styles.label}>Insurance Provider:</Text>
                <Text style={styles.value}>{q.provider}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Date Created:</Text>
                <Text style={styles.value}>{q.date}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Total Premium:</Text>
                <Text style={styles.value}>{q.premium}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Vehicle Registration:</Text>
                <Text style={styles.value}>{q.reg}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text>View Quotation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text>Apply Policy</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default QuotationScreen;

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

  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E30613',
    marginRight: 10,
  },
  activeBtn: {
    backgroundColor: '#E30613',
  },
  filterText: {
    fontWeight: 'bold',
    color: '#E30613',
  },
  activeText: {
    color: '#fff',
  },

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  toggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  activeToggleBtn: {
    backgroundColor: '#E30613',
  },
  toggleText: {
    color: '#E30613',
    fontWeight: 'bold',
  },
  activeToggleText: {
    color: '#fff',
  },

  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  policyType: { fontSize: 12, color: '#555' },
  statusTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginLeft: 'auto',
  },
  appliedTag: {
    backgroundColor: '#E30613',
  },
  unappliedTag: {
    backgroundColor: '#aaa',
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
});
