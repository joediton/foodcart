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
            timingCategory
            meal {
              data {
                id
              }
            }
          }
          tuesday {
            timingCategory
            meal {
              data {
                id
              }
            }
          }
          wednesday {
            timingCategory
            meal {
              data {
                id
              }
            }
          }
          thursday {
            timingCategory
            meal {
              data {
                id
              }
            }
          }
          friday {
            timingCategory
            meal {
              data {
                id
              }
            }
          }
          saturday {
            timingCategory
            meal {
              data {
                id
              }
            }
          }
          sunday {
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
