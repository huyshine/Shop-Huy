import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

export const GET_CATEGORY = gql`
  query category($id: Int!) {
    category(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      id
      name
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation removeCategory($id: Int!) {
    removeCategory(id: $id) {
      name
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $updateCategoryInput) {
      id
      name
    }
  }
`;
