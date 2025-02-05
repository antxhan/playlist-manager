import "./Playlist.css";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useHandleError } from "../../hooks/useHandleError";
import { useNavigateWithTransition } from "../../hooks/useNavigateWithTransition";
import { api } from "../../utils/api";
import { easeOut, motion } from "framer-motion";
import he from "he";
import Layout from "../../Layout";
import EditPlaylistDialog from "../../components/dialogs/PlaylistDialogs/EditPlaylistDialog/EditPlaylistDialog";
import ConfirmDialog from "../../components/dialogs/ConfirmDialog/ConfirmDialog";
import StandardButton from "../../components/buttons/StandardButton/StandardButton";
import AccentButton from "../../components/buttons/AccentButton/AccentButton";
import PlaylistSkeleton from "../../components/skeletons/PlaylistSkeleton/PlaylistSkeleton";
import Tracklist from "../../components/Tracklist/Tracklist";
import placeholderImage from "../../img/placeholder.webp";
import BulletIcon from "../../icons/BulletIcon";
import EditIcon from "../../icons/EditIcon";

export default function Playlist() {
	const isSignedIn = useAuth();
	const navigateWithTransition = useNavigateWithTransition();
	const handleError = useHandleError();
	const { id } = useParams();
	const [playlist, setPlaylist] = useState(null);
	const [tracks, setTracks] = useState([]);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [nextPage, setNextPage] = useState(null);

	useEffect(() => {
		api
			.playlist(id)
			.then((res) => {
				setPlaylist(res);
				setTracks(res.tracks.items);
				if (res.tracks.next) {
					const nextUrl = new URL(res.tracks.next);
					nextUrl.searchParams.delete("fields");
					setNextPage(nextUrl.toString());
				} else {
					setNextPage(null);
				}
			})
			.then(() => setIsLoading(false))
			.catch((error) => handleError(error, "Failed to fetch playlist data."));

		setIsLoading(false);
	}, [handleError, id]);

	const getNextPage = useCallback(() => {
		api
			.get({ url: nextPage })
			.then((res) => {
				setTracks([...tracks, ...res.items]);
				if (res.next) {
					const nextUrl = new URL(res.next);
					setNextPage(nextUrl.toString());
				} else {
					setNextPage(null);
				}
			})
			.catch((error) =>
				handleError(error, "Failed to fetch next tracks page.")
			);
	}, [handleError, nextPage, tracks]);

	const handleEditPlaylist = (newName, newDescription) => {
		if (isSignedIn && id) {
			api
				.put({
					endpoint: `playlists/${id}`,
					body: { name: newName, description: newDescription },
				})
				.then(() => {
					setPlaylist({
						...playlist,
						name: he.decode(newName),
						description: he.decode(newDescription),
					});
					setIsEditDialogOpen(false);
				})
				.catch((error) => {
					handleError(error, "Failed to edit playlist.");
				});
		}
	};

	const handleDeletePlaylist = () => {
		if (isSignedIn && id) {
			api
				.delete({ endpoint: `playlists/${id}/followers` })
				.then(() => {
					setIsConfirmDialogOpen(false);
					setIsEditDialogOpen(false);
					navigateWithTransition("/");
				})
				.catch((error) => handleError(error, "Failed to delete playlist."));
		}
	};

	if (isLoading || !playlist)
		return (
			<Layout>
				<PlaylistSkeleton />
			</Layout>
		);

	return (
		<Layout>
			<section className="playlist-wrapper">
				<div className="playlist">
					<motion.div
						className="playlist__head-wrapper"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, ease: easeOut }}>
						<div className="playlist__head">
							<div className="playlist__image-wrapper">
								<img
									src={
										playlist.images && playlist.images.length > 0
											? playlist.images[0].url
											: placeholderImage
									}
									alt="Playlist cover"
								/>
								<button
									className="playlist__edit-btn"
									onClick={() => setIsEditDialogOpen(true)}
									aria-label="Edit Playlist">
									<EditIcon />
								</button>
							</div>
							<div className="playlist__info">
								<h2 onClick={() => setIsEditDialogOpen(true)}>
									{playlist.name || "Unknown Playlist"}
								</h2>
								<div className="playlist__info-group">
									<p>
										{playlist.owner
											? playlist.owner.display_name
												? playlist.owner.display_name
												: playlist.owner.id
											: "Unknown owner"}
									</p>
									<BulletIcon />
									<p>
										{playlist.tracks.total > 0
											? `${playlist.tracks.total} tracks`
											: "No tracks"}
									</p>
								</div>
								<p
									onClick={() => setIsEditDialogOpen(true)}
									className="playlist__description">
									{playlist.description}
								</p>
							</div>
						</div>
					</motion.div>
					<div className="playlist__body">
						<Tracklist
							playlistId={id}
							tracks={tracks}
							getNextPage={getNextPage}
							hasMore={nextPage}
							endMessage={null}
						/>
					</div>
				</div>
				<EditPlaylistDialog
					isOpen={isEditDialogOpen}
					onClose={() => setIsEditDialogOpen(false)}
					onSubmit={handleEditPlaylist}
					title="Edit Playlist"
					initialName={playlist.name}
					initialDescription={playlist.description}>
					<AccentButton type="submit" ariaLabel="Save">
						Save
					</AccentButton>
					<StandardButton onClick={() => setIsConfirmDialogOpen(true)}>
						Delete Playlist
					</StandardButton>
				</EditPlaylistDialog>
				<ConfirmDialog
					isOpen={isConfirmDialogOpen}
					onClose={() => setIsConfirmDialogOpen(false)}
					message="Do you want to delete your playlist?">
					<StandardButton
						onClick={handleDeletePlaylist}
						ariaLabel="'Delete Playlist' confirmation">
						Delete Playlist
					</StandardButton>
				</ConfirmDialog>
			</section>
		</Layout>
	);
}
