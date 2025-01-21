import "./Playlist.css";

export default function Playlist() {
  return (
    <section className="playlist">
      <div className="playlist__head-wrapper">
        <div className="playlist__head">
          <div className="playlist__image-wrapper">
            <img src="" alt="" />
          </div>
          <div className="playlist__info">
            <h2>Playlist 1</h2>
            <p>11 tracks</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              enim debitis maxime, expedita iure ipsam officia optio quo
              consectetur quia impedit eveniet obcaecati qui sed at. Provident
              expedita iusto tenetur!
            </p>
          </div>
        </div>
      </div>
      <div className="playlist__body">
        <ul className="playlist__songs">
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
          <li>Song 4</li>
        </ul>
      </div>
    </section>
  );
}
