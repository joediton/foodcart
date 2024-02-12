import * as React from "react";

const authContext = React.createContext({
  authed: false,
  updateAuth: (token: string, userId: string) => {
    console.log(token, userId)
  },
  userId: "",
});

function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  const [userId, setUserId] = React.useState(localStorage.getItem("userId") || "");
  const [token, setToken] = React.useState(localStorage.getItem("token") || "");

  React.useEffect(() => {
    if (token && userId) {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  }, [token, userId])

  const updateAuth = (token: string, userId: string) => {
    setToken(token);
    setUserId(userId);
  }

  return {
    authed,
    updateAuth,
    userId,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}