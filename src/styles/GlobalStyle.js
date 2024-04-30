import { StyleSheet, Platform } from 'react-native'; import { Dimensions } from 'react-native';

const globalStyles = StyleSheet.create({
    primary: {
        color: '#3498db',
    },
    secondary: {
        color: '#2ecc71',
    },
    button: {
        backgroundColor: '#fbb514',
        padding: 15,
        borderRadius: 5,
        margin: 20,
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: '700',
    },
    buttonDefault: {
        borderColor: '#fbb514',
        borderWidth: 1,
        padding: 15,
        borderRadius: 5,
        margin: 20,
    },
    buttonDefaultText: {
        color: '#fbb514',
        textAlign: 'center',
        fontWeight: '700',
    },
    container: {
        flex: 1,
        ...Platform.select({
            ios: {
                backgroundColor: '#fbb514',
            },
            android: {
                backgroundColor: 'blue',
            },
        }),
    },
    pageContainer: {
        flex: 0.7,
        padding: 20,
    },
    alignContentCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fbb514',
    },
    darkText: {
        color: '#d1d1d1',
    },
    card: {
        backgroundColor: '#222',
        // paddingHorizontal: 20,
        paddingLeft: 20,
        margin: 15,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#333',
    },
    inputGroup: {
        flexDirection: 'row',
        paddingHorizontal: 0,
        paddingVertical: 15,
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 15,
        // marginBottom: 10,
        color: '#999',
    },
    textInput: {
        width: '75%',
        paddingRight: 20,
        padding: 0,
        margin: 0,
        height: 20,
        color: '#fff',
    },
    labelText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#000000',
    },
    viewTitle: {
        fontSize: 40,
        // fontWeight: '600',
        padding: 20,
    },
    section: {
        padding: 20,
    },
    textCenter: {
        textAlign: 'center',
    },
    listItem: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 0,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
        borderRadius: 10,
    },
    listItemTitle: {
        color: '#fff',
        // fontSize: 14,
        // fontWeight: '500',
    },
    sectionTitle: {
        paddingHorizontal: 25,
        fontSize: 12,
        opacity: 0.6,
        textTransform: 'uppercase',
        color: '#fff',
    },
    smallText: {
        fontSize: 12,
        opacity: 0.5,
    },
    mt1: {
        marginTop: 10,
    },
    mt2: {
        marginTop: 20,
    },
    mb2: {
        marginBottom: 20,
    },
    mb1: {
        marginBottom: 10,
    },
    mr2: {
        marginRight: 20,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginBottom: 5,
    },
    op5: {
        opacity: 0.5,
    },
    pt2: {
        paddingTop: 20,
    },
    darkContainer: {
        flex: 1,
        backgroundColor: '#111',
        color: '#fff',
    },
    logoBanner: {
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height / 2.5,
    },
    hight20: {
        height: Dimensions.get('window').height / 2.5,
    },
    mt5: {
        marginTop: 50,
    },
    cw: {
        color: '#fff',
    },
    bb1: {
        borderBottomWidth: 0.2,
        borderBottomColor: '#555',
    },
});

export default globalStyles;
