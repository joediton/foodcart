import { gql } from "@apollo/client";

const All_MEALS = gql`
  query AllMeals($id: ID!) {
    meals(filters: { users_permissions_user: { id: { eq: $id } } }) {
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
