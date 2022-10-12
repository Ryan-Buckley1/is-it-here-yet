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

export const REMOVE_EVENT = gql`
  mutation removeEvent($_id: ID!) {
    removeEvent(_id: $_id) {
      event {
        _id
        name
        location
        date
        requirement
        timeStart
        timeEnd
        allDay
        recurring
      }
    }
  }
`;
export const ADD_EVENT = gql`
  mutation addBill($eventData: EventInput) {
    addBill(eventData: $eventData) {
      event {
        _id
        name
        location
        date
        requirement
        timeStart
        timeEnd
        allDay
        recurring
      }
    }
  }
`;
