import { gql } from "@apollo/client";

const getMeDetails = gql `query me {
    me {
      id
      websiteAccessToken
      image
      email
      firstName
      lastName
      companyName
      designation
      github
      linkedIn
      mobile
      stackOverflow
      experience {
        year
        month
      }
      dateOfBirth
      chatToken
      isEmailVerify
      username
      userType
      isOnboardingCompleted
      isOnboardingSkipped
      isFreeGroupAssessmentRegistration
      timezone
      roles {
        isDefaultRole
        status
        role {
          id
          name
        }
      }
      accessSettings {
        freeCourses
        freeCourseExpiresAt
      }
      enterprise {
        id
        name
        identityClient
        branding {
          logoWithTexturl
          emailTemplateLogoUrl
          logoWithWhiteBackgroundUrl
          logoWithBlackBackgroundUrl
          playerLogoUrl
        }
      }
      isSkipProductIntroduced
      isProductIntroduced
      isProductTourAccessed
      trialInfo {
        feedbackInfo {
          isSubmitted
          enableTopBand
          enableLeftBand
        }
      }
      gamificationProfile {
        id
        hasVisitedGamificationPage
      }
      isGetStartedSkipped
      isGetStartedCompleted
      onboarding {
        enableSkip
        isCompleted
        isShow
        isSkipped
        userType
        completedStep
      }
      totalCourses
      country {
        id
        name
      }
    }
  }`

  export { getMeDetails };
 
