<template>
	<elButton
		ref="songItem"
		class="PrivateMobileSongItem MobileSongItem elevation-1 flex vertical width100"
		:style="styleBtn"
		:loading="loading">
		<div class="title">
			{{ song?.title }}
		</div>
		<span class="singer">
			{{ song.index }}- {{ song.artist }}-{{ song.album }}
		</span>
	</elButton>
</template>

<script lang="jsx">
export default {
	props: ["song", "loading", "isShowImg"],
	setup(props) {
		console.log(props.song);
		return {};
	},
	data() {
		return {
			/* isShowImg: false */
		};
	},
	computed: {
		styleBtn() {
			if (this.isShowImg) {
				return `background:url(${this.song?.picUrl}) right/contain no-repeat;`;
			} else {
				return {};
			}
		}
	},
	beforeUnmount() {
		this.observer && this.observer.disconnect();
	},
	mounted() {
		/* if ("IntersectionObserver" in window) {
			this.observer = new IntersectionObserver((items) => {
				items.forEach((item) => {
					if (item.isIntersecting) {
						this.isShowImg = true;
						this.observer.unobserve(item.target);
					}
				});
			});
			this.observer.observe(this.$refs.songItem.$el);
		} */
	}
};
</script>

<style lang="less">
.PrivateMobileSongItem {
	line-height: 20px;
	height: 48px;
	border-radius: 16px;

	> .title {
		width: 100%;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	> .singer {
		width: 100%;
		font-size: 12px;
		text-indent: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: left;
	}
}
</style>
