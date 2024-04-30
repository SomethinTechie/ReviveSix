import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    ActivityIndicator,
    Button,
    Alert,
    ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../../src/styles/GlobalStyle';

const Support = () => {
    const [service, setService] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                !isSubmitting ? (
                    <Button
                        onPress={handleSubmit}
                        backgroundColor={'transparent'}
                        title="Add"
                    />
                ) : (
                    <ActivityIndicator size="small" color="#0000ff" />
                ),
        });
    }, [navigation, isSubmitting]);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Simulate a network request
        await new Promise(resolve => setTimeout(resolve, 2000));

        Alert.alert('Request submitted', service);

        setService('');
        setDescription('');
        setIsSubmitting(false);
    };

    return (
        <ScrollView style={globalStyles.darkContainer}>
            {/* <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View> */}
            <View style={globalStyles.card}>
                <View style={[globalStyles.inputGroup, globalStyles.bb1]}>
                    <Text style={globalStyles.label}>Service</Text>
                    <TextInput
                        style={globalStyles.textInput}
                        placeholder="Select department"
                        placeholderTextColor={'#888'}
                        onChangeText={text => setService(text)}
                        value={service}
                    />
                </View>
                <Text style={[globalStyles.label, globalStyles.mt1]}>
                    Description
                </Text>
                <View style={globalStyles.inputGroup}>
                    <TextInput
                        style={[globalStyles.textInput, {width: '100%'}]}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Enter description"
                        placeholderTextColor={'#888'}
                        onChangeText={text => setDescription(text)}
                        value={description}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default Support;
