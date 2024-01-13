import { SquidexClient } from "@squidex/squidex";

const appName = import.meta.env.VITE_APP_NAME;
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

const squidexClient = new SquidexClient({
  appName,
  clientId,
  clientSecret,
  tokenStore: new SquidexClient.StorageTokenStore(),
});

export default squidexClient;
