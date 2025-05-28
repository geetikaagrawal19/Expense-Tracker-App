import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddExpense({ navigation }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const saveExpense = async () => {
    if (!amount || !category || !date) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      amount,
      category,
      date,
    };

    try {
      const storedExpenses = await AsyncStorage.getItem('expenses');
      const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
      expenses.push(newExpense);
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
      Alert.alert('Saved', 'Expense added successfully!');
      setAmount('');
      setCategory('');
      setDate('');
    } catch (error) {
      Alert.alert('Error', 'Failed to save expense');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={amount} onChangeText={setAmount} />

      <Text style={styles.label}>Category</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} />

      <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} />

      <Button title="Add Expense" onPress={saveExpense} />
      <View style={{ marginTop: 10 }}>
        <Button title="View Expenses" onPress={() => navigation.navigate('ViewExpenses')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginTop: 5 },
});
