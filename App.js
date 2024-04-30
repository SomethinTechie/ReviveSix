/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import UserProvider from './UserProvider';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    TouchableOpacity,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//icons
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//import screen componets from the screens folder
import Onboarding from './screens/OnboardingScreen';
import Profile from './screens/ProfileScreen';
import Settings from './screens/SettingsScreen';
import Repairs from './screens/RepairsScreen';
import Messages from './screens/MessagesScreen';
import Overview from './screens/OverviewScreen';

//sub screens
import Technicians from './screens/subviews/Technicians';
import Hosting from './screens/subviews/Hosting';
import Sell from './screens/subviews/Sell';
import Booking from './screens/subviews/Booking';
import Quotes from './screens/subviews/Quotes';
import RequestQuoteScreen from './screens/subviews/RequestQuoteScreen';
import Support from './screens/subviews/Support';
import Buy from './screens/subviews/Buy';
import SubSuccessScreen from './screens/subviews/SuccessScreen';

//Sub of sub screens
import ViewQuoteScreen from './screens/subviews/ViewQuoteScreen';

//auth
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import SuccessScreen from './screens/auth/SuccessScreen';
import AuthOptionScreen from './screens/auth/AuthOptionScreen';

function Home({navigation, authUser}) {
    // Set the status bar color to blue on Android
    if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#111');
    }

    // Set the status bar content style to light on iOS
    if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('light-content');
    }
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === 'Overview') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'Repairs') {
                        iconName = focused ? 'tool' : 'tool';
                    } else if (route.name === 'Messages') {
                        iconName = focused ? 'message1' : 'message1';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'user' : 'user';
                    }

                    return <Icon name={iconName} size={20} color={color} />;
                },
                tabBarActiveTintColor: '#fbb514',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#222',
                    // height: 60,
                    // borderTopLeftRadius: 40,
                    // borderTopRightRadius: 40,
                    // borderBottomLeftRadius: 40,
                    // borderBottomRightRadius: 40,
                    // position: 'absolute',
                    borderTopWidth: 0,
                    // elevation: 0,
                    // margin: 10,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    paddingTop: 15,
                },
                // tabBarLabelStyle: {
                //     fontSize: 14,
                //     marginBottom: 0,
                //     marginBottom: -10,
                // },
            })}>
            <Tab.Screen
                authUser={authUser}
                name="Overview"
                component={Overview}
                options={{
                    headerTitle: '',
                    tabBarLabel: '',
                    headerTransparent: true,
                    headerRight: () => (
                        <Icon.Button
                            name="search1"
                            size={25}
                            color="#000"
                            backgroundColor={'transparent'}
                            onPress={() => navigation.navigate('AddRepair')}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Repairs"
                component={Repairs}
                options={{
                    tabBarLabel: '',
                    headerTintColor: '#fff',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#111',
                    },
                }}
            />
            <Tab.Screen
                name="Messages"
                component={Messages}
                options={{
                    tabBarLabel: '',
                    headerTintColor: '#fff',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#111',
                    },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: '',
                    headerTintColor: '#fff',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#111',
                    },
                }}
            />
        </Tab.Navigator>
    );
}

function App() {
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Onboarding"
                        component={Onboarding}
                        options={{
                            headerShown: false,
                            headerStyle: {
                                backgroundColor: 'transparent',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                // fontWeight: 'bold',
                            },
                        }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="Settings" component={Settings} />
                    <Stack.Screen
                        name="Support"
                        component={Support}
                        options={{
                            title: 'Tickets',
                            tabBarLabel: '',
                            headerTintColor: '#fff',
                            headerShadowVisible: false,
                            headerStyle: {
                                backgroundColor: '#111',
                            },
                        }}
                    />
                    <Stack.Screen name="Technicians" component={Technicians} />
                    <Stack.Screen name="Hosting" component={Hosting} />
                    <Stack.Screen name="Buy" component={Buy} />
                    <Stack.Screen name="Sell" component={Sell} />
                    <Stack.Screen
                        name="Booking"
                        component={Booking}
                        options={{
                            headerTintColor: '#fff',
                            headerShadowVisible: false,
                            headerStyle: {
                                backgroundColor: '#111',
                            },
                        }}
                    />
                    <Stack.Screen
                        name="Quotes"
                        component={Quotes}
                        options={{
                            tabBarLabel: '',
                            headerTintColor: '#fff',
                            headerShadowVisible: false,
                            headerStyle: {
                                backgroundColor: '#111',
                            },
                        }}
                    />
                    <Stack.Screen
                        name="ViewQuoteScreen"
                        component={ViewQuoteScreen}
                        options={{
                            tabBarLabel: '',
                            headerTintColor: '#fff',
                            headerShadowVisible: false,
                            headerStyle: {
                                backgroundColor: '#111',
                            },
                        }}
                    />
                    <Stack.Screen
                        name="SuccessScreen"
                        component={SuccessScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="SubSuccessScreen"
                        component={SubSuccessScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="RequestQuoteScreen"
                        component={RequestQuoteScreen}
                        options={{
                            title: 'Request Quote',
                            tabBarLabel: '',
                            headerTintColor: '#fff',
                            headerShadowVisible: false,
                            headerStyle: {
                                backgroundColor: '#111',
                            },
                        }}
                    />
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="AuthOptionScreen"
                        component={AuthOptionScreen}
                        options={{headerShown: false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    skipButton: {
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#3498db',
        fontSize: 16,
    },
});

export default App;
