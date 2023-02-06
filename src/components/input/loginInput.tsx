import { useFormContext } from "react-hook-form";
import { TextInput } from "react-native";

type Props = {
  name: string;
};

const LoginInput = ({ name}: Props) => {
  const { register } = useFormContext();

  return (<TextInput {...register(name)} />);
}


export default LoginInput;