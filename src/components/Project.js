import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import API from '../APIClient';

export default function Project() {
  const [getProjectImage, setGetProjectImage] = useState([]);

  useEffect(() => {
    API.get('/projects')
      .then((res) => setGetProjectImage(res.data))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col items-center">
      {getProjectImage.map((project) => (
        <div key={project.id} className="my-10">
          <h1 className="text-lg text-white text-center">{project.name}</h1>
          <NavLink exact to={`/project/${project.id}`}>
            <img
              src={`${process.env.REACT_APP_API_BASE_URL}/${project.imageUrl}`}
              alt={project.name}
              className="w-96"
            />
          </NavLink>
        </div>
      ))}
      <div className="flex justify-center mt-10">
        <h1 className="text-lg text-white mx-10">Add a project</h1>
        <NavLink exact to="/project-form">
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/insert-1521473-1289094.png"
            alt="+"
            className="w-10"
          />
        </NavLink>
      </div>
    </div>
  );
}
