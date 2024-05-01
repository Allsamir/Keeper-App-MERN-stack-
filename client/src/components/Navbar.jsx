import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Typewriter } from "react-simple-typewriter";

export const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  return (
    <div
      className="navbar bg[#eee] text-black"
      style={{
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/brushed-alum-dark.png")',
      }}
    >
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl md:text-4xl font-lobStar">
          <span style={{ color: "black", fontWeight: "bold" }}>
            <Typewriter
              words={["Keeper", "Keep your notes", "Safe", "Secure!"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </a>
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
            <button onClick={logOut} className="btn btn-outline text-black">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
