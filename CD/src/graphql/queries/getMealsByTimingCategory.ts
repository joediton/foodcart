import { gql } from "@apollo/client";

const GET_MEALS_BY_TIMING_CATEGORY = gql`
  query GetMealsByTimingCateory($userId: ID!, $timingCategory: String!) {
    meals(
      filters: {
        users_permissions_user: { id: { eq: $userId } }
        timingCategory: { eq: $timingCategory }
      }
    ) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

export default GET_MEALS_BY_TIMING_CATEGORY;
