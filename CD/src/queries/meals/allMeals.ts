import gql from "graphql-tag";

const All_MEALS = gql`
  query Meals {
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
