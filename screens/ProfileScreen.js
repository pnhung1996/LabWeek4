import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function ProfileScreen ({navigation}) {
    return(
      <SafeAreaView style = {styles.container}>
        <Text>Profile</Text>
      </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F4F7',
        alignItems: 'center',
        justifyContent: 'center',
      },
  });