import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({
  visible,
  onClose,
  onSuccess,
}: {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { login, signup } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleSubmit = async () => {
    if (!email || !password || (isSignUp && !name)) {
      Alert.alert('Validation Error', 'Please fill all required fields.');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signup(email, password, name);
        Alert.alert('Account Created', 'Welcome! You are now signed up.');
      } else {
        await login(email, password);
        Alert.alert('Welcome Back', 'Logged in successfully!');
      }

      resetForm();
      onClose();

      // ✅ Fix: allow AuthContext.user to update before onSuccess
      setTimeout(() => onSuccess(), 200);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-11/12 rounded-xl bg-white p-6">
          <Text className="mb-4 text-center text-xl font-bold">
            {isSignUp ? 'Sign Up' : 'Login'}
          </Text>

          {isSignUp && (
            <TextInput
              placeholder="Full Name"
              className="mb-3 rounded border border-gray-300 p-3"
              value={name}
              onChangeText={setName}
            />
          )}

          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            className="mb-3 rounded border border-gray-300 p-3"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            className="mb-4 rounded border border-gray-300 p-3"
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            className="mb-2 rounded bg-indigo-500 p-3"
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-center font-semibold text-white">
                {isSignUp ? 'Sign Up' : 'Login'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsSignUp((prev) => !prev)}>
            <Text className="text-center text-blue-600">
              {isSignUp ? 'Already have an account? Log in' : 'New user? Create an account'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} className="mt-3">
            <Text className="text-center text-red-500">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
