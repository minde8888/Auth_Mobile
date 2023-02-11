import {
    View,
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    Text,
    StyleSheet
} from 'react-native';

/* IMPORT HOOKS AND PROPS TYPES */
import {
    useController,
    useFormContext,
    UseControllerProps
} from 'react-hook-form';

/* EXTENDING PROPS TYPES TO INHERIT NAME AND RULES FROM USECONTROLLERPROPS */
interface TextInputProps extends RNTextInputProps, UseControllerProps {
    label: string
    defaultValue?: string //ADD DEFAULT VALUE TO PROPS
}

export const TextInput = (props: TextInputProps) => {

    const { name } = props;

    const formContext = useFormContext();

    if (!formContext || !name) {
        const msg = !formContext ? "TextInput must be wrapped by the FormProvider" : "Name must be defined"
        console.error(msg)
        return null
    }

    return <ControlledInput {...props} />;

};

const ControlledInput = (props: TextInputProps) => {
console.log(props);

    const {
        name,
        label,
        rules,
        defaultValue,
        ...inputProps
    } = props;

    const { field } = useController({ name, rules, defaultValue });

    return (
        <View >
            {label && (<Text style={styles.label}>{label}</Text>)}
            <RNTextInput
                style={styles.input}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                {...inputProps}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        color: 'white',
        margin: 20,
        marginLeft: 0,
    },
    input: {
        backgroundColor: 'white',
        borderColor: 'none',
        height: 40,
        padding: 10,
        borderRadius: 4,
    }
});