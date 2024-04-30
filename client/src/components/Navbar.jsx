import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

export const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-4xl font-lobStar">Keeper</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 items-center">
          <li>
            <div className="w-20">
              <img
                alt={user.displayName}
                className="rounded-full"
                src={user.photoURL}
              />
            </div>
          </li>
          <li>
            <button onClick={logOut} className="btn btn-outline text-white">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
