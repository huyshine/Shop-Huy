import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  {
    products {
      id
      name
      price
      image
      decription
      category {
        name
      }
    }
  }
`;



export const GET_PRODUCT = gql`
  query product($id: Int!) {
    product(id: $id) {
      id
      name
      price
      decription
      categoryId
    }
  }
`;


export const CREATE_PRODUCT = gql`
  mutation createProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
      price
      decription
      category {
        name
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation removeProduct($id: Int!) {
    removeProduct(id: $id) {
      name
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($updateProductInput: UpdateProductInput!) {
    updateProduct(updateProductInput: $updateProductInput) {
      name
      price
      decription
    }
  }
`;

