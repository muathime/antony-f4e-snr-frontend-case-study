export interface Parent {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
}

export interface Student {
  firstName: string;
  middleName: string;
  lastName: string;
  image: string;
  dateOfBirth: string;
  gender: string;
  grade: string;
  parent: Parent;
}
