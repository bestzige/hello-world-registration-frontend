import Loading from '@/components/loading';
import NotFound from '@/components/not-found';
import SubjectItem from '@/components/subject/subject-item';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { getSubjectInfo, register } from '@/lib/api';
import { UserCreateFormValues, userCreateSchema } from '@/lib/model';
import { ApiError, InputOption } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

type SubjectDetailsProps = {
  subjectId: string;
};

const SubjectDetails = ({ subjectId }: SubjectDetailsProps) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['subjectInfo', subjectId],
    queryFn: ({ queryKey }) => getSubjectInfo(queryKey[1]),
  });

  const form = useForm<UserCreateFormValues>({
    resolver: zodResolver(userCreateSchema),
    mode: 'onBlur',
    defaultValues: {
      id: '',
      name: '',
      email: '',
      password: '',
      answers: [],
      subjectId,
    },
  });

  const { mutate: registerMutate, isLoading: isRegistering } = useMutation(register, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjectList'] });
      queryClient.invalidateQueries({ queryKey: ['subjectInfo', subjectId] });
      toast({
        title: 'สมัครเข้าร่วมเรียบร้อย',
        description: 'คุณได้สมัครเข้าร่วมวิชานี้เรียบร้อยแล้ว',
        duration: 5000,
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: error.response?.data.message ?? 'เกิดข้อผิดพลาดในระบบ',
        duration: 5000,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (input: UserCreateFormValues) => {
    const answers = form.getValues('answers');

    if (!answers) {
      form.setValue('answers', []);
    }

    const questions = data?.questions ?? [];
    const requiredQuestions = questions.filter((question) => question.required);
    const requiredQuestionIds = requiredQuestions.map((question) => question.id);
    const answerQuestionIds = answers?.map((answer) => answer.questionId);
    const noAnswerQuestionNames = requiredQuestionIds
      .filter((questionId) => !answerQuestionIds?.includes(questionId))
      .map((questionId) => {
        const question = questions.find((question) => question.id === questionId);
        return question?.name;
      });

    if (noAnswerQuestionNames.length > 0) {
      toast({
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        description: `กรุณากรอกข้อมูล (${noAnswerQuestionNames.join(', ')})`,
        duration: 5000,
        variant: 'destructive',
      });
      return;
    }

    registerMutate(input);
  };

  const onAnswerChange = (questionId: string, value: string) => {
    const answers = form.getValues('answers');

    if (!answers) {
      form.setValue('answers', [{ questionId, value }]);
      return;
    }

    const index = answers.findIndex((answer) => answer.questionId === questionId);
    if (index === -1) {
      form.setValue('answers', [...answers, { questionId, value }]);
      return;
    }

    answers[index].value = value;
    form.setValue('answers', answers);

    form.trigger('answers');
  };

  if (!data && !isLoading) {
    return <NotFound />;
  }

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 w-full">
      <div className="col-span-1">
        <SubjectItem data={data} noButton />
        <Link to={`/subjects`} className="w-full">
          <Button className="w-full my-2">ย้อนกลับ</Button>
        </Link>
      </div>
      <Card className="col-span-2 p-4 h-fit">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ชื่อ-นามสกุล (Name-Surname) <span className="text-red-500">*</span>
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="ชื่อ-นามสกุล" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    รหัสนักศึกษา (Student ID) <span className="text-red-500">*</span>
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="รหัสนักศึกษา (11 หลัก)" {...field} minLength={11} maxLength={11} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    อีเมล (Email) <span className="text-red-500">*</span>
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="อีเมลที่สามารถติดต่อได้" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {data.questions?.length > 0 && (
              <>
                <Separator />
                <h1 className="text-xl font-bold">คำถามสำหรับการพิจารณาการคัดเลือก</h1>
              </>
            )}
            {data.questions.map((question, index) => (
              <FormItem key={question.id}>
                {question.type !== 'CHECKBOX' && (
                  <FormLabel>
                    {(question.name && `${index + 1}. ${question.name}`) || `คำถามที่ ${index + 1}`} {question.required && <span className="text-red-500">*</span>}
                    <FormDescription>{question.description}</FormDescription>
                  </FormLabel>
                )}
                <FormControl>
                  {question.type === 'TEXTAREA' ? (
                    <Textarea onChange={(e) => onAnswerChange(question.id, e.target.value)} required={question.required} />
                  ) : question.type === 'CHECKBOX' ? (
                    <div className="flex items-center space-x-2">
                      <Checkbox id={`Q-${question.id}`} onCheckedChange={(checked) => onAnswerChange(question.id, `${checked}`)} required={question.required} />
                      <label htmlFor={`Q-${question.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {question.name}
                      </label>
                    </div>
                  ) : question.type === 'RADIO' ? (
                    <RadioGroup onValueChange={(value) => onAnswerChange(question.id, value)} required={question.required}>
                      {JSON.parse(question.options ?? '[]').map((option: InputOption) => (
                        <div key={`Q-${question.id}-O-${option.value}`} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`Q-${question.id}-O-${option.value}`} />
                          <Label htmlFor={`Q-${question.id}-O-${option.value}`}>{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : question.type === 'SELECT' ? (
                    <Select onValueChange={(value) => onAnswerChange(question.id, value)} required={question.required}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={`กรุณาเลือก ${question.name}`} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {JSON.parse(question.options ?? '[]').map((option: InputOption) => (
                          <SelectItem key={`Q-${question.id}-O-${option.value}`} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      type={question.type}
                      onChange={(e) => onAnswerChange(question.id, e.target.value)}
                      required={question.required}
                      defaultValue={question.defaultValue ?? ''}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
            <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white" disabled={isRegistering}>
              {isRegistering ? 'กำลังสมัคร...' : 'สมัครเข้าร่วม'}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SubjectDetails;
