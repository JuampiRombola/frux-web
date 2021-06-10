import gql from 'graphql-tag'

export const ALL_USERS_QUERY = gql`
  query AllUsersQuery {
    allUsers {
      edges {
        node {
          dbId
          name
          email
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

export const ALL_PROJECTS_QUERY = gql`
  query AllProjectsQuery($limit: Int) {
    allProjects(first: $limit) {
      edges {
        node {
          dbId
          name
          category {
            name
          }
          currentState
          goal
          amountCollected
          owner {
            dbId
            name
            email
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

export const INVESTORS_QUERY = gql`
  query ProjectQuery($id: Int) {
    project(dbId: $id) {
      investors {
        edges {
          node {
            user {
              dbId
              name
              email
            }
            investedAmount
            dateOfInvestment
          }
        }
      }
    }
  }
`

export const PROJECT_QUERY = gql`
  query ProjectQuery($id: Int) {
    project(dbId: $id) {
      name
      description
      currentState
      goal
      amountCollected
      category {
        name
      }
      owner {
        dbId
        name
      }
    }
  }
`
