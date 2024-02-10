import { gql } from "@apollo/client";

const All_SCHEDULES = gql`
  query AllSchedules($id: ID!) {
    schedules(filters: { users_permissions_user: { id: { eq: $id } } }) {
      data {
        id
        attributes {
          monday {
            id
            timingCategory
            meal {
              data {
                id
              }
            }
          }
          tuesday {
            id
            timingCategory
            meal {
              data {
                id
              }
            }
          }
          wednesday {
            id
            timingCategory
            meal {
              data {
                id
              }
            }
          }
          thursday {
            id
            timingCategory
            meal {
              data {
                id
              }
            }
          }
          friday {
            id
            timingCategory
            meal {
              data {
                id
              }
            }
          }
          saturday {
            id
            timingCategory
            meal {
              data {
                id
              }
            }
          }
          sunday {
            id
            timingCategory
            meal {
              data {
                id
              }
            }
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

export default All_SCHEDULES;
