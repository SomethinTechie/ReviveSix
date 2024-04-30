import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../UserContext';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    ScrollView,
    ImageBackground,
    Dimensions,
} from 'react-native';
import GridItem from '../components/GridItem';
import Swiper from 'react-native-swiper';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyles from '../src/styles/GlobalStyle';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const data = [
    {icon: 'wallet', key: 'Quotes', url: 'Quotes'},
    {icon: 'calendar', key: 'Bookings', url: 'Booking'},
    {icon: 'tool', key: 'Repairs', url: 'Repairs'},
    {icon: 'customerservice', key: 'Support', url: 'Support'},
    // {icon: 'laptop', key: 'Buy Laptop', url: 'Buy'},
    // {icon: 'shoppingcart', key: 'Order parts', url: 'Parts'},
    // {icon: 'tago', key: 'Sell a laptop', url: 'Sell'},
    // {icon: 'iconfontdesktop', key: 'Hosting', url: 'Hosting'},
    // {icon: 'solution1', key: 'Technicians', url: 'Technicians'},
];

export default function App({navigation, authUser}) {
    const {user, setUser} = useContext(UserContext);

    return (
        <View style={[globalStyles.darkContainer]}>
            <View
                style={[
                    {
                        height: 400,
                        alignItems: 'center',
                        paddingTop: 50,
                    },
                ]}>
                {/* <ImageBackground
                    style={[
                        styles.image,
                        {
                            position: 'absolute',
                        },
                    ]}
                    source={require('../src/images/bg3.png')}
                /> */}
                <Swiper
                    style={styles.wrapper}
                    showsButtons={false}
                    dotColor={'#555'}
                    activeDotColor={'#fbb514'}>
                    <View style={styles.slide}>
                        <Text
                            style={[styles.mlightText, globalStyles.darkText]}>
                            Welcome back
                        </Text>
                        <Text style={[styles.lgText, globalStyles.darkText]}>
                            {user.name}
                        </Text>
                        <Text
                            style={[
                                styles.smText,
                                styles.mt20,
                                ,
                                globalStyles.darkText,
                            ]}>
                            What do you want to do today
                        </Text>
                        <Text style={[styles.smText, globalStyles.darkText]}>
                            Choose a service below.
                        </Text>
                    </View>
                    <View style={styles.slide}>
                        <Text style={[styles.lgText, globalStyles.darkText]}>
                            Parcels Book In
                        </Text>
                    </View>
                    <View style={styles.slide}>
                        <Text style={[styles.lgText, globalStyles.darkText]}>
                            Fast Support
                        </Text>
                    </View>
                </Swiper>
            </View>
            <FlatList
                data={data}
                renderItem={({item}) => (
                    <GridItem item={item} navigation={navigation} />
                )}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                columnWrapperStyle={{marginHorizontal: 0}}
                contentContainerStyle={{
                    // justifyContent: 'space-between',
                    // justifyContent: 'space-around',
                }}
                style={{paddingTop: 30}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mpadding: {
        paddingHorizontal: 10,
    },
    wrapper: {
        color: '#000',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    textCenter: {
        textAlign: 'center',
    },
    textPadding: {
        paddingHorizontal: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fbb514',
    },
    stdPadding: {
        padding: 10,
    },

    slide: {
        height: 400,
        color: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mlightText: {
        color: '#000',
        fontSize: 20,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    smText: {
        color: '#000',
        fontSize: 20,
        opacity: 0.7,
    },
    lgText: {
        color: '#000',
        fontSize: screenWidth / 12,
        fontWeight: 'bold',
    },
    mtag: {
        fontSize: 20,
    },
    mtext: {
        color: '#000',
        fontSize: 35,
    },
    skipButton: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    overviewBanner: {
        height: 500,
        backgroundColor: '#fbb514',
        justifyContent: 'center',
        marginBottom: 10,
        padding: 20,
        alignItems: 'center',
        paddingTop: 100,
    },
    mt20: {
        marginTop: 20,
    },
});
