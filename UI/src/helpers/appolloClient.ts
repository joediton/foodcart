import { ApolloClient, InMemoryCache } from "@apollo/client";

const appolloClient = new ApolloClient({
  uri: "https://cloud.squidex.io/app/foodcart/api/graphql",
  cache: new InMemoryCache(),
});

export default appolloClient;
