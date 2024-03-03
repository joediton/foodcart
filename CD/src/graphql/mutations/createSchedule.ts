import { gql } from "@apollo/client";

const CREATE_SCHEDULE = gql`
  # Write your query or mutation here
  mutation CreateSchedule(
    $userId: ID!
    $name: String!
    $monday: ComponentScheduleScheduleItemInput!
    $tuesday: ComponentScheduleScheduleItemInput!
    $wednesday: ComponentScheduleScheduleItemInput!
    $thursday: ComponentScheduleScheduleItemInput!
    $friday: ComponentScheduleScheduleItemInput!
    $saturday: ComponentScheduleScheduleItemInput!
    $sunday: ComponentScheduleScheduleItemInput!
  ) {
    createSchedule(
      data: {
        name: $name
        monday: $monday
        tuesday: $tuesday
        wednesday: $wednesday
        thursday: $thursday
        friday: $friday
        saturday: $saturday
        sunday: $sunday
        users_permissions_user: $userId
      }
    ) {
      data {
        id
        attributes {
          name
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

export default CREATE_SCHEDULE;
