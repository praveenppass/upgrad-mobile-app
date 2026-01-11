import { gql } from "@apollo/client";

const getTotalNotesQuery = gql
`query learnerCourseNotesCount($where: notesCountWhereInput) {
  learnerCourseNotesCount(where: $where) {
    totalCount
  }
}`

export default getTotalNotesQuery;


export interface TotalNotesInterface {
    learnerCourseNotesCount: LearnerCourseNotesCount
}
  
export interface LearnerCourseNotesCount {
    totalCount: number
}