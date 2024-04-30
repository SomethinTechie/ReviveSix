import React, {useState} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';

function RegisterScreen({ navigation }) {
    // Set the status bar color to blue on Android
    if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#ffffff');
    }

    // Set the status bar content style to light on iOS
    if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('light-content');
    }
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // Errors
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    //onkeyup event clear out the error message
    const clearError = () => {
        setNameError('');
        setEmailError('');
        setPasswordError('');
    };

    const signUp = () => {
        fetch('https://app.computerguardian.co.za/api/auth/register/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    // The user is registered successfully
                    navigation.navigate('SuccessScreen');
                } else {
                    // Handle registration failure
                    setEmailError(data.errors.email);
                    setNameError(data.errors.name);
                    setPasswordError(data.errors.password);

                    // Alert.alert('Registration failed', data.errors);
                }
            })
            .catch(error => {
                // Handle request failure
                console.log(error.errors);
                Alert.alert('Request failed', error.errors);
            });
    };

    return (
        <SafeAreaView
            style={[globalStyles.container, {backgroundColor: '#111',padding: 10}]}>
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
                Create account
            </Text>
            <View style={[globalStyles.card]}>
                <View style={[globalStyles.inputGroup, globalStyles.bb1]}>
                    <Text style={globalStyles.label}>Fullname</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Enter fullname"
                        placeholderTextColor="#888"
                        onChangeText={text => setName(text)}
                        onFocus={() => clearError()}
                        value={name}
                    />
                </View>
                {nameError && (
                    <Text style={globalStyles.error}>{nameError}</Text>
                )}
                <View style={[globalStyles.inputGroup, globalStyles.bb1]}>
                    <Text style={globalStyles.label}>Email</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Enter Email"
                        placeholderTextColor="#888"
                        onChangeText={text => setEmail(text)}
                        onFocus={() => clearError()}
                        value={email}
                    />
                </View>
                {emailError && (
                    <Text style={globalStyles.error}>{emailError}</Text>
                )}
                <View style={[globalStyles.inputGroup, globalStyles.bb1]}>
                    <Text style={globalStyles.label}>Password</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        onChangeText={text => setPassword(text)}
                        value={password}
                        onFocus={() => clearError()}
                        secureTextEntry
                    />
                </View>
                {passwordError && (
                    <Text style={globalStyles.error}>{passwordError}</Text>
                )}
                <View style={[globalStyles.inputGroup]}>
                    <Text style={globalStyles.label}>Confirm</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Confirm Password"
                        placeholderTextColor="#888"
                        onChangeText={text => setConfirmPassword(text)}
                        value={confirmPassword}
                        onFocus={() => clearError()}
                        secureTextEntry
                    />
                </View>
            </View>
            <View style={globalStyles.button}>
                <TouchableOpacity onPress={() => signUp()}>
                    <Text style={globalStyles.buttonText}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
            </View>
            <View style={[globalStyles.section]}>
                <TouchableOpacity>
                    <Text
                        style={[globalStyles.textCenter, {color: '#fbb514'}]}
                        onPress={() => navigation.navigate('LoginScreen')}>
                        Already have an account, Login
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default RegisterScreen;
