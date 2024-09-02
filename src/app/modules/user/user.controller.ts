import { UserServices } from './user.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// here catchAsync is a higher order function
const createStudent = catchAsync(async (req, res) => {
  const { password, student: StudentData } = req.body;
  const result = await UserServices.createStudentIntoDB(password, StudentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Created successfully',
    data: result,
  });
});
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await UserServices.getMe(userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});
export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
};
