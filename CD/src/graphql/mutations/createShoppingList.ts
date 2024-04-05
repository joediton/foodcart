import { gql } from "@apollo/client";

const CREATE_SHOPPING_LIST = gql`
  mutation CreateShoppingList($name: String!, $userId: ID!) {
    createShoppingList(data: { name: $name, users_permissions_user: $userId }) {
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

export default CREATE_SHOPPING_LIST;
