import { gql } from "@apollo/client";

const All_MEALS = gql`
  query AllMeals {
    meals {
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

export default All_MEALS;
