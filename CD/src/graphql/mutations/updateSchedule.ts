import { gql } from "@apollo/client";

const UPDATE_SCHEDULE = gql`
  mutation UpdateSchedule(
    $id: ID!
    $name: String!
    $monday: ComponentScheduleScheduleItemInput!
    $tuesday: ComponentScheduleScheduleItemInput!
    $wednesday: ComponentScheduleScheduleItemInput!
    $thursday: ComponentScheduleScheduleItemInput!
    $friday: ComponentScheduleScheduleItemInput!
    $saturday: ComponentScheduleScheduleItemInput!
    $sunday: ComponentScheduleScheduleItemInput!
  ) {
    updateSchedule(
      id: $id
      data: {
        name: $name
        monday: $monday
        tuesday: $tuesday
        wednesday: $wednesday
        thursday: $thursday
        friday: $friday
        saturday: $saturday
        sunday: $sunday
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

export default UPDATE_SCHEDULE;
