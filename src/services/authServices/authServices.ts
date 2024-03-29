import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../../redux/store";
import { userLogout } from "../../redux/slice/authSlice";
import api from "../api/instanceApi";
import { ServerError } from "../typings";
import AuthError from "../handleServerError/AuthError";
import RegisterError from "../handleServerError/RegisterError";

const AUTH_URL = "Auth/";

interface Response {
  errors: string;
  token: string;
  refreshToken: string;
  susses: boolean;
  user: User;
}

interface User {
  $id: string;
  name: string;
  surname: string;
  email: string;
  roles?: string;
  phoneNumber: string;
  imageName?: string;
}

export const login = async (
  email: string,
  password: string
): Promise<Response> => {
  try {
    const { data } = await api.post<Response>(AUTH_URL + "Login", {
      email: email,
      password: password,
    });

    if (!(Object.keys(data).length !== 0)) {
      throw Error("no user found");
    }
    return { ...data, errors: data.errors ? data.errors[0] : "" };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response?.data) {
        throw new AuthError(serverError.response.data.errors.$values[0]);
      }
      throw new AuthError(error.message);
    }
    throw error;
  }
};

export const logout = (): void => {
  store.dispatch(userLogout());
};

export const register = async (
  name: string,
  surname: string,
  mobile: string,
  email: string,
  password: string,
  role: string
) => {
  try {
    return await api.post<AxiosResponse>(AUTH_URL + "signup", {
      name: name,
      surname: surname,
      phoneNumber: mobile,
      email: email,
      password: password,
      Roles: role,
    });
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        throw new RegisterError(serverError.response.data.errors.$values[0]);
      }
      throw new RegisterError(error.message);
    }
    throw error;
  }
};
