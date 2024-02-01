import { gql } from "@apollo/client";

const DELETE_MEAL = gql`
  mutation DeleteMeal($id: ID!) {
    deleteMeal(id: $id) {
      data {
        id
      }
    }
  }
`;

export default DELETE_MEAL;
