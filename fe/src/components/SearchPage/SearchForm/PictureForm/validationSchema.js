import * as yup from 'yup';

const validationSchema = yup.object().shape({
  dogpic: yup
    .mixed()
    .required('Це поле є обов`язковим')
    .test('fileFormat', 'Допустимими є лише картинки', (value) => {
      // TODO: define all file extentions
      return value && ['.png'].some((match) => value.match(match));
    }),
});

export default validationSchema;
