import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.services';

// here catchAsync is a higher order function
const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is Create successfully',
    data: result,
  });
});
const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Courses is retrieved successfully',
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});
// const updateSingleAcademicSemester = catchAsync(async (req, res) => {
//   const { semesterId } = req.params;
//   const result = await AcademicSemesterServices.updateAcademicSemesterInDB(
//     semesterId,
//     req.body,
//   );
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Semester update successfully',
//     data: result,
//   });
// });
const deletedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is Deleted successfully',
    data: result,
  });
});
export const AcademicSemesterControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deletedCourse,
};
