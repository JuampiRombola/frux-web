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
  query AllProjectsQuery {
    allProjects {
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
