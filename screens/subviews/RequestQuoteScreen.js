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

const RequestQuoteScreen = ({navigation}) => {
    const {user, setUser} = useContext(UserContext);
    const devices = [
        {id: '1', name: 'Laptop'},
        {id: '2', name: 'Mobile phone'},
        {id: '3', name: 'Tablet'},
    ];
    const [serviceCategories, setServiceCategories] = useState([]);
    const [branches, setBranches] = useState([]);

    const [isRequestingCollection, setIsRequestingCollection] = useState(false);
    const [isQuestionsModalVisible, setIsQuestionsModalVisible] =
        useState(false);

    useEffect(() => {
        fetch(
            'https://app.computerguardian.co.za/api/quote/request/form/data',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            },
        )
            .then(response => response.json())
            .then(data => {
                console.log(data.services);
                console.log(data.branches);

                setServiceCategories(data.services);
                setBranches(data.branches);
            })
            .catch(error => {
                console.log(error);
                Alert.alert('Request failed', error.message);
            });
    }, []);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDevicesModalVisible, setIsDevicesModalVisible] = useState(false);
    const [isBranchesModalVisible, setIsBranchesModalVisible] = useState(false);

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

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [initialState, setInitialState] = useState({
        deviceType: '',
        laptopMake: '',
        laptopModel: '',
        processor: '',
        ram: '',
        storage: '',
        serviceCategory: '',
        serviceDescription: '',
        branch: '',
        requestPickup: '',
        pickupDate: '',
    });

    const [hasStateChanged, setHasStateChanged] = useState(false);
    useEffect(() => {
        setHasStateChanged(
            JSON.stringify(initialState) !==
                JSON.stringify({
                    deviceType: deviceType,
                    laptopMake: laptopMake,
                    laptopModel: laptopModel,
                    processor: processor,
                    ram: ram,
                    storage: storage,
                    serviceCategory: serviceCategory,
                    serviceDescription: serviceDescription,
                    branch: branch,
                    requestPickup: requestPickup,
                    pickupDate: pickupDate,
                }),
        );
    }, [
        deviceType,
        laptopMake,
        laptopModel,
        processor,
        ram,
        storage,
        serviceCategory,
        serviceDescription,
        branch,
        requestPickup,
        pickupDate,
        initialState,
    ]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                hasStateChanged ? (
                    isSubmitting ? (
                        <ActivityIndicator
                            size="small"
                            color="#ffffff"
                            style={{marginRight: 20}}
                        />
                    ) : (
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text
                                style={{
                                    marginRight: 10,
                                    fontSize: 17,
                                    color: '#fbb514',
                                }}>
                                Submit
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
    }, [
        deviceType,
        laptopMake,
        laptopModel,
        processor,
        ram,
        storage,
        serviceCategory,
        serviceDescription,
        branch,
        requestPickup,
        pickupDate,
        isSubmitting,
        initialState,
        hasStateChanged,
    ]);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Simulate a network request
        fetch(
            `https://app.computerguardian.co.za/api/quote/create/${user.id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
                body: JSON.stringify({
                    deviceType,
                    laptopMake,
                    laptopModel,
                    processor,
                    ram,
                    storage,
                    serviceCategory,
                    serviceDescription,
                    branch,
                    requestPickup,
                    pickupDate,
                    user_id: user.id,
                    isRequestingCollection,
                }),
            },
        )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setIsSubmitting(false);
                //empty all textinputs
                setDeviceType('');
                setLaptopMake('');
                setLaptopModel('');
                setProcessor('');
                setRam('');
                setStorage('');
                setServiceCategory('');
                setServiceDescription('');
                setBranch('');
                setRequestPickup('');
                setPickupDate('');
                setIsRequestingCollection('');

                navigation.navigate('SubSuccessScreen');
            })
            .catch(error => {
                console.log(error);
                setIsSubmitting(false);
                Alert.alert('Request failed', error.message);
            });

        setIsSubmitting(false);
    };

    return (
        <ScrollView style={globalStyles.darkContainer}>
            <Text style={[globalStyles.sectionTitle, globalStyles.mt2]}>
                Service details
            </Text>
            <View style={[globalStyles.card]}>
                <View style={[globalStyles.inputGroup,globalStyles.bb1]}>
                    <Text style={[globalStyles.label, {marginTop: 2}]}>
                        Device
                    </Text>
                    <TouchableOpacity
                        style={globalStyles.textInput}
                        onPress={() => setIsDevicesModalVisible(true)}>
                        <Text style={{marginTop: 2,color: '#fff'}}>
                            {deviceType || (
                                <Text
                                    style={[globalStyles.op5, {color: '#666'}]}>
                                    Select device
                                </Text>
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[globalStyles.inputGroup,globalStyles.bb1]}>
                    <Text style={globalStyles.label}>Category</Text>
                    <TouchableOpacity
                        style={globalStyles.textInput}
                        onPress={() => setIsModalVisible(true)}>
                        <Text style={{color: '#fff'}}>
                            {serviceCategory || (
                                <Text
                                    style={[globalStyles.op5, {color: '#666'}]}>
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
                        placeholderTextColor={'#555'}
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
                        placeholderTextColor={'#888'}
                        onChangeText={text => setLaptopMake(text)}
                        value={laptopMake}
                    />
                </View>
                <View style={[globalStyles.inputGroup,globalStyles.bb1]}>
                    <Text style={globalStyles.label}>Model</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Enter eg. Inspiron 15, etc."
                        placeholderTextColor={'#888'}
                        onChangeText={text => setLaptopModel(text)}
                        value={laptopModel}
                    />
                </View>
                <View style={[globalStyles.inputGroup,globalStyles.bb1]}>
                    <Text style={globalStyles.label}>Processor</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Enter eg. Intel Core i5, etc."
                        placeholderTextColor={'#888'}
                        onChangeText={text => setProcessor(text)}
                        value={processor}
                    />
                </View>
                <View style={[globalStyles.inputGroup,globalStyles.bb1]}>
                    <Text style={globalStyles.label}>RAM</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Enter eg. 8GB, etc."
                        placeholderTextColor={'#888'}
                        onChangeText={text => setRam(text)}
                        value={ram}
                    />
                </View>
                <View style={[globalStyles.inputGroup]}>
                    <Text style={globalStyles.label}>Storage</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Enter eg. 1TB HDD, etc."
                        placeholderTextColor={'#888'}
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
                    <TouchableOpacity
                        style={globalStyles.textInput}
                        onPress={() => setIsQuestionsModalVisible(true)}>
                        <Text style={[globalStyles.textInput,{marginTop: 2}]}>
                            {isRequestingCollection || (
                                <Text
                                    style={[globalStyles.op5, {color: '#fff'}]}>
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
                        <Text style={[globalStyles.label, {marginTop: 2}]}>
                            Branch
                        </Text>
                        <TouchableOpacity
                            style={globalStyles.textInput}
                            onPress={() => setIsBranchesModalVisible(true)}>
                            <Text style={[{marginTop: 2,color: '#fff'}]}>
                                {branch || (
                                    <Text
                                        style={[
                                            globalStyles.op5,
                                            {color: '#666'},
                                        ]}>
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
                                    placeholderTextColor={'#888'}
                                    onChangeText={text =>
                                        setRequestPickup(text)
                                    }
                                    value={branches}
                                />
                            </View>
                            <View style={[globalStyles.inputGroup]}>
                                <Text style={globalStyles.label}>
                                    Pickup date
                                </Text>
                                <TextInput
                                    style={globalStyles.textInput}
                                    placeholder="Enter pickup date"
                                    placeholderTextColor={'#888'}
                                    onChangeText={text => setPickupDate(text)}
                                    value={pickupDate}
                                />
                            </View>
                        </>
                    )}
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isDevicesModalVisible}
                onRequestClose={() => {
                    setIsDevicesModalVisible(!isDevicesModalVisible);
                }}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <View style={{backgroundColor: 'white'}}>
                        <Picker
                            selectedValue={deviceType}
                            onValueChange={(itemValue, itemIndex) => {
                                setDeviceType(itemValue);
                                setIsDevicesModalVisible(false);
                            }}>
                            {devices.map((item, index) => (
                                <Picker.Item
                                    key={index}
                                    label={item.name}
                                    value={item.name}
                                />
                            ))}
                        </Picker>
                        <Button
                            title="Close"
                            onPress={() => setIsDevicesModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(!isModalVisible);
                }}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <View style={{backgroundColor: 'white'}}>
                        <Picker
                            selectedValue={serviceCategory}
                            onValueChange={(itemValue, itemIndex) => {
                                setServiceCategory(itemValue);
                                setIsModalVisible(false);
                            }}>
                            {serviceCategories.map((item, index) => (
                                <Picker.Item
                                    key={index}
                                    label={item.name}
                                    value={item.name}
                                />
                            ))}
                        </Picker>
                        <Button
                            title="Close"
                            onPress={() => setIsModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isQuestionsModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(!isQuestionsModalVisible);
                }}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <View style={{backgroundColor: 'white'}}>
                        <Picker
                            selectedValue={isRequestingCollection}
                            onValueChange={(itemValue, itemIndex) => {
                                setIsRequestingCollection(itemValue);
                                setIsQuestionsModalVisible(false);
                            }}>
                            <Picker.Item label="No" value="No" />
                            <Picker.Item label="Yes" value="Yes" />
                        </Picker>
                        <Button
                            title="Close"
                            onPress={() => setIsQuestionsModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isBranchesModalVisible}
                onRequestClose={() => {
                    setIsBranchesModalVisible(!isBranchesModalVisible);
                }}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <View style={{backgroundColor: 'white'}}>
                        <Picker
                            selectedValue={branch}
                            onValueChange={(itemValue, itemIndex) => {
                                setBranch(itemValue);
                                setIsBranchesModalVisible(false);
                            }}>
                            {branches.map((item, index) => (
                                <Picker.Item
                                    key={index}
                                    label={item.name}
                                    value={item.name}
                                />
                            ))}
                        </Picker>
                        <Button
                            title="Close"
                            onPress={() => setIsBranchesModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default RequestQuoteScreen;
