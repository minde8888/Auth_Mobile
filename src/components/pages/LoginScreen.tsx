import { TextInput } from '../TextInput/TextInput';
import { View, StyleSheet, Button, Text, Platform, Dimensions } from 'react-native';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler, FieldValues } from 'react-hook-form';
import { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { loginSuccess } from '../../redux/slice/authSlice';

type FormErrors = { email?: string, password?: string };

const LoginScreen = () => {

    const dispatch = useAppDispatch();
    const [hasErrors, setErrors] = useState<FormErrors | undefined>(undefined);
    const [response, setResponse] = useState<undefined | { status: string }>(undefined);
    const { ...methods } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = ((data) => {
        // dispatch(loginSuccess({ token: user.token, refreshToken: user.refreshToken }));
        console.log(data);
        setErrors(undefined)
        setResponse({ status: 'success' });
        methods.reset();
    });

    const onError: SubmitErrorHandler<FieldValues> = (errors, e) => {
        const errorMsg: FormErrors = {
            email: typeof errors.email?.message === 'string' ? errors.email.message : undefined,
            password: typeof errors.password?.message === 'string' ? errors.password.message : undefined
        };
        setErrors(errorMsg);
    };

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    return (
        <View style={styles.container}>
            <View style={styles.login}>
                <View>
                    <Text style={styles.title}>Login</Text>
                </View>
            </View>
            <FormProvider {...methods}>
                <TextInput
                    name="email"
                    label="Email"
                    placeholder="email@example.com"
                    keyboardType="email-address"
                    rules={{
                        required: 'Email is required!',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                        }
                    }}
                />
                {hasErrors?.email && <Text style={styles.errorMessage}>{hasErrors.email}</Text>}
                <TextInput
                    name="password"
                    label="Password"
                    placeholder="********"
                    secureTextEntry
                    rules={{
                        required: 'Password is required!',
                        pattern: {
                            value: passwordRegex,
                            message: 'Password must have 8 symbol one uppercase and one symbol (e.g. !)'
                        }
                    }}
                />
                {hasErrors?.password && <Text style={styles.errorMessage}>{hasErrors.password}</Text>}
            </FormProvider>
            <View style={styles.button}>
                <Button
                    color="#f194ff"
                    title="Login"
                    onPress={methods.handleSubmit(onSubmit, onError)}
                    disabled={response !== undefined}
                />
            </View>
        </View>
    );
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    login: {
        alignItems: 'center',
        backgroundColor: '#0e101c'
    },
    title: {
        fontSize: Platform.select({
            ios: 34,
            android: 30
        }),
        color: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 32,
        backgroundColor: '#0e101c',
        width: '100%',
    },
    errorMessage: {
        color: 'red',
        fontSize: 14,
        marginTop: 8,
    },
    button: {
        backgroundColor: '#f194ff',
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        width: screenWidth >= 768 ? '50%' : '100%',
        alignSelf: screenWidth >= 768 ? 'center' : 'flex-start',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default LoginScreen;