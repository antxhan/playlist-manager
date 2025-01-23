import "./Playlist.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../utils/api";
import Layout from "../../Layout";

export default function Playlist() {
  const isSignedIn = useAuth();
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    if (isSignedIn) {
      api.playlist.get(id).then((playlists) => setPlaylist(playlists));
    }
  }, [isSignedIn]);

  if (playlist === null) return <h2>Loading...</h2>;

  return (
    <Layout>
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
              {playlist.tracks.items.map((item) => (
                <li key={item.track.id}>
                  <button>{item.track.name}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
