import { gql } from "@apollo/client";

const All_SCHEDULES = gql`
  query AllSchedules($userId: ID!) {
    schedules(filters: { users_permissions_user: { id: { eq: $userId } } }) {
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
                attributes {
                  name
                }
              }
            }
          }
          tuesday {
            id
            timingCategory
            meal {
              data {
                id
                attributes {
                  name
                }
              }
            }
          }
          wednesday {
            id
            timingCategory
            meal {
              data {
                id
                attributes {
                  name
                }
              }
            }
          }
          thursday {
            id
            timingCategory
            meal {
              data {
                id
                attributes {
                  name
                }
              }
            }
          }
          friday {
            id
            timingCategory
            meal {
              data {
                id
                attributes {
                  name
                }
              }
            }
          }
          saturday {
            id
            timingCategory
            meal {
              data {
                id
                attributes {
                  name
                }
              }
            }
          }
          sunday {
            id
            timingCategory
            meal {
              data {
                id
                attributes {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default All_SCHEDULES;
