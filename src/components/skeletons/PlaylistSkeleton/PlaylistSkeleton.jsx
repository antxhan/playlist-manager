import "./PlaylistSkeleton.css";

export default function PlaylistSkeleton() {
  return (
    <section className="playlist-wrapper">
      <div className="playlist playlist-skeleton">
        <div className="playlist__head-wrapper">
          <div className="playlist__head playlist-skeleton__head">
            <div className="playlist__image-wrapper playlist-skeleton__image skeleton"></div>
            <div className="playlist__info playlist-skeleton__info">
              <div className="playlist-skeleton__title skeleton"></div>
              <div className="playlist__info-group playlist-skeleton__info-group">
                <span className="skeleton"></span>
                <span className="skeleton"></span>
              </div>
              <div className="playlist-skeleton__description">
                {/* refactor to use map to reduce duplicated code */}
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <span key={index} className="skeleton"></span>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="playlist__body">
          <div className="playlist__tracks playlist-skeleton__tracks">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="track playlist-skeleton__track skeleton"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
