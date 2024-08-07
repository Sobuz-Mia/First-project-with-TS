import { z } from 'zod';

const preRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.string().optional(),
});
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourse: z.array(preRequisiteCourseValidationSchema),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
};
