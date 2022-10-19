import { gql } from "@apollo/client";

export const QUERY_BASIC_ME = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_FULL_ME = gql`
  {
    me {
      _id
      username
      email

      packages {
        _id
        trackingNumber
        urlToTracking
        expectedDelDate
        carrier
      }
    }
  }
`;

export const QUERY_PACKAGE = gql`
  query package($trackingNumber: String!) {
    package(trackingNumber: $trackingNumber) {
      package {
        _id
        trackingNumber
        urlToTracking
        expectedDelDate
        carrier
      }
    }
  }
`;

export const QUERY_PACKAGES = gql`
  query packages($username: String!) {
    packages(username: $username) {
      _id
      trackingNumber
      urlToTracking
      expectedDelDate
      carrier
    }
  }
`;
