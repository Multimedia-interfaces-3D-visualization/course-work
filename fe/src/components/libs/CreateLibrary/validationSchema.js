import * as yup from 'yup';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  name: yup
    .string(`Введіть назву бібліотеки`)
    .min(5, `Назва має складатись мінімум з 5 символів`)
    .required(`Необхідно обов'язково вказати назву`),
  address: yup
    .string('Введіть адресу')
    .min(5, 'Адреса має містити як мінімум 5 символів')
    .required(`Необхідно обов'язково вказати назву`),
  telephone: yup
    .string('Введіть номер телефону бібліотеки')
    .min(5, 'Поштовий код має містити як мінімум 5 символів')
    // .matches(phoneRegExp, 'Вказаний номер телефону має некоректний формат')
    .required(`Необхідно обов'язково вказати номер телефону бібліотеки`),
  email: yup
    .string('Введіть пошту бібліотеки')
    .email('Введіть коректну пошту')
    .required(`Необхідно обов'язково вказати пошту бібліотеки`),
  schedule: yup
    .string(`Вкажіть розклад бібліотеки`)
    .min(5, `Розклад має складатись мінімум з 5 символів`),
  description: yup
    .string(`Введіть опис бібліотеки`)
    .min(5, `Опис має складатись мінімум з 15 символів`),
});

export default validationSchema;
