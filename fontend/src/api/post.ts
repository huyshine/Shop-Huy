import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  {
    posts {
      id
      title
      content
      image
    }
  }
`;

export const GET_POST = gql`
  query post($id: Int!) {
    post(id: $id) {
      id
      title
      content
      image
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      id
      title
      content
      image
    }
  }
`;

export const DELETE_POST = gql`
  mutation removePost($id: Int!) {
    removePost(id: $id) {
      title
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($updatePostInput: UpdatePostInput!) {
    updatePost(updatePostInput: $updatePostInput) {
      title
      content
      image
    }
  }
`;