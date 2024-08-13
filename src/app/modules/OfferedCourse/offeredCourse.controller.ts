import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offeredCourse.services';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is create successfully',
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCourseFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is retrieved successfully',
    data: result,
  });
});
const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is retrieved successfully',
    data: result,
  });
});
const updateOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is retrieved successfully',
    data: result,
  });
});
export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
};
