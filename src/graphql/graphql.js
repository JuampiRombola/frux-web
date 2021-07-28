import gql from 'graphql-tag'

export const ALL_USERS_QUERY = gql`
  query AllUsersQuery($first: Int, $last: Int, $endCursor: String, $startCursor: String, $sort: [UserSortEnum], $filters: UserFilter) {
    allUsers(first: $first, last: $last, after: $endCursor, before: $startCursor, sort: $sort, filters: $filters) {
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
          isSeeder
          isSponsor
        }
      }
      pageInfo {
        startCursor
        endCursor
      }
      totalCount
    }
  }
`

export const ALL_PROJECTS_QUERY = gql`
  query AllProjectsQuery($first: Int, $last: Int, $endCursor: String, $startCursor: String, $sort: [ProjectSortEnum], $filters: ProjectFilter) {
    allProjects(first: $first, last: $last, after: $endCursor, before: $startCursor, sort: $sort, filters: $filters) {
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
          isBlocked
        }
      }
      pageInfo {
        startCursor
        endCursor
      },
      totalCount
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
              username
              email
              firstName
              lastName
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
      dbId
      name
      description
      currentState
      goal
      userId
      categoryName
      latitude
      longitude
      signedUrl
      hasSeer
      seerId
      smartContractHash
      isBlocked
      creationDate
      deadline
      owner {
        dbId
        username
        firstName
        lastName
        email
      }
      category {
        name
      }
      stages {
        edges {
          node {
            dbId
            stageIndex
            title
            description
            goal
            creationDate
            fundsReleased
            fundsReleasedAt
          }
        }
      }
      investors {
        edges {
          node {
            dateOfInvestment
            investedAmount
          }
        }
      }
      hashtags {
        edges {
          node {
            hashtag
          }
        }
      }
      favoritesFrom {
        edges {
          node {
            user {
              dbId
              username
              firstName
              lastName
              email
            }
          }
        }
      }
      seer {
        dbId
        username
        firstName
        lastName
        email
      }
      reviews {
        edges {
          node {
            id
            score
            description
            user {
              dbId
              username
              firstName
              lastName
              email
            }
          }
        }
      }
      amountCollected
      investorCount
      favoriteCount
      generalScore
      reviewCount
    }
  }
`

export const USER_QUERY = gql`
  query UserQuery($id: Int) {
    user(dbId: $id) {
      id
      username
      email
      imagePath
      firstName
      lastName
      description
      creationDateTime
      lastLogin
      isSeer
      latitude
      longitude
      isBlocked
      wallet {
        balance
        address
      }
      interests {
        edges {
          node {
            name
          }
        }
      }
      isSeeder
      favoritedProjects {
        edges {
          node {
              project {
                dbId
                name
                categoryName
                favoriteCount
              }
          }
        }
      }
      isSponsor
      favoriteCount
      seerProjects {
        edges {
          node {
            dbId
            name
            currentState
            categoryName
            goal
            amountCollected
          }
        }
      }
      projectInvestments {
        edges {
          node {
            id
            investedAmount
            dateOfInvestment
            project {
              dbId
              name
              categoryName
              currentState
              amountCollected
              goal
            }
          }
        }
      }
      reviews {
        edges {
          node {
            id
            score
            description
            project {
              dbId
              name
              categoryName
              generalScore
            }
          }
        }
      }
      createdProjects {
        edges {
          node {
            dbId
            name
            categoryName
            goal
            currentState
            creationDate
            amountCollected
          }
        }
      }
    }
  }
`

export const CATEGORIES_QUERY = gql`
  query{
    allCategories{
      edges {
        node {
          name
        }
      }
    }
  }
`

export const BLOCK_USER_MUTATION = gql`
  mutation BlockUser($userId: Int!) {
    mutateBlockUser(userId: $userId) {
      isBlocked
    }
  }
`

export const UNBLOCK_USER_MUTATION = gql`
  mutation UnblockUser($userId: Int!) {
    mutateUnblockUser(userId: $userId){
      isBlocked
    }
  }
`

export const BLOCK_PROJECT_MUTATION = gql`
  mutation BlockProject($idProject: Int!) {
    mutateBlockProject(idProject: $idProject){
      isBlocked
    }
  }
`

export const UNBLOCK_PROJECT_MUTATION = gql`
  mutation UnblockProject($idProject: Int!) {
    mutateUnblockProject(idProject: $idProject){
      isBlocked
    }
  }
`

export const DASHBOARD_STATS = gql`
  query DashboardStats{
    stats {
      id
      totalUsers
      totalSeers
      totalProjects
      totalFavorites
      totalInvestments
      totalHashtags
    }
  }
`
