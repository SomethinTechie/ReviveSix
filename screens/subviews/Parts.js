import React, {useState} from 'react';
import {Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';

function Parts() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User signed in!');
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <>
            <TextInput
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <Button title="Sign in" onPress={signIn} />
        </>
    );
}

export default Parts;
