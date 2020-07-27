import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardStack from './DashboardStack';
import DashboardDetailStack from './DashboardDetailStack';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();


function Dashboard({ navigation }) {
  return (
    <Stack.Navigator screenOptions = {{headerShown : false}}>
      <Stack.Screen name="Dashboardstack" component={DashboardStack} />
      <Stack.Screen name="DashboardDetailStack" component={DashboardDetailStack} />
    </Stack.Navigator>
  );
}

export default function DashboardScreen({ navigation }) {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name='Dashboard' component={Dashboard} />
      <BottomTab.Screen name='Profile' component={ProfileScreen} />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    tintColor: "#000000",
    width: 30,
    height: 30
  }
});

