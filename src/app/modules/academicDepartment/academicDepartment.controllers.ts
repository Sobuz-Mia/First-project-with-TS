import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.services';
import sendResponse from '../../utils/sendResponse';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Created successfully',
    data: result,
  });
});
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAllAcademicDepartment();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Academic Department Retrieved successfully',
    data: result,
  });
});
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { DepartmentId } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartment(DepartmentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Retrieved successfully',
    data: result,
  });
});
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { DepartmentId } = req.params;
  const result = await AcademicDepartmentServices.updateAcademicDepartment(
    DepartmentId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Update successfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
