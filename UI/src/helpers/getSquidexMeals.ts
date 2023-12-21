import squidexClient from "./squidexClient";

export default async function getSquidexMeals() {
  return await squidexClient.schemas.getSchema("meals");
}
