import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, _FlatList } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import data from '../data/data';

import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function AccountItem(props) {
  return (
    <View style={[styles.accountItemStyle, { backgroundColor: props.backgroundColor }]}>
      <Text style={{ color: "#ffff", fontSize: 15 }}>
        {props.name}
      </Text>
      <Text style={{ color: "#ffff", fontSize: 18 }}>
        ${props.amount}.00
      </Text>
    </View>
  )
}

function FlatListHeader() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.actionBarStyle}>
        <Image source={require('../assets/Group2563x.png')} style={styles.groupIconStyle} />
        <Text style={{ fontSize: 25 }}>Dashboard</Text>
        <Image source={require('../assets/Group2553x.png')} style={styles.groupIconStyle} />
      </View>
      <Text style={{ alignSelf: 'flex-start', fontSize: 23, marginTop: 50 }}>List of Account</Text>
      <View style={styles.accountContainer}>
        <AccountItem name="Bank account" amount={data.account_information.bank.total} backgroundColor='#E437BC' />
        <AccountItem name="Credit card" amount={data.account_information.credit.total} backgroundColor='#EFA75A' />
        <AccountItem name="Cash" amount={data.account_information.cash.total} backgroundColor='#23E3D6' />
      </View>
      <View style={styles.totalStyle}>
        <Text style={{ color: "#FF958F", fontSize: 30 }}>
          ${data.account_information.total}.00
        </Text >
        <Text style={{ color: "#A6B1C0", fontSize: 20 }}>Total Balance</Text>
      </View>

    </View>
  )
}

function DashboardStack({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList style = {styles.listStyle} ListHeaderComponent = {FlatListHeader}>

      </FlatList>
    </SafeAreaView>
  )
}

function Dashboard({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard stack" component={DashboardStack}
        options={{
          headerShown: false,
        }} />
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
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'column',
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  actionBarStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 35,
  },
  groupIconStyle: {
    width: 35,
    height: '100%',
    resizeMode: 'contain',
  },
  accountContainer: {
    flexDirection: 'row'
  },
  accountItemStyle: {
    marginTop: 20,
    padding: 10,
    borderRadius: 7,
    flexDirection: 'column',
    flex: 1,
    margin: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80
  },
  totalStyle: {
    marginTop: 20,
    padding: 10,
    borderRadius: 7,
    flexDirection: 'column',
    margin: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 90,
    backgroundColor: "#ffff",
    width: '100%'
  },
  listStyle : {
    width : '100%'
  }
});