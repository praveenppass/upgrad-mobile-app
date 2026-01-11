import { gql } from "@apollo/client";

const getNotesModuleList = gql`
 query notesForUserProgram($where: NotesForUserProgramWhereInput!) {
    notesForUserProgram(where: $where) {
      code
      label
      name
      level1
      level2
      totalNotes
      asset {
        code
        name
        assetType {
          type
          name
        }
      }
    }
  }`
  
  export default getNotesModuleList;

  export interface IGeneralNotesContainer {
    notesForUserProgram: NotesForUserProgram[]
    }
    
    export interface NotesForUserProgram {
    note: Note
    }
    
    export interface Note {
    id: string
    content: string
    title: string
    type: string
    createdAt: string
    updatedAt: string
    }
   