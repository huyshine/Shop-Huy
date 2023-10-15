import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  {
    comments {
      id
      post {
        title
      }
      user {
        email
      }
      content
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      id
      content
      userId
      postId
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation removeComment($id: Int!) {
    removeComment(id: $id) {
      content
    }
  }
`;

