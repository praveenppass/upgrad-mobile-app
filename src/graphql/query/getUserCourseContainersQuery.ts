import { gql } from "@apollo/client";

const getUserCourseContainersQuery = gql`query userCourseContainers($where: UserCourseContainerWhereInput!) {
    userCourseContainers(where: $where) {
      code
      level
      name
      label
      description
      totalAssets
      totalAssessments
      totalProjects
      totalAssignments
      totalHandsOns
      duration
      isCurrent
      activity {
        progress
        enableLock
      }
      asset {
        code
        name
        duration
        assetType {
          name
          type
        }
        activity {
          status
          timeSpent
          isUpgraded
          isBookMarked
          startsAt
          endsAt
          isUnlockRequested
          enableLock
          level1
          level2
        }
      }
      children {
        code
        level
        name
        label
        description
        totalAssets
        totalAssessments
        totalProjects
        totalAssignments
        totalHandsOns
        duration
        isCurrent
        activity {
          progress
          enableLock
        }
        asset {
          code
          name
          duration
          assetType {
            name
            type
          }
          activity {
            status
            timeSpent
            isUpgraded
            isBookMarked
            startsAt
            endsAt
            isUnlockRequested
            enableLock
            level1
            level2
          }
        }
        children {
          isCurrent
          asset {
            code
            name
            duration
            assetType {
              name
              type
            }
            activity {
              status
              timeSpent
              isUpgraded
              isBookMarked
              startsAt
              endsAt
              isUnlockRequested
              enableLock
              level1
              level2
            }
          }
        }
      }
    }
  }
  `;

export { getUserCourseContainersQuery };
