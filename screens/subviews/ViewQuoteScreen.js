import React, {useEffect, useState, useContext} from 'react';

import {
    View,
    Text,
    TextInput,
    ActivityIndicator,
    Button,
    Alert,
    TouchableOpacity,
    ScrollView,
    Modal,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
//icons
import globalStyles from '../../src/styles/GlobalStyle';

//contecxts
import UserContext from '../../UserContext';

const ViewQuoteScreen = ({navigation, route}) => {
    const {quoteId} = route.params;
    const {user, setUser} = useContext(UserContext);
    const [quote, setQuote] = useState([]);

    const [isRequestingCollection, setIsRequestingCollection] = useState(false);
    const [isQuestionsModalVisible, setIsQuestionsModalVisible] =
        useState(false);

    useEffect(() => {
        fetch(`https://app.computerguardian.co.za/api/quote/${quoteId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setQuote(data.quote);

                setDeviceType(data.quote.device);
                setLaptopMake(data.quote.make);
                setLaptopModel(data.quote.model);
                setProcessor(data.quote.processor);
                setRam(data.quote.ram);
                setStorage(data.quote.storage);
                setServiceCategory(data.quote.category);
                setServiceDescription(data.quote.description);
                setBranch(data.quote.branch);
                setRequestPickup(data.quote.request_pickup);
                setPickupDate(data.quote.pickup_date);
                setBranch(data.quote.branch);
            })
            .catch(error => {
                console.log(error);
                Alert.alert('Request failed', error.message);
            });
    }, []);

    const [deviceType, setDeviceType] = useState('');
    const [laptopMake, setLaptopMake] = useState('');
    const [laptopModel, setLaptopModel] = useState('');
    const [processor, setProcessor] = useState('');
    const [ram, setRam] = useState('');
    const [storage, setStorage] = useState('');
    const [serviceCategory, setServiceCategory] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [branch, setBranch] = useState('');
    const [requestPickup, setRequestPickup] = useState('');
    const [pickupDate, setPickupDate] = useState('');

    return (
        <ScrollView style={[globalStyles.darkContainer,{backgroundColor: '#111'}]}>
            <Text style={[globalStyles.sectionTitle, globalStyles.mt2]}>
                Service details
            </Text>
            <View style={[globalStyles.card]}>
                <View style={[globalStyles.inputGroup,globalStyles.bb1]}>
                    <Text style={[globalStyles.label, {marginTop: 2}]}>
                        Device
                    </Text>
                    <TouchableOpacity style={globalStyles.textInput}>
                        <Text style={[globalStyles.textInput,{marginTop: 2}]}>
                            {deviceType || (
                                <Text style={[globalStyles.op5,{color: '#666'}]}>
                                    No service selected
                                </Text>
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[globalStyles.inputGroup,globalStyles.bb1]}>
                    <Text style={globalStyles.label}>Category</Text>
                    <TouchableOpacity style={globalStyles.textInput}>
                        <Text>
                            {serviceCategory || (
                                <Text style={[globalStyles.op5,{color: '#fff'}]}>
                                    Select service category
                                </Text>
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[globalStyles.inputGroup]}>
                    <Text style={globalStyles.label}>Description</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Enter service description"
                        onChangeText={text => setServiceDescription(text)}
                        value={serviceDescription}
                    />
                </View>
            </View>
            <Text style={[globalStyles.sectionTitle]}>device information</Text>
            <View style={[globalStyles.card]}>
                <View style={[globalStyles.inputGroup,globalStyles.bb1]}>
                    <Text style={globalStyles.label}>Make</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Enter eg. Dell, HP, etc."
                        onChangeText={text => setLaptopMake(text)}
                        value={laptopMake}
                    />
                </View>
                <View style={[globalStyles.inputGroup,globalStyles.bb1]}>
                    <Text style={globalStyles.label}>Model</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Enter eg. Inspiron 15, etc."
                        onChangeText={text => setLaptopModel(text)}
                        value={laptopModel}
                    />
                </View>
                <View style={[globalStyles.inputGroup,globalStyles.bb1]}>
                    <Text style={globalStyles.label}>Processor</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Enter eg. Intel Core i5, etc."
                        onChangeText={text => setProcessor(text)}
                        value={processor}
                    />
                </View>
                <View style={[globalStyles.inputGroup,globalStyles.bb1]}>
                    <Text style={globalStyles.label}>RAM</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Enter eg. 8GB, etc."
                        onChangeText={text => setRam(text)}
                        value={ram}
                    />
                </View>
                <View style={[globalStyles.inputGroup]}>
                    <Text style={globalStyles.label}>Storage</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Enter eg. 1TB HDD, etc."
                        onChangeText={text => setStorage(text)}
                        value={storage}
                    />
                </View>
            </View>
            <Text style={[globalStyles.sectionTitle]}>
                Would you like to request collection?
            </Text>
            <View style={[globalStyles.card]}>
                <View style={[globalStyles.inputGroup]}>
                    <TouchableOpacity style={globalStyles.textInput}>
                        <Text style={{marginTop: 2}}>
                            {isRequestingCollection || (
                                <Text style={[globalStyles.op5,{color: '#fff'}]}>
                                    Select answer
                                </Text>
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <Text style={[globalStyles.sectionTitle]}>
                    Collection details
                </Text>
                <View style={[globalStyles.card]}>
                    <View style={[globalStyles.inputGroup,globalStyles.bb1]}>
                        <Text style={([globalStyles.label], {marginTop: 2,color: '#888'})}>
                            Branch
                        </Text>
                        <TouchableOpacity
                            style={globalStyles.textInput}
                            onPress={() => setIsBranchesModalVisible(true)}>
                            <Text style={{marginTop: 2}}>
                                {branch || (
                                    <Text style={[globalStyles.op5,{color: '#fff'}]}>
                                        Select branch
                                    </Text>
                                )}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {isRequestingCollection === 'Yes' && (
                        <>
                            <View style={[globalStyles.inputGroup,globalStyles.bb1]}>
                                <Text style={globalStyles.label}>Pickup</Text>
                                <TextInput
                                    style={globalStyles.textInput}
                                    placeholder="Enter request pickup"
                                    onChangeText={text =>
                                        setRequestPickup(text)
                                    }
                                    value={branches}
                                />
                            </View>
                            <View style={[globalStyles.inputGroup,globalStyles.bb1]}>
                                <Text style={globalStyles.label}>
                                    Pickup date
                                </Text>
                                <TextInput
                                    style={globalStyles.textInput}
                                    placeholder="Enter pickup date"
                                    onChangeText={text => setPickupDate(text)}
                                    value={pickupDate}
                                />
                            </View>
                        </>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default ViewQuoteScreen;
