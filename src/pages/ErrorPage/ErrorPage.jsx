import "./ErrorPage.css";
import { useLocation } from "react-router-dom";
import { useNavigateWithTransition } from "../../hooks/useNavigateWithTransition";
import Layout from "../../Layout";
import AccentButton from "../../components/buttons/AccentButton/AccentButton";

export default function ErrorPage() {
  const location = useLocation();
  const navigateWithTransition = useNavigateWithTransition();
  const errorMessage =
    location.state?.message || "An unexpected error occured.";
  const statusCode = location.state?.statusCode || 500;

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
        <a onClick={() => navigateWithTransition("/")} className="error__cta">
          <AccentButton>Back to Home</AccentButton>
        </a>
      </div>
    </Layout>
  );
}
