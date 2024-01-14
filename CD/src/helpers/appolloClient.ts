import { ApolloClient, InMemoryCache } from "@apollo/client";

const cmUri = import.meta.env.VITE_CM_URI;

const cache = new InMemoryCache();

const appolloClient = new ApolloClient({
  cache,
  uri: `${cmUri}/graphql`,
});

export default appolloClient;
