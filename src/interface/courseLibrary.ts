import { ICourseVariantEnum } from "./app.interface";
import { IAssetStatusEnum } from "./asset.interface";

export interface CourseLibraryList {
    courseLibrary?: CourseLibrary;
}

export interface CourseLibrary {
    totalCount?: number;
    result?:     Result[];
}

export interface Result {
    id?:                    string;
    code?:                  string;
    name?:                  string;
    image?:                 string;
    wsmCourse?:             number;
    courseId?:              string;
    variant?:               ICourseVariantEnum;
    category?:              Category;
    website?:               Website;
    deliveryTypes?:         DeliveryTypeElement[];
    totalLearningDuration?: number;
    totalEnrolledLearners?: number;
    learnerCourse?:         LearnerCourse | null;
    isComplimentaryForPro?: boolean | null;
    wsmProgram?:            number;
    programId?:             string;
}

export interface ISelectedLibrary { 
    id?:                    string;
    code?:                  string;
    name?:                  string;
    courseId?:              string;
    programId?:             string;
    deliveryTypes?:         DeliveryTypeElement[];
    variant?:               ICourseVariantEnum;
    website?:               Website;
}  

export interface Category {
    id?:   string;
    name?: string;
}

export interface DeliveryTypeElement {
    id?:   string;
    name?: string;
    type?: Type;
}

export enum Type {
    Blended = "blended",
    Lvc = "lvc",
    SelfpacedLvc = "selfpaced-lvc",
    SelfpacedOnly = "selfpaced-only",
}

export interface LearnerCourse {
    id?:             string;
    progressStatus?: IAssetStatusEnum;
    deliveryType?:   LearnerCourseDeliveryType;
}

export interface LearnerCourseDeliveryType {
    type?: Type;
}

export interface Website {
    enableFreeTrial?:  boolean;
    enableFreeAccess?: boolean;
    url?:              string;
}
