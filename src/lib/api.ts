import { UserCreateFormValues } from '@/lib/model';
import { Subject, SubjectInfo } from '@/types';
import axios from 'axios';

const getSubjectList = async (): Promise<Subject[]> => {
  return axios.get('http://localhost:25500/api/v1/subjects/list').then((res) => res.data);
};

const getSubjectInfo = async (id: string): Promise<SubjectInfo> => {
  return axios.get(`http://localhost:25500/api/v1/subjects/info/${id}`).then((res) => res.data);
};

const register = async (data: UserCreateFormValues): Promise<void> => {
  return axios.post('http://localhost:25500/api/v1/users/register', data).then((res) => res.data);
};

export { getSubjectInfo, getSubjectList, register };
