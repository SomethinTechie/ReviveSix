import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//icons
import Icon from 'react-native-vector-icons/AntDesign';
import globalStyles from '../src/styles/GlobalStyle';

export default function GridItem({item, navigation}) {
    return (
        <TouchableOpacity
            style={[styles.item]}
            onPress={() => navigation.navigate(`${item.url}`)}>
            <View style={styles.iconWrapper}>
                <Icon name={item.icon} size={25} color="#000"></Icon>
            </View>
            <Text style={[styles.textCenter, styles.ptag, styles.bold,globalStyles.darkText]}>
                {item.key}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 4,
        height: 110,
        textAlign: 'center',
        // borderRadius: 6,
    },
    itemText: {
        color: 'white',
    },
    bold: {
        fontWeight: 'bold',
    },
    stdPadding: {
        padding: 10,
    },
    textCenter: {
        textAlign: 'center',
    },
    mb2: {
        marginBottom: 10,
    },
    ptag: {
        fontSize: 12,
    },
    op7: {
        opacity: 0.7,
    },
    border: {
        borderWidth: 1,
        borderColor: 'black',
        borderColor: 'rgba(0,0,0,0.1)',
    },
    iconWrapper: {
        backgroundColor: 'rgba(251, 200, 30, 1)',
        padding: 10,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        marginBottom: 10,
        borderColor: '#000',
        // borderWidth: 2,
    },
});
