import { gql } from "@apollo/client";

export const QUERY_BASIC_ME = gql`
  query Query {
    me {
      _id
      username
      email
      packageCount
    }
  }
`;

export const QUERY_FULL_ME = gql`
  query Query {
    me {
      _id
      username
      email
      packageCount
      packages {
        trackingNumber
        urlToTracking
        expectedDelDate
        carrier
        username
        _id
      }
    }
  }
`;

export const QUERY_PACKAGE = gql`
  query Query($trackingNumber: String!) {
    package(trackingNumber: $trackingNumber) {
      _id
      trackingNumber
      urlToTracking
      expectedDelDate
      carrier
    }
  }
`;

export const QUERY_PACKAGES = gql`
  query Query($username: String!) {
    packages(username: $username) {
      _id
      trackingNumber
      urlToTracking
      expectedDelDate
      carrier
    }
  }
`;
