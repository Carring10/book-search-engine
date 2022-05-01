import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $email: String!, $password: String!) {
    loginUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id 
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id 
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: SaveBook) {
    saveBook(input: $input) {
    _id
    bookCount 
    savedBooks {
      bookId 
      authors 
      description 
      title 
      image 
      link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: Int!) {
    removeBook(bookId: $bookId) {
      _id 
      username 
      bookCount 
      savedBooks {
      bookId 
      authors 
      description 
      title 
      image 
      link
      }
    }
  }
`;