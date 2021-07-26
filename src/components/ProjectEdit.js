import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import API from '../APIClient';
import ProjectImage from './ProjectImage';

export default function ProjectEdit() {
  const { addToast } = useToasts();
  const history = useHistory();
  const { id } = useParams();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      name: '',
      year: '',
      description: '',
      imageUrl: '',
    },
  });

  const imageUploadRef = useRef();
  const name = watch('name');
  const imageUrl = watch('imageUrl');

  const handleImageClick = () => {
    imageUploadRef.current.click();
  };

  const handleImageFileInputChange = (e) => {
    if (e.target.files[0]) {
      setValue('imageUrl', URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit = async (form) => {
    const updatedForm = {
      ...form,
      imageUrl: imageUploadRef.current.files[0],
    };

    const formData = new FormData();
    Object.keys(updatedForm).forEach((prop) => {
      formData.append(prop, updatedForm[prop]);
    });

    await API.patch(`/projects/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        addToast('Votre projet a bien été modifié', {
          appearance: 'success',
        });
        history.push('/project');
      })
      .catch(() => {
        addToast(
          'Il y a eu une erreur lors de la modification de votre projet',
          {
            appearance: 'error',
          }
        );
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="PATCH"
        action="send"
        className="flex flex-col items-center"
      >
        <div role="none" onClick={handleImageClick}>
          <input
            type="file"
            name="avatar"
            accept="image/png, image/jpeg, image/jpg"
            ref={imageUploadRef}
            onChange={handleImageFileInputChange}
            style={{ display: 'none' }}
          />
          <ProjectImage imageUrl={imageUrl} alt={`${name} `} />
        </div>
        <label htmlFor="name" className="flex flex-col text-white">
          Name of the project :
          <input
            type="text"
            placeholder="Name"
            required
            {...register('name')}
            className="text-black w-96"
          />
        </label>
        <label htmlFor="year" className="flex flex-col text-white">
          Year of the project :
          <input
            type="number"
            placeholder="Year"
            required
            {...register('year')}
            className="text-black w-96"
          />
        </label>
        <label htmlFor="description" className="flex flex-col text-white">
          Description of the project :
          <textarea
            placeholder="Description"
            required
            {...register('description')}
            className="text-black w-96"
          />
        </label>
        <button type="submit" className="w-96 text-white bg-darkpurple">
          Submit
        </button>
      </form>
    </>
  );
}
