import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Alert, TouchableOpacity, ImageBackground, Modal } from 'react-native';

import data from '../data/data';

function AccountItem(props) {
    return (
        <View style={[styles.accountItemStyle, { backgroundColor: props.backgroundColor }]}>
            <Text style={{ color: "#ffff", fontSize: 14 }}>
                {props.name}
            </Text>
            <Text style={{ color: "#ffff", fontSize: 18 }}>
                ${props.amount}.00
      </Text>
        </View>
    )
}

function FlatListHeader({ setModalVisible }) {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.actionBarStyle}>
                <Image source={require('../assets/Group2563x.png')} style={styles.groupIconStyle} />
                <Text style={{ fontSize: 25 }}>Dashboard</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image source={require('../assets/Group2553x.png')} style={styles.groupIconStyle} />
                </TouchableOpacity>
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

function compare(a, b) {
    return (-(Date.parse(a.date_time) - Date.parse(b.date_time)));
}

function listItem({ item, groceries, clothes, rental, navigation }) {
    let uri;
    let backgroundColor;
    let textColor;
    let category;
    let data;
    if (item.category === 1) {
        uri = require('../assets/Group2533x.png');
        backgroundColor = '#FEC180';
        textColor = '#FF958F';
        category = 'Groceies';
        data = groceries;
    } else if (item.category === 2) {
        uri = require('../assets/Path987.png');
        backgroundColor = '#EFBAD3';
        textColor = '#A254F2';
        category = 'Clothes';
        data = clothes;
    } else if (item.category === 3) {
        uri = require('../assets/Path986.png');
        backgroundColor = '#54BAE6';
        textColor = '#51EFDE';
        category = 'Rental';
        data = rental;
    }

    let account;
    if (item.type === 1) {
        account = 'Bank account';
    } else if (item.type === 2) {
        account = 'Credit card';
    } else if (item.type === 3) {
        account = 'Cash';
    }

    return (
        <TouchableOpacity style={styles.itemStyle} onPress={
            () => {
                navigation.navigate('DashboardDetailStack', {
                    category: category,
                    data: data,
                });
            }
        }>
            <View style={styles.inforContainer}>
                <View style={{ flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'flex-start', marginLeft: 80 }}>
                    <Text style={{ fontSize: 20 }}>{category}</Text>
                    <Text style={{ color: "#d7d7d7" }}>{account}</Text>
                </View>
                <View style={{ flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'flex-end', marginRight: 15, flex: 1 }}>
                    <Text style={{ color: "#d7d7d7" }}>{item.date_time}</Text>
                    <Text style={{ color: textColor }}>${item.spend_money}.00</Text>
                </View>
            </View>
            <View style={[styles.imageContainer, { backgroundColor: backgroundColor }]}>
                <ImageBackground source={uri}
                    style={[styles.imageStyle, { backgroundColor: backgroundColor }]}
                    imageStyle={{ resizeMode: 'contain' }}
                />
            </View>
        </TouchableOpacity>
    )
}

export default function DashboardStack({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const groceries = data.detail.filter(item => item.category === 1).sort((a, b) => compare(a, b));
    const clothes = data.detail.filter(item => item.category === 2).sort((a, b) => compare(a, b));
    const rental = data.detail.filter(item => item.category === 3).sort((a, b) => compare(a, b));

    let lastRecord = [...[groceries[0], clothes[0], rental[0]]];
    return (
        <SafeAreaView style={styles.container}>
            <FlatList style={styles.listStyle}
                ListHeaderComponent={FlatListHeader({ setModalVisible })}
                data={lastRecord}
                renderItem={({ item }) => listItem({ item, groceries, clothes, rental, navigation })}
                keyExtractor={item => item.id.toString()}
            >
            </FlatList>
            <Modal animationType='slide'
                transparent={false}
                visible={modalVisible}
            >
                <View style = {styles.modalStyle}>
                    <Text style = {{fontSize : 30}}>
                        Notifications
                    </Text>
                    <TouchableOpacity style = {{width : 250, height : 50, justifyContent : 'center', alignItems : 'center', backgroundColor : '#ffffff', borderRadius : 10}}
                    onPress = {()=>setModalVisible(false)}>
                        <Image source = {require('../assets/close.png')} style = {{height : 30, width : 30}}/>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    )
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
    listStyle: {
        width: '100%',
        padding: 10
    },
    itemStyle: {
        width: '100%',
        height: 80,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        flexDirection: 'row',
        padding: 5,
        marginBottom: 10
    },
    imageStyle: {
        height: 30,
        width: 30,
        resizeMode: 'stretch',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 80,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        position: 'absolute'
    },
    inforContainer: {
        flexDirection: 'row',
        backgroundColor: "#ffffff",
        flex: 1,
        alignItems: 'center',
        marginLeft: 15,
        borderRadius: 10,
        width: '100%',
        height: 88
    },
    modalStyle : {
        flex: 1,
        backgroundColor: '#F2F4F7',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        flexDirection : 'column'
    }
});