import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Login() {
  const { login } = useContext(CurrentUserContext);
  const { register, handleSubmit } = useForm();

  return (
    <div className="mt-10">
      <h1 className="text-center text-white text-3xl font-extrabold">
        Authentification
      </h1>
      <form
        onSubmit={handleSubmit(login)}
        action="send"
        method="POST"
        className="flex flex-col items-center"
      >
        <label
          htmlFor="email-address"
          className="flex flex-col text-white my-3"
        >
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="text-black w-96 py-1 pl-1"
            placeholder="admin@contact.com"
            {...register('email')}
          />
        </label>

        <label htmlFor="password" className="flex flex-col text-white my-3">
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="text-black w-96 py-1 pl-1"
            placeholder="********"
            {...register('password')}
          />
        </label>
        <button
          type="submit"
          className="mt-5 w-96 text-white bg-darkpurple py-3 rounded-lg uppercase"
        >
          Connexion
        </button>
      </form>
    </div>
  );
}
