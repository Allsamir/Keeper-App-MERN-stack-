import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className={`flex flex-col justify-center items-center min-h-screen space-y-4 text-base text-black`}
    >
      <iframe
        src="https://giphy.com/embed/iPnLFwV5pPBsc"
        width="480"
        height="288"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link>
        <button className="btn btn-outline text-black">Home</button>
      </Link>
    </div>
  );
}
