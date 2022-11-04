import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String, $password: String) {
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

export const EXAMPLE_PACKAGE = gql`
  mutation examplePackage($trackingNumber: String!) {
    examplePackage(trackingNumber: $trackingNumber) {
      trackingNumber
      urlToTracking
      expectedDelDate
      carrier
      username
    }
  }
`;

export const REMOVE_PACKAGE = gql`
  mutation removePackage($trackingNumber: String!) {
    removePackage(trackingNumber: $trackingNumber) {
      _id
      trackingNumber
      urlToTracking
      expectedDelDate
      carrier
      username
    }
  }
`;
export const ADD_PACKAGE = gql`
  mutation addPackage($trackingNumber: String!) {
    addPackage(trackingNumber: $trackingNumber) {
      _id
      trackingNumber
      urlToTracking
      expectedDelDate
      carrier
      username
    }
  }
`;

export const UPDATE_PACKAGE = gql`
  mutation updatePackageInfo($trackingNumber: String!) {
    updatePackageInfo(trackingNumber: $trackingNumber) {
      _id
      trackingNumber
      urlToTracking
      expectedDelDate
      carrier
      username
    }
  }
`;
