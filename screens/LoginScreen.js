import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ✅ Eye icon

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // 👁️ Toggle state

  const handleLogin = () => {
    if (!phone || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (phone.trim() === '0712345678' && password.trim() === 'password123') {
      navigation.replace('MainTabs');

    } else {
      Alert.alert('Login Failed', 'Incorrect phone number or password');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png.jpg')} style={styles.logo} />

      <Text style={styles.welcome}>Welcome back, you’ve been missed</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#aaa"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {/* 👁️ Password input with toggle */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? 'eye' : 'eye-off'}
            size={22}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.linkRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Forgot your password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        Review our <Text style={styles.bold}>Terms and Policies</Text>{'\n'}
        PataBima Ver 1.0.0
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  welcome: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    color: '#000',
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  link: {
    fontSize: 13,
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  terms: {
    textAlign: 'center',
    fontSize: 12,
    color: '#777',
    marginTop: 30,
  },
  bold: {
    fontWeight: 'bold',
  },
});
