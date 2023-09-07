import NotFound from '@/components/not-found';
import SubjectDetails from '@/components/subject/subject-details';
import { useParams } from 'react-router-dom';

const Subject = () => {
  const { subjectId } = useParams();

  if (!subjectId) {
    return <NotFound />;
  }

  return <SubjectDetails subjectId={subjectId} />;
};

export default Subject;
