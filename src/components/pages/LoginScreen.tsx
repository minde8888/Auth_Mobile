import { TextInput } from '../TextInput/TextInput';
import { View, StyleSheet, Button } from 'react-native';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler, FieldValues } from 'react-hook-form';

const LoginScreen = () => {

    const { ...methods } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = ((data) => console.log(data));

    const onError: SubmitErrorHandler<FieldValues> = (errors, e) => {
        return console.error(errors)
    };

    return (
        <View style={styles.container}>
            <FormProvider {...methods}>
                <TextInput
                    name="email"
                    label="Email"
                    placeholder="email@example.com"
                    keyboardType="email-address"
                    rules={{ required: 'Email is required!' }}
                />
                <TextInput
                    name="password"
                    label="Password"
                    secureTextEntry
                    rules={{ required: 'Password is required!' }}
                />
            </FormProvider>
            <View style={styles.button}>
                <Button
                    color="#f194ff"
                    title="Login"
                    onPress={methods.handleSubmit(onSubmit, onError)}
                />
            </View>
        </View>
    );
};  



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 10,
        padding: 8,
        backgroundColor: '#0e101c',
    },

    button: {
        marginTop: 40,
        color: 'black',
        height: 40,
        borderRadius: 4,
    }
});

export default LoginScreen;