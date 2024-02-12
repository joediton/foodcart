import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";

import { Button, TextField } from "@mui/material";
import RootHeader from "@/components/RootHeader/RootHeader";
import { useLocation, useNavigate } from "react-router";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@apollo/client";
import LOGIN from "@/graphql/mutations/login";

const Login: FC = () => {
    const navigate = useNavigate();
    const { authed, updateAuth } = useAuth();
    const { state } = useLocation();
    const [fields, setFields] = useState({
        email: '',
        password: ''
    });
    const [doLogin] = useMutation(LOGIN, {
        variables: {
            input: {
                identifier: fields.email,
                password: fields.password,
                provider: "local",
            }
        },
        onCompleted(data) {
            const loginData = data?.login;
            if (!loginData) return;

            localStorage.setItem("token", loginData.jwt);
            localStorage.setItem("userId", loginData.user.id);
            updateAuth(loginData.jwt, loginData.user.id);
        }
    });

    useEffect(() => {
        if (authed) {
            navigate(state?.path || "/");
        }
    }, [authed]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setFields({ ...fields, [name]: value });
    }

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        doLogin();
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <RootHeader>
                <h1>Login</h1>
            </RootHeader>

            <div className="flex flex-col items-start gap-[30px] w-full">
                <TextField
                    name="email"
                    label="Email address"
                    type="email"
                    value={fields.email}
                    className="w-full"
                    onChange={handleInputChange}
                    required={true}
                    autoComplete="email"
                />

                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={fields.password}
                    className="w-full"
                    onChange={handleInputChange}
                    required={true}
                    autoComplete="current-password"
                />

                <Button variant="outlined" type="submit">Login</Button>
            </div>
        </form>
    );
}

export default Login;