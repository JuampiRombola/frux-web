import gql from 'graphql-tag'

export const ALL_USERS_QUERY = gql`
  query AllUsersQuery {
    allUsers {
      edges {
        node {
          id
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
          id
          name
          description
          goal
          userId
          owner {
            id
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
