import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert,
    Image,
    SafeAreaView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';

//components
import ListItem from '../../components/ListItem';
import globalStyles from '../../src/styles/GlobalStyle';
// icons
import FeatherIcon from 'react-native-vector-icons/Feather';

const data = [
    {
        icon: 'chevron-right',
        key: 'Request new quotation',
        url: 'Quotes',
        url: 'RequestQuote',
    },
];

const QuoteRequestForm = ({navigation}) => {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        fetch('https://app.computerguardian.co.za/api/quotes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setQuotes(data.quotes);
            })
            .catch(error => {
                // Handle request failure
                console.log(error);
                Alert.alert('Request failed', error.message);
            });
    }, []);
    return (
        <SafeAreaView style={globalStyles.darkContainer}>
            <View style={globalStyles.card}>
                <FlatList
                    data={data}
                    renderItem={({item, index}) => (
                        <ListItem
                            item={item}
                            index={index}
                            total={data.length}
                            navigation={navigation}
                        />
                    )}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{
                        justifyContent: 'space-between',
                    }}
                />
            </View>

            {quotes && quotes.length ? (
                <>
                    <Text style={globalStyles.sectionTitle}>Your quotes</Text>
                    <View style={globalStyles.card}>
                        <FlatList
                            data={quotes}
                            renderItem={({item, index}) => (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('ViewQuoteScreen', {
                                            quoteId: item.id,
                                        })
                                    }
                                    style={[
                                        globalStyles.listItem,
                                        globalStyles.firstListItem,
                                        globalStyles.bb1,
                                        index === 1
                                            ? globalStyles.lastListItem
                                            : {},
                                    ]}>
                                    <Text style={globalStyles.listItemTitle}>
                                        {item.device}
                                        {item.created_at ? (
                                            <Text
                                                style={[
                                                    // globalStyles.smallText,
                                                    globalStyles.op5,
                                                    globalStyles.mt2,
                                                    {
                                                        lineHeight: 23,
                                                        textAlignVertical:
                                                            'top',
                                                    },
                                                ]}>
                                                {'\n'}
                                                {moment(
                                                    item.created_at,
                                                ).fromNow()}
                                                {'  .'}
                                                {'  '}
                                                {item.status}
                                            </Text>
                                        ) : null}
                                    </Text>
                                    <FeatherIcon
                                        name="chevron-right"
                                        size={25}
                                        color="#fff"></FeatherIcon>
                                </TouchableOpacity>
                            )}
                            numColumns={1}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{
                                justifyContent: 'space-between',
                            }}
                        />
                    </View>
                </>
            ) : (
                <View
                    style={[
                        globalStyles.pageContainer,
                        globalStyles.alignContentCenter,
                    ]}>
                    <View style={[globalStyles.mb2]}>
                        <Image
                            style={[styles.image, {width: 150, height: 150}]}
                            source={require('../../src/images/invoice_11328965.png')}
                        />
                    </View>
                    <Text
                        style={[
                            globalStyles.textCenter,
                            globalStyles.mt2,
                            globalStyles.mb2,
                            globalStyles.op5,
                        ]}>
                        {' '}
                        You don't have any quotes yet.{' '}
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        opacity: 0.6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginBottom: 15,
    },
    stdButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#fbb514',
    },
    bgwhite: {
        backgroundColor: '#fff',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    mt20: {
        marginTop: 20,
    },
    // inputWrapper: {
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     flexDirection: 'row',
    //     flexWrap: 'wrap',
    // },
    // input: {
    //     paddingTop: 10,
    //     fontSize: 16,
    //     borderRadius: 6,
    //     marginBottom: 15,
    // },
    // label: {
    //     fontSize: 16,
    //     marginBottom: 5,
    //     opacity: 0.6,
    //     width: '40%',
    //     margin: 0,
    //     paddingTop: 10,
    // },
    ListItems: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
    },
});

export default QuoteRequestForm;
