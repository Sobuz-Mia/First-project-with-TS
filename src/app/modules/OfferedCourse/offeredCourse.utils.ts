import { TSchedule } from './offeredCourse.interface';

export const hasTimeConflict = (
  assignedSchedule: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of assignedSchedule) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.endTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);
    // existing time = 10:30 - 12:30
    // newStart time = 9:30 - 11:30
    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
    return false;
  }
};
