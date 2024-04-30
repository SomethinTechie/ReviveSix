import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
//icons
import FeatherIcon from 'react-native-vector-icons/Feather';

const ShoppingScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Account</Text>
            <View style={styles.list}>
                <View style={[styles.listItem, styles.bb1]}>
                    <Text style={[styles.label, styles.margin0, styles.ptag]}>
                        Name: Mahlatse
                    </Text>
                    <Text style={[styles.label, styles.margin0, styles.ptag]}>
                        Mahlatse
                    </Text>
                </View>
                <View style={[styles.listItem, styles.bb1]}>
                    <Text style={[styles.label, styles.margin0, styles.ptag]}>
                        Surname:
                    </Text>
                    <Text style={[styles.label, styles.margin0, styles.ptag]}>
                        Phokwane
                    </Text>
                </View>
                <View style={[styles.listItem, styles.bb1]}>
                    <Text style={[styles.label, styles.margin0, styles.ptag]}>
                        Email:
                    </Text>
                    <Text style={[styles.label, styles.margin0, styles.ptag]}>
                        mahlatse@gmail.com
                    </Text>
                </View>
                <View style={[styles.listItem, styles.bb1]}>
                    <Text style={[styles.label, styles.margin0, styles.ptag]}>
                        Mobile number:
                    </Text>
                    <Text style={[styles.label, styles.margin0, styles.ptag]}>
                        0713194117
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>Password</Text>
                <View style={[styles.listItem, styles.bb1]}>
                    <Text style={[styles.label, styles.margin0, styles.ptag]}>
                        Password:
                    </Text>
                    <Text style={[styles.label, styles.margin0, styles.ptag]}>
                        **********
                    </Text>
                </View>

                {/* <Text style={styles.sectionTitle}>Settings</Text>
                <View style={[styles.listItem, styles.bb1]}>
                    <Text style={[styles.label, styles.margin0, styles.ptag]}>
                        Delete account
                    </Text>
                    <Text
                        style={[
                            styles.label,
                            styles.margin0,
                            styles.ptag,
                            styles.mt1,
                        ]}>
                        <FeatherIcon.Button
                            name="arrow-right"
                            size={20}
                            color="#000"
                            backgroundColor="transparent"
                            onPress={() => navigation.navigate('AddRepair')}
                        />
                    </Text>
                </View> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
    },
    description: {
        fontSize: 16,
        color: '#888',
    },
    header: {
        fontSize: 32,
        fontWeight: '600',
        padding: 20,
    },
    list: {
        width: '100%',
    },
    listItem: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    data: {
        fontSize: 24,
        fontWeight: '600',
    },
    margin0: {
        marginBottom: 0,
    },
    bb1: {
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    ptag: {
        fontSize: 18,
        color: '#444',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        padding: 20,
    },
    mt1: {
        marginTop: 10,
    },
});

export default ShoppingScreen;
