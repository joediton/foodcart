import { gql } from "@apollo/client";

const MEAL = gql`
  query Meal($id: ID!) {
    meal(id: $id) {
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

export default MEAL;
