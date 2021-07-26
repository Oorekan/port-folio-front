import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/BM_Logo_Sm.png';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Navbar() {
  const { isLoggedIn } = useContext(CurrentUserContext);
  return (
    <nav className="flex justify-between h-24 bg-darkgrey">
      <NavLink exact to="/login">
        <img className="w-20 h-20 mt-2 ml-10" src={Logo} alt="Logo" />
      </NavLink>
      <ul className="flex flex-row items-center text-white">
        <li className="mx-10">
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li className="mx-10">
          <NavLink exact to="/project">
            Project
          </NavLink>
        </li>
        <li className="mx-10">
          <NavLink exact to="/contact">
            Contact
          </NavLink>
        </li>
        {isLoggedIn && (
          <li className="mx-10">
            <button type="button">Log Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
