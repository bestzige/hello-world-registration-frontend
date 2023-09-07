import { AxiosError } from 'axios';

export type Subject = {
  _count: {
    registrations: number;
  };
} & {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  background: string | null;
  startDate: Date;
  endDate: Date;
  registrationLimit: number;
  acceptingLimit: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Question = {
  id: string;
  name: string;
  description: string | null;
  type: InputType;
  defaultValue: string | null;
  required: boolean;
  options: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  subjectId: string;
};

export type SubjectInfo = {
  questions: Question[];
} & Subject;

export type InputType =
  | 'TEXT'
  | 'TEXTAREA'
  | 'NUMBER'
  | 'DATE'
  | 'TIME'
  | 'DATETIME'
  | 'SELECT'
  | 'RADIO'
  | 'CHECKBOX'
  | 'URL'
  | 'EMAIL'
  | 'PASSWORD'
  | 'TEL'
  | 'COLOR'
  | 'RANGE'
  | 'HIDDEN'
  | 'MONTH'
  | 'WEEK'
  | 'SEARCH';

export type InputOption = {
  value: string;
  label: string;
};

export type ApiError = AxiosError & {
  response: {
    data: {
      stack?: string;
      message?: string;
    };
  };
};
