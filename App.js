import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddExpense from './screens/AddExpense';
import ViewExpenses from './screens/ViewExpenses';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddExpense">
        <Stack.Screen name="AddExpense" component={AddExpense} />
        <Stack.Screen name="ViewExpenses" component={ViewExpenses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
