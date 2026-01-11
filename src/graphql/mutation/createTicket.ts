import { gql } from "@apollo/client";

const createTicketQuery = gql`mutation createTicket($data: CreateTicketInput!) {
    createTicket(data: $data) {
      id
      description
      category
      status
      createdAt
      subject
    }
}`

export { createTicketQuery }