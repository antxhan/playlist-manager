import "./NotFound.css";
import "../ErrorPage/ErrorPage.css";
import { Link } from "react-router-dom";
import { useNavigateWithTransition } from "../../hooks/useNavigateWithTransition";
import Layout from "../../Layout";
import AccentButton from "../../components/buttons/AccentButton/AccentButton";

export default function NotFound() {
  const navigateWithTransition = useNavigateWithTransition();

  return (
    <Layout>
      <div className="error-wrapper">
        <p className="error__status-code-wrapper">
          <span className="error__status-code">404</span>
        </p>
        <div className="error__info-wrapper">
          <h1>
            The page you are looking for is either a deep cut... or it doesn't
            exist.
          </h1>

          <p>Maybe you can find what you need back at home.</p>
        </div>
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
      </div>
    </Layout>
  );
}
