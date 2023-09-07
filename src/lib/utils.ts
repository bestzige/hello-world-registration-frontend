import { Subject } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const now = new Date();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSubjectDisabledType(subject: Subject) {
  const startDate = new Date(subject.startDate);

  console.log(startDate.toLocaleString());
  console.log(now.toLocaleString());

  const endDate = new Date(subject.endDate);

  const isFull = subject.registrationLimit !== -1 && subject._count.registrations >= subject.registrationLimit;
  if (isFull) return 'FULL';
  if (now < startDate) return 'NOT_STARTED';
  if (now > endDate) return 'ENDED';

  return undefined;
}
