import * as React from "react";

const authContext = React.createContext({
  authed: false,
  login: () => { },
  logout: () => { },
});

function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  return {
    authed,
    login() {
      setAuthed(true);
    },
    logout() {
      setAuthed(false);
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