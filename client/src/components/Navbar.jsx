import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Typewriter } from "react-simple-typewriter";
import { Tooltip } from "react-tooltip";
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
        <a className="btn btn-ghost text-xl sm:text-2xl md:text-4xl font-lobStar">
          <span style={{ color: "black", fontWeight: "bold" }}>
            <Typewriter
              words={["Keeper", "Keeps your notes", "Safe", "Secure!"]}
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
          {user.photoURL ? (
            <li>
              <div className="w-20">
                <a
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={user.displayName}
                >
                  <img
                    alt={user.displayName}
                    className="rounded-full"
                    src={user.photoURL}
                  />
                </a>
                <Tooltip id="my-tooltip" />
              </div>
            </li>
          ) : (
            <li>
              <h1 className="font-lobStar font-bold mr-4 text-xl">
                {user.displayName}
              </h1>
            </li>
          )}

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
