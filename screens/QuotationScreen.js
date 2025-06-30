import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const QuotationScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Quotation</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#aaa" />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>

        {/* Filter Buttons */}
        <View style={styles.filters}>
          <TouchableOpacity style={styles.filterBtn}><Text>All</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}><Text>Applied</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}><Text>Unapplied</Text></TouchableOpacity>
        </View>

        {/* Quotation Cards */}
        {[1, 2].map((item, i) => {
          const isApplied = i === 1;
          return (
            <View key={i} style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="document-text-outline" size={20} color="black" />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={styles.cardTitle}>{isApplied ? 'KBC 1234D' : 'KDH123H'}</Text>
                  <Text style={styles.policyType}>Policy Type: PVC</Text>
                </View>
                <View style={styles.statusTag}>
                  <Text style={styles.statusText}>{isApplied ? 'Applied' : 'Unapplied'}</Text>
                </View>
              </View>

              {/* Body Section */}
              <View style={styles.cardBody}>
                <View style={styles.row}>
                  <Text style={styles.label}>Insurance Provider:</Text>
                  <Text style={styles.value}>{isApplied ? 'Definite' : '---'}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Date Created:</Text>
                  <Text style={styles.value}>{isApplied ? '6/29/2025' : '---'}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Total Premium:</Text>
                  <Text style={styles.value}>{isApplied ? 'Ksh. 32,696 (gross)' : '---'}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Vehicle Registration:</Text>
                  <Text style={styles.value}>{isApplied ? 'KDH123H' : '---'}</Text>
                </View>
              </View>

              {/* Buttons */}
              <TouchableOpacity style={styles.button}><Text>View Quotation</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button}><Text>Apply Policy</Text></TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default QuotationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
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
  filters: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  filterBtn: {
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
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
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    marginLeft: 'auto',
  },
  statusText: { fontSize: 10 },
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
