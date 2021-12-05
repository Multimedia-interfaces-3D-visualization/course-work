import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string('Введіть вашу пошту')
    .email('Введіть коректну пошту')
    .required(`Необхідно обов'язково ввести пошту`),
  password: yup
    .string('Введіть пароль')
    .min(8, 'Пароль має містити як мінімум 8 символів')
    .required(`Необхідно обов'язково ввести пароль`),
});

export default validationSchema;
