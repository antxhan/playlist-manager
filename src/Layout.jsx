import Nav from "./components/Nav/Nav";
import GlobalPlayer from "./components/player/GlobalPlayer";
import { usePlayer } from "./hooks/usePlayer";

export default function Layout({ children }) {
	const player = usePlayer();

	return (
		<>
			<Nav />
			<section className="page-wrapper">{children}</section>
			{player && <GlobalPlayer />}
		</>
	);
}
