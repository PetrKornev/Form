import { useForm } from 'react-hook-form';

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
    console.log('Успешно зарегистрировано');
  };

  const validateAge = (value) => {
    const today = new Date();
    const birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age >= 18 || 'Вам должно быть 18 лет или больше';
  };

  const ErrorMessage = (error) => (error ? <p>{error}</p> : null);
  const emailError = errors.email?.message;
  const nameError = errors.name?.message;
  const passwordError = errors.password?.message;
  const confirmPasswordError = errors.confirmPassword?.message;
  const genderError = errors.gender?.message;
  const telephoneError = errors.phoneNumber?.message;
  const dateError = errors.date?.message;

  return (
    <div className="form-container">
      <h1>Регистрация пользователя</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Введите имя"
          {...register('name', {
            required: 'Поле обязательно к заполнению',
            pattern: {
              value: /^[\p{L}][\p{L}\s'-]{0,48}[\p{L}]$/u,
              message: 'Поле должно содержать буквы и начинаться не с пробела'
            }
          })}
        />
        {ErrorMessage(nameError)}
        <input
          type="email"
          placeholder="Введите email"
          {...register('email', {
            required: 'Поле обязательно к заполнению',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: 'Введите корректный email'
            }
          })}
        />
        {ErrorMessage(emailError)}
        <input
          type="password"
          placeholder="Введите пароль"
          {...register('password', {
            required: 'Поле обязательно к заполнению',
            pattern: {
              value: /^(?=.*[A-Z]).{6,}$/,
              message: 'Минимум 6 символов и хотя бы одна заглавная буква'
            },
            minLength: {
              value: 6,
              message: 'Минимум 6 символов'
            }
          })}
        />
        {ErrorMessage(passwordError)}
        <input
          type="password"
          placeholder="Подтвердите пароль"
          {...register('confirmPassword', {
            required: 'Подтвердите пароль',
            validate: (value) =>
              value === watch('password') || 'Пароли не совпадают'
          })}
        />
        {ErrorMessage(confirmPasswordError)}
        <input
          type="date"
          placeholder="Введите дату рождения"
          {...register('date', {
            required: 'Поле обязательно к заполнению',
            validate: validateAge
          })}
        />
        {ErrorMessage(dateError)}
        <label>
          <input
            type="radio"
            {...register('gender', { required: 'Выберите пол' })}
            value="male"
          />
          Мужской
        </label>
        <label>
          <input
            type="radio"
            {...register('gender', { required: 'Выберите пол' })}
            value="female"
          />
          Женский
        </label>
        {ErrorMessage(genderError)}
        <input
          type="tel"
          placeholder="Введите номер телефона"
          {...register('phoneNumber', {
            required: 'Поле обязательно к заполнению',
            pattern: {
              value: /^\+?[1-9]\d{9,14}$/,
              message: 'Введите номер телефона формата + код страны и сам номер'
            }
          })}
        />
        {ErrorMessage(telephoneError)}
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
