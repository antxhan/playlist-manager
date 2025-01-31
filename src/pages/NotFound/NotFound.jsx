import "./NotFound.css";
import { NavLink } from "react-router";
import Layout from "../../Layout";
import AccentButton from "../../components/buttons/AccentButton/AccentButton";

export default function NotFound() {
	return (
		<Layout>
			<div className="notFound-wrapper">
				<p className="notFound--big404-wrapper">
					<span className="notFound--big404">404</span>
				</p>
				<div className="notFound__info-wrapper">
					<h1>
						The page you are looking for is either a deep cut... or it doesn't
						exist
					</h1>

					<p>Maybe you can find what you need back at home</p>
					<NavLink to="/" className="notFound--cta">
						<AccentButton>Back to Home</AccentButton>
					</NavLink>
				</div>
			</div>
		</Layout>
	);
}
