import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getSubjectDisabledType } from '@/lib/utils';
import { Subject } from '@/types';
import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

type SubjectItemProps = {
  data: Subject;
  noButton?: boolean;
};

const bgStyle = (url: string): CSSProperties => {
  return {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(3px)',
    WebkitFilter: 'blur(3px)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  };
};

const SubjectItem = ({ data, noButton }: SubjectItemProps) => {
  const disableType = getSubjectDisabledType(data);

  return (
    <Card className="relative h-fit bg-transparent">
      <div style={bgStyle(data.image ?? '')} className="rounded-lg" />
      <CardHeader className="space-y-1 py-2 px-2">
        <CardTitle className="text-2xl text-center line-clamp-1">{data.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 mt-0 mb-2 p-4">
        <Avatar className="w-32 h-32 mx-auto rounded-lg">
          <AvatarImage src={data.image ?? ''} alt={data.name} />
          <AvatarFallback />
        </Avatar>
        <p className="text-center text-sm line-clamp-2 h-[40px]">{data.description}</p>
      </CardContent>
      {!noButton && (
        <CardFooter className="mb-3">
          {disableType ? (
            <Button className="w-full" disabled>
              {disableType === 'FULL' && 'เต็มแล้ว'}
              {disableType === 'ENDED' && 'ปิดรับสมัครแล้ว'}
              {disableType === 'NOT_STARTED' && 'ยังไม่เปิดรับสมัคร'}
            </Button>
          ) : (
            <Link to={`/subjects/${data.id}`} className="w-full">
              <Button className="w-full">สมัครเข้าร่วม</Button>
            </Link>
          )}
        </CardFooter>
      )}
      {noButton && <div className="mb-4" />}
      <Badge className="absolute bottom-2 right-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full">
        สมัครแล้ว&nbsp;
        <span className="font-bold">{data._count.registrations}</span>&nbsp; คน
      </Badge>
    </Card>
  );
};

export default SubjectItem;
