import React, {useState,useRef, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';
import globalStyles from '../src/styles/GlobalStyle';

const OnboardingScreen = ({ navigation }) => {
    // Set the status bar color to blue on Android
    if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#111111');
    }

    // Set the status bar content style to light on iOS
    if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('light-content');
    }
    const data = [0, 1, 2];
    const swiperRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [slideTitle, setSlideTitle] = useState('Request Quotation');
    const titles = ['First Slide', 'Second Slide', 'Third Slide'];
    const handleIndexChanged = newIndex => {
        // setIndex(newIndex);
        console.log(index);
        // setSlideTitle(titles[newIndex++]);
    };
    const goToNextSlide = i => {
        swiperRef.current.scrollBy(1);
        setIndex(index + 1);
        console.log(index);
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: 300,
                    backgroundColor: '#fbb514',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    paddingTop: 0,
                    zIndex: 1,
                }}>
                <View style={styles.slideFooter}>
                    <Text style={[styles.text, globalStyles.mt2]}>
                        {slideTitle}
                    </Text>
                    <Text
                        style={[
                            styles.ptag,
                            globalStyles.textCenter,
                            {padding: 30},
                        ]}>
                        Request a new quote for your services in less than 5
                        minutes.
                    </Text>
                </View>
                <TouchableOpacity
                    style={[
                        globalStyles.buttonDefault,
                        {width: 350, zIndex: 3000, backgroundColor: '#000'},
                    ]}
                    onPress={() => navigation.navigate('AuthOptionScreen')}>
                    <Text style={globalStyles.buttonDefaultText}>
                        Get Started
                    </Text>
                </TouchableOpacity>
            </View>
            <Swiper
                ref={swiperRef}
                onIndexChanged={i => handleIndexChanged(i)}
                style={styles.wrapper}
                showsButtons={false}
                buttonColor={'#FFFFFF'}
                paginationStyle={{bottom: undefined, top: 520}}
                activeDotColor={'#000000'}>
                {/* <Swiper key={data.length} scrollBy={i => setIndex(i)}>
                    {data.map((item, i) => (
                        <View key={i}></View>
                    ))}
                </Swiper> */}
                <View style={styles.slide}>
                    <Image
                        style={[styles.image]}
                        source={require('../src/images/76643.jpg')}
                    />
                    <View style={styles.slideFooter}>
                        <Text style={[styles.text, globalStyles.mt2]}>
                            Request Quotation
                        </Text>
                        <Text
                            style={[
                                styles.ptag,
                                globalStyles.textCenter,
                                {padding: 30},
                            ]}>
                            Request a new quote for your services in less than 5
                            minutes.
                        </Text>
                    </View>
                </View>
                <View style={styles.slide}>
                    <Image
                        style={styles.image}
                        source={require('../src/images/2149173724.jpg')}
                    />
                    <View style={styles.slideFooter}>
                        <Text style={[styles.text, globalStyles.mt2]}>
                            Pick up and dropoffs
                        </Text>
                        <Text
                            style={[
                                styles.ptag,
                                globalStyles.textCenter,
                                {padding: 30},
                            ]}>
                            Request a new quote for your services in less than 5
                            minutes.
                        </Text>
                    </View>
                </View>
                <View style={styles.slide}>
                    <Image
                        style={styles.image}
                        source={require('../src/images/46137.jpg')}
                    />
                    <View style={styles.slideFooter}>
                        <Text style={[styles.text, globalStyles.mt2]}>
                            Quick support
                        </Text>
                        <Text
                            style={[
                                styles.ptag,
                                globalStyles.textCenter,
                                {padding: 30},
                            ]}>
                            Request a new quote for your services in less than 5
                            minutes.
                        </Text>
                    </View>
                </View>
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        flex: 1,
        justifyContent: 'bottom',
        alignItems: 'center',
        // backgroundColor: '#fbb514',
    },
    text: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
    },
    slideFooter: {
        // backgroundColor: '#fbb514',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: -50,
        width: '100%',
    },
    skipButton: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    image: {
        width: '100%',
        height: '70%',
    },
});

export default OnboardingScreen;
