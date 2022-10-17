import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
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
      }
    }
  }
`;

export const REMOVE_PACKAGE = gql`
  mutation removePackage($_id: ID!) {
    removePackage(_id: $_id) {
      package {
        _id
        trackingNumber
        urlToTracking
        expectedDelDate
        carrier
        username
      }
    }
  }
`;
export const ADD_PACKAGE = gql`
  mutation addPackage($trackingNumber: String!) {
    addPackage(trackingNumber: $trackingNumber) {
      package {
        _id
        trackingNumber
        urlToTracking
        expectedDelDate
        carrier
        username
      }
    }
  }
`;

export const UPDATE_PACKAGE = gql`
  mutation updatePackageInfo($_id: ID!) {
    updatePackageInfo(_id: $_id) {
      package {
        _id
        trackingNumber
        urlToTracking
        expectedDelDate
        carrier
        username
      }
    }
  }
`;
