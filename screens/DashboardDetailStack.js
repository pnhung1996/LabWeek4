import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';

function FlatListHeader({ category, navigation }) {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress = {()=>navigation.navigate('Dashboardstack')}>
                <Image source={require('../assets/back.png')} style={styles.imageStyle} />
            </TouchableOpacity>
            <Text style={{ alignSelf: 'center', position: 'absolute', fontSize: 27 }}>{category}</Text>
        </View>
    )
}

function FlatListItem({ item }) {
    return(
        <View style = {styles.itemContainer}>
            <Image source = {{uri : item.production_image}} style = {styles.itemImageSytle}/>
            <View></View>
        </View>
    )
}

export default function DashboardDetailStack({ navigation, route }) {
    const { category, data } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <FlatList style={styles.listContainer}
                data = {data}
                ListHeaderComponent={FlatListHeader({ category, navigation })}
                renderItem={({ item }) => FlatListItem({ item })} 
                keyExtractor = {item=>item.id.toString()}/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#F2F4F7',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    imageStyle: {
        tintColor: "#000000",
        width: 30,
        height: 30,
        backgroundColor: "#F2F4F7"
    },
    headerContainer: {
        flexDirection: 'column',
        height: 100,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 10,
    },
    listContainer: {
        width: '100%',
        padding: 10,
    },
    itemContainer : {
        width : '100%',
        height : 80,
        backgroundColor : "#ffffff",
        marginTop : 20,
        borderRadius : 10,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        padding : 10
    },
    itemImageSytle : {
        width : 60,
        height : '100%',
        borderRadius : 30,
        resizeMode : 'cover'
    }
});