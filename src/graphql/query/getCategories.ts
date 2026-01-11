import { gql } from "@apollo/client";

const getCategories = gql`query categories($where: CategoryWhereInput) {
    categories(where: $where) {
      id
      name
      slug
    }
  }
  `;

  export { getCategories };