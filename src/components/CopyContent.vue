<template>
	<span class="flex middle copy-content-wrapper" ref="contents">
		<slot />
		<xIcon
			icon="copy"
			class="ml10 copy-content-wrapper_icon"
			v-uiPopover="{ content: 'copy' }"
			@click="copyText" />
	</span>
</template>

<script lang="jsx">
import copy from "copy-to-clipboard";
import { $, UI } from "@ventose/ui";

export default {
	methods: {
		copyText() {
			if (copy($(this.$refs.contents).text())) {
				UI.message.success(this.$t("已经成功复制到剪切板").label);
			} else {
				UI.message.error(this.$t("复制到剪切板失败").label);
			}
		}
	}
};
</script>

<style scoped lang="scss">
.copy-content-wrapper {
	.copy-content-wrapper_icon {
		display: none;
	}

	&:hover {
		.copy-content-wrapper_icon {
			cursor: pointer;
			display: block;
		}
	}
}
</style>
