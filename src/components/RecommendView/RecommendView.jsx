import "./RecommendView.css";
import React from "react";
import { toCapitalize } from "../../utils/utils";
import { Link } from "react-router";
import PlaylistGrid from "../PlaylistGrid/PlaylistGrid";

export default function RecommendView({ topGenres, recommendedResults }) {
  return (
    <div className="recommend-view">
      <h2>Your Top Genres</h2>
      <div className="top-genres">
        {topGenres.map((genre) => (
          <Link to={`/search?q=${genre}`} key={genre} className="top-genre">
            {genre}
          </Link>
        ))}
      </div>
      <h2>Because you like {toCapitalize(topGenres.at(-1))}...</h2>
      <PlaylistGrid
        playlists={recommendedResults.filter((res) => !!res).slice(0, 10)}
      />
      <Link to={`/search?q=${topGenres.at(-1)}`}>See more</Link>
    </div>
  );
}
