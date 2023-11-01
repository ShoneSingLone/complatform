import { Actions_Music, stateMusic } from "@/state/music";

export const BroswerItem = {
	props: ["item"],
	setup(props) {
		async function handleClick() {
			const data = await stateMusic._toIfy(props.item.path);
			if (data?.type === "audio") {
				playSong(data.record);
				return;
			}
		}

		async function playSong(record) {
			try {
				Actions_Music.pushSongToPlaylist([record], () => {
					Actions_Music.playSongById(record.id);
				});
			} catch (error) {
				console.error(error);
			}
		}

		return function () {
			return (
				<elButton
					class="PrivateMobileSongItem MobileSongItem elevation-1 flex vertical width100"
					onClick={handleClick}>
					<div class="title">{this.item.path}</div>
				</elButton>
			);
		};
	}
};
