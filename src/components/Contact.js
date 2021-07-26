import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import API from '../APIClient';

export default function Contact() {
  const { addToast } = useToasts();
  const { register, handleSubmit } = useForm();
  // eslint-disable-next-line no-console
  const onSubmit = async (form) => {
    try {
      await API.post('/contacts', form);
      addToast('Votre message a bien été envoyé', {
        appearance: 'success',
      });
    } catch {
      addToast("Un problème est survenu lors de l'envoi de votre messsage", {
        appearance: 'error',
      });
    }
  };

  return (
    <div className="mt-10">
      <h1 className="text-center text-white text-3xl font-extrabold">
        Contact
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        action="send"
        className="flex flex-col items-center"
      >
        <label htmlFor="Name" className="flex flex-col text-white my-3">
          Your Name
          <input
            type="text"
            placeholder="Name"
            required
            {...register('name')}
            className="text-black w-96 py-1 pl-1"
          />
        </label>
        <label htmlFor="Email" className="flex flex-col text-white my-3">
          Your Email
          <input
            type="email"
            placeholder="example@contact.com"
            required
            {...register('email')}
            className="text-black w-96 py-1 pl-1"
          />
        </label>
        <label htmlFor="Message" className="flex flex-col text-white my-3">
          Your Message
          <textarea
            placeholder="Message"
            required
            {...register('message')}
            className="text-black w-96 pl-1"
          />
        </label>
        <button
          type="submit"
          className="mt-5 w-96 text-white bg-darkpurple py-3 rounded-lg uppercase"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
