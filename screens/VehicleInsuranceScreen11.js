import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VehicleInsuranceScreen10 = () => {
  const navigation = useNavigation();

  const handleDownloadReceipt = () => {
    Alert.alert('Download', 'Receipt download feature coming soon.');
  };

  const handleGoHome = () => {
    navigation.navigate('MainTabs'); // Change if your home screen route is different
  };

  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.headerTitle}>TOR For Private</Text>

      {/* Step Indicator Row */}
      <View style={styles.stepIndicatorRow}>
        <Text style={styles.stepLabel}>1 Notifications</Text>
        <View style={styles.stepCircles}>
          {[2, 3, 4, 5, 6].map((num, i) => (
            <View
              key={i}
              style={[styles.circle, num === 6 && styles.activeCircle]}
            >
              <Text
                style={[styles.circleText, num === 6 && styles.activeCircleText]}
              >
                {num}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.stepNote}>Step Indicator:</Text>

      {/* Confirmation Section */}
      <View style={styles.centerSection}>
        <Image
          source={require('../assets/green check icon.png')}
          style={styles.checkIcon}
        />
        <Text style={styles.confirmedText}>Payment Confirmed!</Text>
        <Text style={styles.timestamp}>{getCurrentTimestamp()}</Text>

        {/* Download Receipt Button */}
        <TouchableOpacity style={styles.downloadBtn} onPress={handleDownloadReceipt}>
          <Text style={styles.downloadText}>Download Receipt</Text>
        </TouchableOpacity>

        {/* Go to Home Button */}
        <TouchableOpacity style={styles.homeBtn} onPress={handleGoHome}>
          <Text style={styles.homeText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default VehicleInsuranceScreen10;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 25,
    paddingBottom: 60,
    flexGrow: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 10,
  },
  stepIndicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepLabel: {
    fontSize: 13,
    color: '#D92027',
    fontWeight: 'bold',
  },
  stepCircles: {
    flexDirection: 'row',
    gap: 8,
  },
  stepNote: {
    fontSize: 10,
    color: '#777',
    marginBottom: 20,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    backgroundColor: '#D92027',
  },
  circleText: {
    fontSize: 12,
    color: '#555',
  },
  activeCircleText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  centerSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  checkIcon: {
    width: 60,
    height: 60,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  confirmedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A9442',
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginBottom: 30,
  },
  downloadBtn: {
    borderWidth: 1,
    borderColor: '#D92027',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 15,
  },
  downloadText: {
    color: '#D92027',
    fontWeight: '600',
    fontSize: 14,
  },
  homeBtn: {
    backgroundColor: '#D92027',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  homeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
