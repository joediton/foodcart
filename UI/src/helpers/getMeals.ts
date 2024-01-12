import { TMeal } from "@/types";
import squidexClient from "./squidexClient";

export default async function getMeals() {
  const response = squidexClient.schemas.getSchema("meals");
  return [...(response.items as unknown as TMeal[])];
}
