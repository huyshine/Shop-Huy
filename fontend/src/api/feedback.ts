import { gql } from "@apollo/client";

export const GET_FEEDBACKS = gql`
  {
    productReviews {
      id
      product {
        name
        image
      }
      user {
        email
      }
      rating
      content
    }
  }
`;

export const DELETE_FEEDBACKS = gql`
  mutation removeProductReview($id: Int!) {
    removeProductReview(id: $id) {
      rating
    }
  }
`;
