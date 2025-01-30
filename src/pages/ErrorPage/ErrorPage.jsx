import "./ErrorPage.css";
import { useLocation, NavLink } from "react-router-dom";
import Layout from "../../Layout";
import StandardButton from "../../components/buttons/StandardButton/StandardButton";
import AccentButton from "../../components/buttons/AccentButton/AccentButton";

export default function ErrorPage() {
  const location = useLocation();
  const errorMessage = location.state?.message || "An unexpected error occured";
  const statusCode = location.state?.statusCode || 500;

  console.log(location);

  return (
    <Layout>
      <div className="error-wrapper">
        <p className="error__status-code-wrapper">
          <span className="error__status-code">{statusCode}</span>
        </p>
        <div className="error__info-wrapper">
          <h1>Oops! Something went wrong</h1>
          <p>{errorMessage}</p>
          <NavLink to="/" className="error__cta">
            <AccentButton>Back to Home</AccentButton>
          </NavLink>
        </div>
      </div>
    </Layout>
  );
}
