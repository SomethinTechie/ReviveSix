import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import globalStyles from '../../src/styles/GlobalStyle';

function AuthOptionScreen({navigation}) {
    return (
        <SafeAreaView
            style={[globalStyles.container, {backgroundColor: '#111'}]}>
            <View style={[globalStyles.logoBanner]}>
                <Image
                    style={{width: 170, height: 170, resizeMode: 'contain'}}
                    source={require('../../src/logos/logo.png')}
                />
            </View>
            <Text
                style={[
                    globalStyles.cw,
                    {
                        fontSize: 20,
                        textAlign: 'center',
                        fontWeight: '700',
                    },
                ]}>
                Everything you need
            </Text>
            <View style={globalStyles.alignContentCenter}>
                <Text
                    style={[
                        globalStyles.mt2,
                        globalStyles.cw,
                        {
                            fontSize: 16,
                            textAlign: 'center',
                            width: 300,
                            opacity: 0.8,
                        },
                    ]}>
                    Enjoy quick access to your services, everyday essentials and
                    more.
                </Text>
            </View>
            <View style={[globalStyles.alignContentCenter, globalStyles.mt5]}>
                <TouchableOpacity
                    style={[
                        globalStyles.button,
                        {
                            width: 350,
                            zIndex: 3000,
                            marginBottom: 12,
                            backgroundColor: '#fbb514',
                        },
                    ]}
                    onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={globalStyles.buttonText}>Log In</Text>
                </TouchableOpacity>
            </View>
            <View style={globalStyles.alignContentCenter}>
                <TouchableOpacity
                    style={[
                        globalStyles.buttonDefault,
                        {width: 350, zIndex: 3000, margin: 0},
                    ]}
                    onPress={() => navigation.navigate('RegisterScreen')}>
                    <Text style={globalStyles.buttonDefaultText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    width: '100%',
                    padding: 40,
                    opacity: 0.8,
                }}>
                <Text
                    style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: 12,
                    }}>
                    By continuing, you agree to our Terms of {'\n'} Service and
                    Privacy Policy.
                </Text>
            </View>
        </SafeAreaView>
    );
}

export default AuthOptionScreen;
