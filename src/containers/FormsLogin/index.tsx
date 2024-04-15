import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { StyledFormsLogin } from "./styles";
import Subtitulo from "../../components/Subtitulo";
import Input from "../../components/Input";
import Button from "../../components/Botao";
import { AuthState, IAuthForm } from "../../Interfaces";
import { authFormSchema } from "../../models/Form";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { login, setError } from "../../store/reducers/login";
import { RootReducer } from "../../store";

const FormsLogin = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAuthForm>({
    resolver: yupResolver(authFormSchema),
  });

  const dispatch = useAppDispatch();

  const handleFormSubmit = async (data: IAuthForm) => {
    const { email, password } = data;

    try {
      setLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user && user.email)
        dispatch(
          login({
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL || null,
          }),
        );
      console.log(user);
    } catch (error) {
      dispatch(setError(`${error}`));
      console.log(error);
    } finally {
      reset({
        email: "",
        password: "",
      });
      setLoading(false);
    }

  };
  return (
    <StyledFormsLogin onSubmit={handleSubmit(handleFormSubmit)}>
      <Subtitulo text="Faça login" />
      <Input
        type="email"
        id="email"
        placeholder="E-mail"
        label="E-mail:"
        {...register("email")}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <Input
        type="password"
        id="password"
        placeholder="Senha"
        label="Senha:"
        {...register("password")}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <Button color="red" type="submit" disabled={loading}>
        Entrar
      </Button>
    </StyledFormsLogin>
  );
};

export default FormsLogin;
