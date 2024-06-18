import { string, z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty Must be String',
    }),
  }),
});

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: string({
      invalid_type_error: 'Academic Faculty Must be String',
    }).optional(),
  }),
});

export const AcademicFacultyValidate = {
  createAcademicFacultyValidationSchema,
  updateAcademicSemesterValidationSchema,
};
