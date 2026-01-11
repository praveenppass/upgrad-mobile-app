import { gql } from "@apollo/client";

const getMilestoneListQuery = gql`
	query userProgramContainers($where: UserProgramContainerWhereInput!) {
		userProgramContainers(where: $where) {
			code
			level
			name
			label
			aliasName
			description
			duration
			totalAssessments
			isCurrent
			isOptional
			activity {
				isFromDeferral
				status
				totalSubmissions
				totalCompletedSubmissions
				totalAssessments
				totalProjects
				totalAssignments
				totalGradableAssets
				totalCompletedGradableAssets
				progress
				enableLock
				startsAt
				endsAt
				duration
				completedDuration
				availableFrom
				availableTill
				dueAt
				deadlineReferredFrom
				extensionRequests {
					requestedAt
				}
			}
			asset {
				id
				code
				name
				duration
				assetType {
					type
					name
				}
				activity {
					status
					isBookMarked
					timeSpent
					expiresAt
					isUpgraded
					startsAt
					endsAt
					isUnlockRequested
					enableLock
					isBookMarked
					level1
					level2
					level3
					level4

					extensionRequests {
						requestedAt
					}
					deadlineReferredFrom
					availableTill
				}
			}
			children {
				code
				level
				name
				label
				aliasName
				description
				isOptional
				activity {
					status
					progress
					enableLock
					startsAt
					endsAt
					availableFrom
					availableTill
					dueAt
					deadlineReferredFrom
					extensionRequests {
						requestedAt
					}
				}
				asset {
					id
					code
					name
					duration
					assetType {
						type
						name
					}
					activity {
						status
						isBookMarked
						timeSpent
						expiresAt
						isUpgraded
						startsAt
						endsAt
						isUnlockRequested
						enableLock
						isBookMarked
						level1
						level2
						level3
						level4
						extensionRequests {
							requestedAt
						}
						deadlineReferredFrom
						availableTill
					}
				}
				children {
					code
					level
					name
					label
					description
					aliasName
					activity {
						status
						progress
						enableLock
						startsAt
						endsAt
						availableFrom
						availableTill
						dueAt
						deadlineReferredFrom
						extensionRequests {
							requestedAt
						}
					}
					asset {
						id
						code
						name
						duration
						assetType {
							type
							name
						}
						activity {
							status
							isBookMarked
							timeSpent
							expiresAt
							isUpgraded
							startsAt
							endsAt
							isUnlockRequested
							enableLock
							isBookMarked
							level1
							level2
							level3
							level4
							extensionRequests {
								requestedAt
							}
							deadlineReferredFrom
							availableTill
						}
					}
				}
			}
		}
	}
`;

const getMilestoneOnlyListQuery = gql`
	query userProgramContainers($where: UserProgramContainerWhereInput!) {
		userProgramContainers(where: $where) {
			code
			level
			name
			label
			aliasName
			description
			duration
			totalAssessments
			isCurrent
			isOptional
			activity {
				status
				progress
				enableLock
				startsAt
				endsAt
				gradableAssetProgress
				availableFrom
				availableTill
				dueAt
				totalCompletedSubmissions
				totalSubmissions
				deadlineReferredFrom
				extensionRequests {
					requestedAt
				}
			}

			asset {
				id
				code
				name
				duration
				assetType {
					type
					name
				}
				activity {
					status
					isBookMarked
					timeSpent
					expiresAt
					isUpgraded
					startsAt
					endsAt
					isUnlockRequested
					enableLock
					isBookMarked
					level1
					level2
					level3
					level4
					extensionRequests {
						requestedAt
					}
					deadlineReferredFrom
					availableTill
				}
			}
			activity {
				progress
				enableLock
				startsAt
				endsAt
				gradableAssetProgress
				status
			}
		}
	}
`;

export { getMilestoneListQuery, getMilestoneOnlyListQuery };
