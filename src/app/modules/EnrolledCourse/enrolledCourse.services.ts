import { TEnrolledCourse } from './EnrolledCourse.interface';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  console.log(userId, payload);
};
export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  //   updateEnrolledCourseMarksIntoDB,
};
