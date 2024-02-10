import { gql } from "@apollo/client";

const CREATE_MEAL = gql`
  # Write your query or mutation here
  mutation CreateMeal(
    $name: String!
    $timingCategory: ENUM_MEAL_TIMINGCATEGORY!
    $ingredients: [ComponentMealsIngredientInput]!
    $userId: ID!
  ) {
    createMeal(
      data: {
        name: $name
        timingCategory: $timingCategory
        ingredients: $ingredients
        users_permissions_user: $userId
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
          users_permissions_user {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

export default CREATE_MEAL;
