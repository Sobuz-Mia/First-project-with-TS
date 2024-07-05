import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // is password is not given used default password

  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // id generate

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // Check if admissionSemester is null
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found');
  }

  userData.id = await generateStudentId(admissionSemester);
  // create a user
  const newUser = await userModel.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id;

    payload.user = newUser._id; //reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
