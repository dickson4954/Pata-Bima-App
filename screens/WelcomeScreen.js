// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png.jpg')} 
        style={styles.logo}
      />
      <Text style={styles.title}>PATA BIMA AGENCY</Text>
      <Text style={styles.subtitle}>Insurance for Protection</Text>
      <View style={styles.loaderWrapper}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginBottom: 25,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#555',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 6,
  },
  loaderWrapper: {
    position: 'absolute',
    bottom: 80,
  },
});
