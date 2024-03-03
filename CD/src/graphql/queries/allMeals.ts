import { gql } from "@apollo/client";

const All_MEALS = gql`
  query AllMeals($userId: ID!) {
    meals(filters: { users_permissions_user: { id: { eq: $userId } } }) {
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

export default All_MEALS;
