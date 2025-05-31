import { use, useEffect, useState } from 'react';
import { signUp } from './api';
import { Input } from './components/Input';

export function SignUp() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        username: undefined,
      };
    });
  }, [username]);

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        email: undefined,
      };
    });
  }, [email]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage();
    setGeneralError();
    setApiProgress(true);

    try {
      const response = await signUp({
        username,
        email,
        password,
      });
      setSuccessMessage(response.data.message);
    } catch (axiosError) {
      if (
        axiosError.response?.data &&
        axiosError.response.data.status === 400
      ) {
        setErrors(axiosError.response.data.validationErrors);
      } else {
        setGeneralError('Beklenmedik bir hata oluştu. Lütfen tekrar deneyin');
      }
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>Kayıt Ol</h1>
          </div>
          <div className="card-body">
            <Input
              id="username"
              label="Kullanıcı Adı Soyadı"
              error={errors.username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Input
              id="email"
              label="E-mail"
              error={errors.email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Şifre
              </label>
              <input
                id="password"
                className="form-control"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passwordRepeat" className="form-label">
                Şifre Tekrarı
              </label>
              <input
                id="passwordRepeat"
                className="form-control"
                type="password"
                onChange={(event) => setPasswordRepeat(event.target.value)}
              />
            </div>
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            {generalError && (
              <div className="alert alert-danger">{generalError}</div>
            )}
            <div className="text-center">
              <button
                className="btn btn-primary"
                disabled={
                  apiProgress || !password || password !== passwordRepeat
                }>
                {apiProgress && (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"></span>
                )}
                Üye Ol
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
