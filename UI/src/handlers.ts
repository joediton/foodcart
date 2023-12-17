import { http, HttpResponse } from "msw";
import meals from "./data/meals";

const getMeals = http.get("api/meals", ({ request, params, cookies }) => {
  return HttpResponse.json([...meals]);
});

export const handlers = [getMeals];
