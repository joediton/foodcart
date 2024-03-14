import { gql } from "@apollo/client";

const DELETE_SCHEDULE = gql`
  mutation DeleteSchedule($id: ID!) {
    deleteSchedule(id: $id) {
      data {
        id
      }
    }
  }
`;

export default DELETE_SCHEDULE;
