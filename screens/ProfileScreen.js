import React, {useContext, useState, useEffect} from 'react';
import UserContext from '../UserContext';

import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    StatusBar,
} from 'react-native';
//icons
import FeatherIcon from 'react-native-vector-icons/Feather';
import globalStyles from '../src/styles/GlobalStyle';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
    const {user, setUser} = useContext(UserContext);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [mobileNumber, setMobileNumber] = useState(user.cellphone);

    //Residentials address
    const [address, setAddress] = useState({
        street: user.user_address ? user.user_address[0].street : null,
        city: user.user_address ? user.user_address[0].city : null,
        state: user.user_address ? user.user_address[0].state : null,
        zip: user.user_address ? user.user_address[0].zip_code : null,
    });

    const [initialState, setInitialState] = useState({
        name: user.name,
        email: user.email,
        mobileNumber: user.cellphone,
        address: {
            street: user.user_address ? user.user_address[0].street : null,
            city: user.user_address ? user.user_address[0].city : null,
            state: user.user_address ? user.user_address[0].state : null,
            zip: user.user_address ? user.user_address[0].zip_code : null,
        },
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [hasStateChanged, setHasStateChanged] = useState(false);
    useEffect(() => {
        setHasStateChanged(
            JSON.stringify(initialState) !==
                JSON.stringify({
                    name: name,
                    email: email,
                    mobileNumber: mobileNumber,
                    address: address,
                }),
        );
    }, [name, email, mobileNumber, address, initialState]);

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                hasStateChanged ? (
                    isSubmitting ? (
                        <ActivityIndicator
                            size="small"
                            color="#0000ff"
                            style={{marginRight: 20}}
                        />
                    ) : (
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text
                                style={{
                                    marginRight: 20,
                                    fontSize: 17,
                                    color: '#fbb514',
                                }}>
                                Save
                            </Text>
                        </TouchableOpacity>
                    )
                ) : isSubmitting ? (
                    <ActivityIndicator
                        size="small"
                        color="#0000ff"
                        style={{marginRight: 20}}
                    />
                ) : null,
        });
    }, [name, email, address, isSubmitting, initialState, hasStateChanged]);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        fetch(`https://app.computerguardian.co.za/api/user/${user.id}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                mobileNumber,
                address,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    setUser(data.user);
                    Alert.alert('Request submitted');
                } else {
                    Alert.alert('Update failed');
                }
            })
            .catch(error => {
                // Handle request failure
                console.log(error);
                Alert.alert('Request failed');
            });

        // Simulate a network request
        // await new Promise(resolve => setTimeout(resolve, 2000));

        // Alert.alert('Request submitted');

        setIsSubmitting(false);
        setInitialState({
            name: name,
            email: email,
            mobileNumber: mobileNumber,
            address: address,
        });
    };

    const handleChange = (name, value) => {
        setAddress(prevState => ({...prevState, [name]: value}));
    };

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
    return (
        <>
            <View style={[globalStyles.darkContainer]}>
                <Text style={[globalStyles.sectionTitle, globalStyles.mt2]}>
                    Personal details
                </Text>
                <View style={globalStyles.card}>
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
                    <View style={[globalStyles.inputGroup]}>
                        <Text style={globalStyles.label}>Cellphone</Text>
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Enter mobile number"
                            placeholderTextColor="#888"
                            onChangeText={text => setMobileNumber(text)}
                            onFocus={() => clearError()}
                            value={mobileNumber}
                        />
                    </View>
                </View>

                <Text style={[globalStyles.sectionTitle]}>
                    Residential Address
                </Text>
                <View style={globalStyles.card}>
                    <View style={[globalStyles.inputGroup, globalStyles.bb1]}>
                        <Text style={globalStyles.label}>Street</Text>
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Street"
                            placeholderTextColor="#888"
                            value={address.street || ''}
                            onChangeText={value =>
                                handleChange('street', value)
                            }
                        />
                    </View>
                    <View style={[globalStyles.inputGroup, globalStyles.bb1]}>
                        <Text style={globalStyles.label}>City</Text>
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="City"
                            placeholderTextColor="#888"
                            value={address.city || ''}
                            onChangeText={value => handleChange('city', value)}
                        />
                    </View>
                    <View style={[globalStyles.inputGroup, globalStyles.bb1]}>
                        <Text style={globalStyles.label}>State</Text>
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="State"
                            placeholderTextColor="#888"
                            value={address.state || ''}
                            onChangeText={value => handleChange('state', value)}
                        />
                    </View>
                    <View style={globalStyles.inputGroup}>
                        <Text style={globalStyles.label}>Zip code</Text>
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Zip Code"
                            placeholderTextColor="#888"
                            value={address.zip || ''}
                            onChangeText={value => handleChange('zip', value)}
                        />
                    </View>
                </View>

                <Text style={[globalStyles.sectionTitle]}>Access</Text>
                <TouchableOpacity
                    style={globalStyles.card}
                    onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={{paddingVertical: 15, color: '#fff'}}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </>
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

export default ProfileScreen;
