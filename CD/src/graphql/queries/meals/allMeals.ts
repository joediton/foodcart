import { gql } from "@apollo/client";

const All_MEALS = gql`
  query AllMeals($email: String!) {
    meals(filters: { users_permissions_user: { email: { eq: $email } } }) {
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

export default All_MEALS;
