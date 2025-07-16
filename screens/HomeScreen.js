import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [user, setUser] = useState(null);
  const [selectedPill, setSelectedPill] = useState('Today');

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    fetchUser();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleProductPress = (product) => {
    switch (product) {
      case 'Vehicle Insurance':
        navigation.navigate('VehicleInsurance1');
        break;
      case 'Medical Insurance':
        navigation.navigate('MedicalInsurance1');
        break;
      case 'WIBA Insurance':
        navigation.navigate('WibaInsurance1');
        break;
      case 'Last Expense':
        navigation.navigate('LastExpenseInsurance1');
        break;
      case 'Travel Insurance':
        navigation.navigate('TravelInsurance1');
        break;
      case 'Professional Indemnity':
        navigation.navigate('ProfessionalIndemnity1');
        break;
      case 'Domestic Package':
        navigation.navigate('DomesticPackage1');
        break;
      default:
        break;
    }
  };

  const renderExtensions = () => (
    <View style={styles.extensionsList}>
      {['KBH123B', 'KDA456X'].map((plate) => (
        <View key={plate} style={[styles.extensionCard, { backgroundColor: '#F8D7DA' }]}>
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
            <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase() || 'U'}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.username}>{user?.name || 'User'}</Text>

            <View style={styles.statsRow}>
              <TouchableOpacity onPress={() => setSelectedPill('Today')}>
                <Text
                  style={[
                    styles.statsLabel,
                    selectedPill === 'Today' ? styles.statsPillRed : styles.statsPillOutlined,
                  ]}
                >
                  Today
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedPill('Since Last Commission')}>
                <Text
                  style={[
                    styles.statsLabel,
                    selectedPill === 'Since Last Commission'
                      ? styles.statsPillRed
                      : styles.statsPillOutlined,
                  ]}
                >
                  Since Last Commission
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </View>

        <View style={styles.mySalesCard}>
  <View style={styles.mySalesTop}>
    <View style={styles.topStatsRow}>
      <View>
        <Text style={styles.mySalesTitle}>My Sales</Text>
        <Text style={styles.statsTitle}>Kes. 0</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.statsTitle}>Period</Text>
        <Text style={styles.statsTitle}>1 Day</Text>
      </View>
    </View>
  </View>

  <View style={styles.mySalesBottom}>
    <View style={styles.salesInfoRowFlat}>
      <View>
        <Text style={styles.salesInfoLabelBlack}>Next Commission Date</Text>
        <Text style={styles.salesInfoValueBlack}>Fri, Aug 1</Text>
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
  style={{ height: 200 }}
>
  {pages.map((page, pageIndex) => (
    <View key={pageIndex} style={styles.productsPage}>
      {page.map((product, index) => (
        <TouchableOpacity
          key={`${pageIndex}-${index}`}
          style={styles.productCardPaged}
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

        {/* Renewals */}
        <Text style={styles.sectionTitle}>Upcoming Extensions</Text>
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              activeTab === 'Renewals' && styles.segmentButtonActive,
            ]}
            onPress={() => setActiveTab('Renewals')}
          >
            <Text
              style={[
                styles.segmentButtonText,
                activeTab === 'Renewals' && styles.segmentButtonTextActive,
              ]}
            >
              Renewals (0)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              activeTab === 'Extensions' && styles.segmentButtonActive,
            ]}
            onPress={() => setActiveTab('Extensions')}
          >
            <Text
              style={[
                styles.segmentButtonText,
                activeTab === 'Extensions' && styles.segmentButtonTextActive,
              ]}
            >
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
    gap: 10,
    marginTop: 4,
  },
  statsLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#333',
  },
  statsPillRed: {
    backgroundColor: '#E30613',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: '600',
  },
  productsGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginHorizontal: 15,
  marginTop: 10,
},

productsPage: {
  width: screenWidth,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  paddingVertical: 10,
},

productCardPaged: {
  width: screenWidth / 2.8, // slightly smaller width
  backgroundColor: '#FDEBEC',
  paddingVertical: 15,      // reduced vertical padding
  paddingHorizontal: 10,
  borderRadius: 10,
  alignItems: 'center',
  marginVertical: 8,
},

  statsPillOutlined: {
    backgroundColor: '#fff',
    color: '#E30613',
    borderColor: '#E30613',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: '600',
  },
  mySalesCard: {
  backgroundColor: '#fff',
  borderRadius: 12,
  marginHorizontal: 15,
  marginTop: 10,
  marginBottom: 10,
  overflow: 'hidden',
  elevation: 3, // Android shadow
  shadowColor: '#000', // iOS shadow
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
},
mySalesTop: {
  backgroundColor: '#E30613', // red top
  padding: 15,
},
mySalesBottom: {
  backgroundColor: '#fff', // white bottom
  padding: 15,
},
topStatsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
mySalesTitle: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 4,
},
statsTitle: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
salesInfoRowFlat: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
salesInfoLabelBlack: {
  color: '#000',
  fontSize: 14,
  fontWeight: '600',
  marginBottom: 4,
},
salesInfoValueBlack: {
  color: '#000',
  fontSize: 16,
  fontWeight: 'bold',
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
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    padding: 4,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentButtonActive: {
  backgroundColor: '#E30613',
},

  segmentButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  segmentButtonTextActive: {
    color: '#fff',
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
