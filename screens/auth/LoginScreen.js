import React, {useState, useContext} from 'react';
import UserContext from '../../UserContext';
import {
    Button,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Alert,
    Image,
    StatusBar,
} from 'react-native';
// import auth from '@react-native-firebase/auth';
import globalStyles from '../../src/styles/GlobalStyle';
import { SafeAreaView } from 'react-native-safe-area-context';

function LoginScreen({ navigation }) {
    // Set the status bar color to blue on Android
    if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#ffffff');
    }

    // Set the status bar content style to light on iOS
    if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('light-content');
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {user, setUser} = useContext(UserContext);

    const signIn = () => {
        fetch('https://app.computerguardian.co.za/api/auth/login/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify({email, password}),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    setUser(data.user);
                    navigation.navigate('Home');
                } else {
                    // Handle sign-in failure
                    Alert.alert('Sign-in failed', data.error);
                }
            })
            .catch(error => {
                // Handle request failure
                console.log(error);
                Alert.alert('Request failed', error.message);
            });
    };

    return (
        <SafeAreaView
            style={[globalStyles.container, {backgroundColor: '#111',padding: 20}]}>
            <View style={[globalStyles.alignContentCenter, globalStyles.mt5]}>
                <Image
                    style={{width: 170, height: 170, resizeMode: 'contain'}}
                    source={require('../../src/logos/logo.png')}
                />
            </View>
            <Text
                style={[
                    globalStyles.viewTitle,
                    {color: '#999', textAlign: 'center'},
                ]}>
                Sign in
            </Text>
            <View style={[globalStyles.card]}>
                <View style={[globalStyles.inputGroup, globalStyles.bb1]}>
                    <Text style={[globalStyles.label]}>Email</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Email"
                        placeholderTextColor="#888"
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />
                </View>
                <View style={globalStyles.inputGroup}>
                    <Text style={globalStyles.label}>Password</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry
                    />
                </View>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => signIn()}
                    style={globalStyles.button}>
                    <Text style={globalStyles.buttonText}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
            <View style={[globalStyles.section]}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('RegisterScreen')}>
                    <Text style={[globalStyles.textCenter, {color: '#fbb514'}]}>
                        Don't have an account already, register
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;
