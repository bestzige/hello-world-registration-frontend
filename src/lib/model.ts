import * as z from 'zod';

export const userCreateSchema = z.object({
  id: z
    .string({
      required_error: 'กรุณากรอกรหัสนักศึกษา',
    })
    .regex(/^[0-9]{11}$/, 'รหัสนักศึกษาต้องเป็นตัวเลข 11 หลัก')
    .min(11, 'รหัสนักศึกษาต้องมี 11 หลัก')
    .max(11, 'รหัสนักศึกษาต้องมี 11 หลัก'),
  name: z
    .string({
      required_error: 'กรุณากรอกชื่อ - นามสกุล',
    })
    .min(1, 'กรุณากรอกชื่อ - นามสกุล')
    .max(255, 'ชื่อ - นามสกุลต้องมีความยาว 3 - 255 ตัวอักษร'),
  email: z
    .string({
      required_error: 'กรุณากรอกอีเมล',
    })
    .email('กรุณากรอกอีเมลที่ถูกต้อง'),
  password: z.string().min(1).max(255).or(z.literal('')).optional(),
  subjectId: z.string({
    required_error: 'กรุณาเลือกวิชา',
  }),
  answers: z
    .array(
      z.object({
        questionId: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
});

export type UserCreateFormValues = z.infer<typeof userCreateSchema>;
