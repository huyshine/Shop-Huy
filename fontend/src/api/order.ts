import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  {
    orderItems {
      id
      order {
        userId
      }
      product {
        name
        price
      }
      quantity
      status
    }
  }
`;
