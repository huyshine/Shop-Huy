import { gql } from "@apollo/client";

export const GET_USERS = gql`
  {
    users {
      id
      email
      avatar
      role
    }
  }
`;

export const GET_USER = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      name
      email
      role
    }
  }
`;
