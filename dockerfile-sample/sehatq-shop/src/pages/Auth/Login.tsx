import React, { FC, memo, useState } from 'react';
import { Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button } from 'components';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { useMutation } from 'react-query';
import { utils } from 'helpers';
import { ApiResponse, ErrorResponse } from 'interfaces';
import Navbar from './components/Navbar';
import api from './api';
import { LoginData, UserAccount } from './interfaces';
import PasswordInput from './components/PasswordInput';

const Subtitle = styled.h6`
  color: var(--n-70);
  margin-bottom: 80px;
`;

const schema: Yup.SchemaOf<LoginData['user']> = Yup.object({
  email: Yup.string().required('required_email').email('invalid_email_format'),
  password: Yup.string().required('required_password'),
});

const Login: FC = () => {
  const [errroMessage, setErrroMessage] = useState('');
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<LoginData['user']>({ resolver: yupResolver(schema) });
  const { t } = useTranslation('login');

  const history = useHistory();

  const onSuccess = ({ data }: ApiResponse<UserAccount>) => {
    utils.setToken(data.authentication_token);
    history.push('/');
  };

  const onError = (error: any) => {
    if (error) {
      const [message] = (error as ErrorResponse).messages;
      setErrroMessage(message);
      const email = document.querySelector('[name="email"]') as HTMLInputElement;
      email?.focus();
    }
  };

  const {
    isLoading,
    mutate,
  } = useMutation((values: LoginData['user']) => api.login({ user: values }), { onSuccess, onError });

  const submit = handleSubmit(values => {
    setErrroMessage('');
    mutate(values);
  });

  return (
    <>
      <Navbar />
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-5 mx-auto mt-5">
            <div className="text-center">
              <h4 className="med-32 mb-2 text-n-90">{t('title')}</h4>
              <Subtitle className="reg-16">{t('subtitle')}</Subtitle>
            </div>
            <form onSubmit={submit}>
              <div className="form-group">
                <Form.Control placeholder="Email" {...register('email')} type="email" isInvalid={!!errors.email} />
                {errors.email?.message && (
                  <Form.Control.Feedback type="invalid">
                    {t(errors.email.message)}
                  </Form.Control.Feedback>
                )}
              </div>
              <div className="form-group">
                <PasswordInput
                  {...register('password')}
                  errorMessage={errors.password?.message && t(errors.password?.message)}
                  placeholder={t('password')}
                />
              </div>
              {errroMessage && <Alert variant="danger" message={errroMessage} inline />}
              <Button block isLoading={isLoading} type="submit">{t('sign_in')}</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Login);
