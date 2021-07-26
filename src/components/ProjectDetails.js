import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import API from '../APIClient';

export default function ProjectDetails() {
  const { addToast } = useToasts();
  const { id } = useParams();
  const history = useHistory();
  const [project, setProject] = useState([]);

  useEffect(() => {
    API.get(`/projects/${id}`)
      .then((res) => setProject(res.data))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);

  const deleteProject = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Êtes-vous certain ?'))
      API.delete(`/projects/${id}`)
        .then(
          addToast('Votre projet a bien été supprimé', {
            appearance: 'success',
          }),
          history.push('/')
        )
        .catch(() => {
          addToast(
            'Il y a eu une erreur lors de la suppression de votre projet',
            {
              appearance: 'error',
            }
          );
        });
  };

  return (
    <>
      {project.map((p) => (
        <div key={p.id} className="flex flex-col items-center">
          <h1 className="text-lg text-white">{p.name}</h1>
          <h1 className="text-lg text-white">{p.year}</h1>
          <img src={p.imageUrl} alt={p.name} className="w-1/2" />
          <h1 className="text-lg text-white">{p.description}</h1>
          <button
            type="button"
            onClick={() => history.push(`/project-edit/${id}`)}
            className="text-lg text-white bg-darkpurple"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => deleteProject()}
            className="text-lg text-white bg-darkpurple"
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
