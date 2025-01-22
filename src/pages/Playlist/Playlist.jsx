import "./Playlist.css";

export default function Playlist({ playlist }) {
  console.log(playlist);
  return (
    <section className="playlist-wrapper">
      <div className="playlist">
        <div className="playlist__head-wrapper">
          <div className="playlist__head">
            <div className="playlist__image-wrapper">
              <img
                src={
                  playlist.images[1]
                    ? playlist.images[1].url
                    : playlist.images[0].url
                }
                alt="Playlist cover"
              />
            </div>
            <div className="playlist__info">
              <h2>{playlist.name}</h2>
              <p>{playlist.tracks.total} tracks</p>
              <p>{playlist.description}</p>
            </div>
          </div>
        </div>
        <div className="playlist__body">
          <ul className="playlist__tracks">
            {playlist.tracks.items.map((track) => (
              <li key={track.id}>
                <button>{track.track.name}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
