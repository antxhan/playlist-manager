import "./NotFound.css";
import Layout from "../../Layout";
import { NavLink } from "react-router";

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
						back to home
					</NavLink>
				</div>
			</div>
		</Layout>
	);
}
