import "./PlaylistSkeleton.css";

export default function PlaylistSkeleton() {
  return (
    <section className="playlist-wrapper">
      <div className="playlist playlist-skeleton">
        <div className="playlist__head-wrapper">
          <div className="playlist__head playlist-skeleton__head">
            <div className="playlist__image-wrapper playlist-skeleton__image"></div>
            <div className="playlist__info playlist-skeleton__info">
              <div className="playlist-skeleton__title"></div>
              <div className="playlist-skeleton__description"></div>
            </div>
          </div>
        </div>
        <div className="playlist__body">
          <div className="playlist__tracks playlist-skeleton__tracks">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="track playlist-skeleton__track"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
