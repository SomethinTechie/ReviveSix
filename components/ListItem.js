import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import globalStyles from '../src/styles/GlobalStyle';

export default function ListItem({item, index, total, navigation}) {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('RequestQuoteScreen')}
            style={[
                globalStyles.listItem,
                globalStyles.firstListItem,
                index === 1 ? globalStyles.lastListItem : {},
            ]}>
            <Text style={globalStyles.listItemTitle}>
                {item.key}
                {item.date ? (
                    <Text style={globalStyles.smallText}>
                        {'\n'}
                        {item.date}
                    </Text>
                ) : null}
            </Text>
            <FeatherIcon name={item.icon} size={25} color="#fff"></FeatherIcon>
        </TouchableOpacity>
    );
}
