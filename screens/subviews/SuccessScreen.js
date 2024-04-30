import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import globalStyles from '../../src/styles/GlobalStyle';

// icons
import Check from '../../components/icons/Check';

export default class SuccessScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View
                style={[
                    globalStyles.container,
                    globalStyles.alignContentCenter,
                ]}>
                <View style={globalStyles.mb2}>
                    <Check width={60} height={60} fill={'black'} />
                </View>
                <Text
                    style={[
                        globalStyles.textCenter,
                        globalStyles.mt2,
                        globalStyles.mb2,
                    ]}>
                    {' '}
                    Your request for quotation has successfully {'\n'}been
                    submitted, you can expect{'\n'} comminication within 24hrs.{' '}
                </Text>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate('RequestQuoteScreen')
                    }
                    style={[
                        globalStyles.button,
                        globalStyles.mt2,
                        {width: '50%'},
                    ]}>
                    <Text style={globalStyles.buttonText}>Done</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
