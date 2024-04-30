import React, {Component, useContext, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

import ListItem from '../../components/ListItem';
import globalStyles from '../../src/styles/GlobalStyle';

// icons
import Booking from '../../components/icons/Booking';

//contexts
import UserContext from '../../UserContext';

const Bookings = ({navigation}) => {
    const {user, setUser} = useContext(UserContext);
    const [repairs, setRepairs] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            fetch(`https://app.computerguardian.co.za/api/repairs/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setRepairs(data.repairs);
                })
                .catch(error => {
                    console.log(error);
                    Alert.alert('Request failed', error.message);
                });

            return () => {
                // Optional cleanup function
            };
        }, []),
    );

    return (
        <SafeAreaView style={globalStyles.darkContainer}>
            <ScrollView>
                {repairs.length === 0 ? (
                    <View
                        style={[
                            globalStyles.pageContainer,
                            globalStyles.alignContentCenter,
                            {flex: 1, paddingTop: 100},
                        ]}>
                        <View style={globalStyles.mb2}>
                            <Booking width={250} height={250} fill={'#aaa'} />
                        </View>
                        <Text
                            style={[
                                globalStyles.textCenter,
                                globalStyles.mt2,
                                globalStyles.mb2,
                                globalStyles.op5,
                                {color: '#aaa'}
                            ]}>
                            {' '}
                            You don't have any active repairs.
                        </Text>
                    </View>
                ) : (
                    repairs.map((item, index) => {
                        return (
                            <View key={index}>
                                <Text>{item.name}</Text>
                                <Text>{item.description}</Text>
                                <Text>{item.price}</Text>
                            </View>
                        );
                    })
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
    },
    message: {
        textAlign: 'center',
        padding: 20,
    },
});

export default Bookings;
