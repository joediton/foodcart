import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
// import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

const cmUri = import.meta.env.VITE_CM_URI;

const cache = new InMemoryCache({
  addTypename: false,
});

// await persistCache({
//   cache,
//   storage: new LocalStorageWrapper(window.localStorage),
// });

const httpLink = new HttpLink({ uri: `${cmUri}/graphql` });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${localStorage.getItem("token")}` : null,
      },
    };
  });

  return forward(operation);
});

const appolloClient = new ApolloClient({
  cache,
  link: concat(authMiddleware, httpLink),
});

export default appolloClient;
