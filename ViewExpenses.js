import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewExpenses() {
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem('expenses');
      const parsed = storedExpenses ? JSON.parse(storedExpenses) : [];
      setExpenses(parsed.reverse());
    } catch (error) {
      console.error('Failed to load expenses:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = loadExpenses();
    return () => unsubscribe;
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>💰 {item.amount} | 📅 {item.date}</Text>
      <Text style={styles.text}>📂 {item.category}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Expenses</Text>
      <FlatList data={expenses} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  text: { fontSize: 16 },
});
