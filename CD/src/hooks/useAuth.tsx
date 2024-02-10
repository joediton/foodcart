import * as React from "react";
import { useMutation } from "@apollo/client";
import LOGIN from "@/graphql/mutations/login";

export type UserInputs = {
  email: string;
  password: string;
};

const authContext = React.createContext({
  authed: false,
  user: { email: "", password: "" },
});

function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  const [user, setUser] = React.useState<UserInputs>({
    email: "",
    password: "",
  });

  const [doLogin] = useMutation(LOGIN, {
    variables: {
      input: {
        identifier: user.email,
        password: user.password,
        provider: "local",
      }
    },
    onCompleted(data) {
      const loginData = data?.login;
      if (!loginData) return;

      localStorage.setItem("token", loginData.jwt);

      setAuthed(true);
    }
  });

  React.useEffect(() => {
    if (user.email && user.password) {
      doLogin();
    } else {
      setAuthed(false);
      localStorage.removeItem("token");
    }
  }, [user]);

  return {
    authed,
    user,
    login(userInputs: UserInputs) {
      setUser(userInputs);
    },
    logout() {
      setUser({ email: "", password: "" });
    },
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}