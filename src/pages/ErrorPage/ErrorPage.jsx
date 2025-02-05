import "./ErrorPage.css";
import { useLocation, Link } from "react-router-dom";
import { useNavigateWithTransition } from "../../hooks/useNavigateWithTransition";
import Layout from "../../Layout";
import AccentButton from "../../components/buttons/AccentButton/AccentButton";
import { db } from "../../utils/db";

export default function ErrorPage() {
  const location = useLocation();
  const navigateWithTransition = useNavigateWithTransition();
  let errorMessage = location.state?.message || "An unexpected error occured.";
  const statusCode = location.state?.statusCode || 500;

  const token = db.token.get();
  console.log(token);
  if (token) {
    const isSignedIn = !!db.token.get().access_token;
    if (isSignedIn && statusCode === 403) {
      errorMessage =
        "Your account is not whitelisted. Sign up to get access. Spots are limited and are manually reviewed.";
    }
  } else {
    navigateWithTransition("/");
  }

  return (
    <Layout>
      <div className="error-wrapper">
        <p className="error__status-code-wrapper">
          <span className="error__status-code">{statusCode}</span>
        </p>
        <div className="error__info-wrapper">
          <h1>Oops! Something went wrong</h1>
          <p>{errorMessage}</p>
        </div>
        {token && !!db.token.get().access_token && statusCode === 403 ? (
          <Link to="https://forms.gle/JsNWEx3GHCLfNhy77" className="error__cta">
            <AccentButton
              onClick={() => {
                db.token.delete();
              }}
            >
              Sign Up
            </AccentButton>
          </Link>
        ) : (
          <Link
            to={{
              pathname: "/",
              state: { transition: true },
            }}
            className="error__cta"
            onClick={() => navigateWithTransition("/")}
          >
            <AccentButton>Back to Home</AccentButton>
          </Link>
        )}
      </div>
    </Layout>
  );
}
