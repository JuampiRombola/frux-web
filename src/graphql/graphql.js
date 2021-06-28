import gql from 'graphql-tag'

export const ALL_USERS_QUERY = gql`
  query AllUsersQuery($first: Int, $last: Int, $endCursor: String, $startCursor: String, $sort: [UserSortEnum]) {
    allUsers(first: $first, last: $last, after: $endCursor, before: $startCursor, sort: $sort) {
      edges {
        node {
          dbId
          username
          email
          creationDateTime
          lastLogin
          isBlocked
          isSeeder
          isSponsor
          isSeer
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
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
        username
      }
    }
  }
`

export const USER_QUERY = gql`
  query ProjectQuery($id: Int) {
    user(dbId: $id) {
      username
      email
      latitude
      longitude
    }
  }
`
