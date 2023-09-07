import Loading from '@/components/loading';
import SubjectItem from '@/components/subject/subject-item';
import { Button } from '@/components/ui/button';
import { getSubjectList } from '@/lib/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

const SubjectList = () => {
  const { invalidateQueries } = useQueryClient();

  const { data: subjectList, isLoading, isError } = useQuery({ queryKey: ['subjectList'], queryFn: getSubjectList });

  const refresh = useCallback(() => {
    invalidateQueries(['subjectList']);
  }, [invalidateQueries]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Subject List</h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {isLoading || isError ? <Loading /> : subjectList.map((subject) => <SubjectItem key={subject.id} data={subject} />)}
      </div>

      <Button className="mt-4 block mx-auto bg-pink-500 hover:bg-pink-600 text-white" onClick={refresh}>
        รีเฟรช
      </Button>
    </div>
  );
};

export default SubjectList;
