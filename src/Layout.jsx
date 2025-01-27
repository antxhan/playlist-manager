import Nav from "./components/Nav/Nav";
import GlobalPlayer from "./components/player/GlobalPlayer";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <section className="page-wrapper">{children}</section>
      <GlobalPlayer />
    </>
  );
}
