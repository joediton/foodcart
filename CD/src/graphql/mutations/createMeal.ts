import { gql } from "@apollo/client";

const CREATE_MEAL = gql`
  mutation CreateMeal(
    $name: String!
    $timingCategory: ENUM_MEAL_TIMINGCATEGORY!
    $ingredients: [ComponentMealsIngredientInput]!
  ) {
    createMeal(
      data: {
        name: $name
        timingCategory: $timingCategory
        ingredients: $ingredients
      }
    ) {
      data {
        id
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

export default CREATE_MEAL;
