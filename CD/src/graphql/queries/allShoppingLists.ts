import { gql } from "@apollo/client";

const All_SHOPPING_LISTS = gql`
  query AllShoppingLists($userId: ID!) {
    shoppingLists(
      filters: { users_permissions_user: { id: { eq: $userId } } }
    ) {
      data {
        id
        attributes {
          name
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

export default All_SHOPPING_LISTS;
