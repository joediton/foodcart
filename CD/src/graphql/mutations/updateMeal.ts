import { gql } from "@apollo/client";

const UPDATE_MEAL = gql`
    mutation UpdateMeal {
      updateMeal($id: String!) {
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

export default UPDATE_MEAL;
