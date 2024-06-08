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

export const UserControllers = {
  createStudent,
};
