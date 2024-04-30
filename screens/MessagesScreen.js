import React, {useState, useContext, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
    SafeAreaView,
    Text,
    FlatList,
    TextInput,
    Button,
    StyleSheet,
    View,
    Image,
    Alert,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import globalStyles from '../src/styles/GlobalStyle';

//contecxts
import UserContext from '../UserContext';

// icons
import Envelope from '../components/icons/Envelope';

const initialMessages = [
    // {id: '1', text: 'Hello!', user: 'user1'},
    // {id: '2', text: 'How are you?', user: 'user1'},
    // {id: '3', text: 'Great thanks and yours?', user: 'user2'},
    // {id: '4', text: 'I am well thanks?', user: 'user1'},
    // {id: '5', text: 'I how can I help you?', user: 'user2'},
    // {
    //     id: '6',
    //     text: 'I need help with my laptop, it wont trun on?',
    //     user: 'user1',
    // },
];

const MessagesScreen = ({navigation}) => {
    const {user, setUser} = useContext(UserContext);
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const [isSendingtext, setIsSendingtext] = useState(false);

    const handleSend = () => {
        setIsSendingtext(true);
        if (!input) {
            return;
        }

        //send message
        fetch(`https://app.computerguardian.co.za/api/message/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify({
                user_id: user.id,
                message: input,
            }),
        })
            .then(response => response.json())
            .then(data => {
                setIsSendingtext(false);
                setInput('');
            })
            .catch(error => {
                console.log(error);
                Alert.alert('Request failed', error.message);
            });
    };

    useFocusEffect(
        React.useCallback(() => {
            fetch(`https://app.computerguardian.co.za/api/thread/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    const messagesArray = Object.keys(data.messages).map(
                        date => ({
                            date,
                            messages: data.messages[date],
                        }),
                    );
                    // const length = Object.keys(data.messages);
                    // console.log(length);

                    console.log(messagesArray);
                    setMessages(messagesArray);
                })
                .catch(error => {
                    console.log(error);
                    Alert.alert('Request failed', error.message);
                });

            return () => {
                // Optional cleanup function
            };
        }, [isSendingtext]),
    );

    return (
        <SafeAreaView style={[globalStyles.darkContainer]}>
            {messages && messages.length ? (
                <>
                    <FlatList
                        data={messages}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <>
                                <Text style={styles.timestamp}>
                                    {item.date}
                                </Text>
                                <FlatList
                                    data={item.messages}
                                    keyExtractor={item => item.id}
                                    renderItem={({item}) => (
                                        <Text
                                            style={[
                                                styles.text,
                                                item.user_id === user.id
                                                    ? styles.user1
                                                    : styles.user2,
                                            ]}>
                                            {item.message}
                                        </Text>
                                    )}></FlatList>
                            </>
                        )}
                    />
                </>
            ) : (
                <View
                    style={[
                        globalStyles.pageContainer,
                        globalStyles.alignContentCenter,
                        {flex: 1},
                    ]}>
                    <View style={globalStyles.mb2}>
                        <Envelope width={80} height={80} fill={'#aaa'} />
                    </View>
                    <Text
                        style={[
                            globalStyles.textCenter,
                            globalStyles.mt2,
                            globalStyles.mb2,
                            globalStyles.op5,
                        ]}>
                        {' '}
                        You don't have any messages.
                    </Text>
                </View>
            )}
            <View style={[styles.inputContainer,{backgroundColor: '#333'}]}>
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Type your message here"
                    placeholderTextColor="#999"
                    style={styles.input}
                />
                <FeatherIcon.Button
                    name="send"
                    size={20}
                    color="#fff"
                    backgroundColor="transparent"
                    onPress={() => handleSend()}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5,
        // borderWidth: 1,
        borderTopWidth: 0.5,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        marginRight: 10,
        paddingHorizontal: 12,
        paddingVertical: 5,
        color: '#fff',
    },
    text: {
        padding: 10,
        fontSize: 16,
        paddingHorizontal: 12,
        marginVertical: 5,
        margin: 10,
        borderWidth: 1,
        borderColor: '#111',
    },
    user1: {
        alignSelf: 'flex-end',
        backgroundColor: '#333',
        color: '#fff'
    },
    user2: {
        alignSelf: 'flex-start',
        backgroundColor: '#ffffff',
    },
    timestamp: {
        textAlign: 'center',
        padding: 10,
        color: '#fff',
        opacity: 0.7,
    },
});

export default MessagesScreen;
