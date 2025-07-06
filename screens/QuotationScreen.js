import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const QuotationScreen = ({ route }) => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState('Unapplied');
  const [quotations, setQuotations] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});

  const addNewQuoteIfExists = useCallback(() => {
    const newQuote = route?.params?.newQuote;
    if (newQuote) {
      setQuotations((prev) => {
        // Check if the new quote already exists
        if (!prev.some((q) => q.reg === newQuote.reg)) {
          return [newQuote, ...prev]; // Add new quote if it doesn't exist
        }
        return prev; // Return previous state if it exists
      });
    }

    if (route?.params?.filterType) {
      setSelectedFilter(route.params.filterType);
    }
  }, [route.params]);

  useFocusEffect(
    useCallback(() => {
      addNewQuoteIfExists();
      // Reset state when the screen is focused
      return () => {
        setQuotations([]);
        setSelectedFilter('Unapplied');
        setExpandedCards({});
      };
    }, [addNewQuoteIfExists])
  );

  const filteredQuotations =
    selectedFilter === 'All'
      ? quotations
      : quotations.filter((q) => q.applied === (selectedFilter === 'Applied'));

  const handleApplyPolicy = (reg) => {
    const updated = quotations.map((q) =>
      q.reg === reg ? { ...q, applied: true } : q
    );
    setQuotations(updated);
  };

  const toggleCard = (reg) => {
    setExpandedCards((prev) => ({
      ...prev,
      [reg]: !prev[reg],
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Quotations</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#aaa" />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>

        {/* Filters */}
        <View style={styles.filtersRow}>
          <TouchableOpacity
            style={[styles.filterBtn, selectedFilter === 'All' && styles.activeBtn]}
            onPress={() => setSelectedFilter('All')}
          >
            <Text style={[styles.filterText, selectedFilter === 'All' && styles.activeText]}>
              All
            </Text>
          </TouchableOpacity>

          <View style={styles.toggleContainer}>
            {['Applied', 'Unapplied'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[styles.toggleBtn, selectedFilter === filter && styles.activeToggleBtn]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[styles.toggleText, selectedFilter === filter && styles.activeToggleText]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quotation Cards */}
        {filteredQuotations.map((q) => {
          const isExpanded = expandedCards[q.reg];
          return (
            <TouchableOpacity
              key={q.reg} // Use a unique identifier for the key
              style={styles.card}
              onPress={() => toggleCard(q.reg)}
              activeOpacity={0.95}
            >
              {/* Collapsed Header */}
              <View style={styles.cardHeaderCollapsed}>
                <View style={styles.iconText}>
                  <Ionicons name="document-text-outline" size={24} color="#EB5757" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.cardTitle}>{q.plate}</Text>
                    <Text style={styles.policyType}>Policy Type: {q.insuranceProduct}</Text>
                    <Text style={styles.premium}>Ksh. {q.premium} (gross)</Text>
                  </View>
                </View>

                <View style={styles.statusAndArrow}>
                  <View style={[styles.statusTag, q.applied ? styles.appliedTag : styles.unappliedTag]}>
                    <Text style={styles.statusText}>{q.applied ? 'Applied' : 'Unapplied'}</Text>
                  </View>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color="#000"
                    style={{ marginLeft: 10 }}
                  />
                </View>
              </View>

              {/* Expanded Section */}
              {isExpanded && (
                <>
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
                      <Text style={styles.label}>Vehicle Registration:</Text>
                      <Text style={styles.value}>{q.reg}</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() =>
                      navigation.navigate('ViewQuoteScreen', {
                        vehicleReg: q.reg,
                        year: q.year,
                        valuation: q.valuation,
                        selectedProvider: q.provider,
                        insuranceProduct: q.insuranceProduct,
                        filterType: q.applied ? 'Applied' : 'Unapplied',
                      })
                    }
                  >
                    <Text style={styles.actionText}>View Quotation</Text>
                  </TouchableOpacity>

                  {!q.applied && (
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => handleApplyPolicy(q.reg)}
                    >
                      <Text style={styles.actionText}>Apply Policy</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default QuotationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
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
    borderColor: '#EB5757',
    marginRight: 10,
  },
  activeBtn: {
    backgroundColor: '#EB5757',
  },
  filterText: {
    fontWeight: 'bold',
    color: '#EB5757',
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
    backgroundColor: '#EB5757',
  },
  toggleText: {
    color: '#EB5757',
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
  cardHeaderCollapsed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: { fontWeight: 'bold', fontSize: 16, color: '#000' },
  policyType: { fontSize: 12, color: '#555' },
  premium: {
    fontSize: 13,
    color: '#000',
    fontWeight: '600',
    marginTop: 2,
  },
  statusAndArrow: {
    alignItems: 'flex-end',
  },
  statusTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  appliedTag: {
    backgroundColor: '#EB5757',
  },
  unappliedTag: {
    backgroundColor: '#EB5757',
  },
  statusText: {
    fontSize: 11,
    color: 'white',
    fontWeight: 'bold',
  },
  cardBody: {
    marginTop: 12,
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
  actionBtn: {
    borderWidth: 1,
    borderColor: '#EB5757',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  actionText: {
    color: '#EB5757',
    fontWeight: 'bold',
  },
});
