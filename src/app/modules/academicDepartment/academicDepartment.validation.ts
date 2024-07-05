import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department will be String',
    }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is required',
      invalid_type_error: 'Academic Department must be string',
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department will be String',
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'Academic Faculty is required',
        invalid_type_error: 'Academic Department must be string',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
