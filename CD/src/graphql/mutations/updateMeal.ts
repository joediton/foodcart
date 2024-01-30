import { gql } from "@apollo/client";

const UPDATE_MEAL = gql`
  mutation UpdateMeal(
    $id: ID!
    $timingCategory: ENUM_MEAL_TIMINGCATEGORY!
    $ingredients: [ComponentMealsIngredientInput]!
  ) {
    updateMeal(
      id: $id
      data: { timingCategory: $timingCategory, ingredients: $ingredients }
    ) {
      data {
        attributes {
          name
          timingCategory
          ingredients {
            name
            quantity
            metricUnit
          }
        }
      }
    }
  }
`;

export default UPDATE_MEAL;
