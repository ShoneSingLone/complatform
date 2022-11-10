<script>
import { Cpt_url } from "../router/router";
import { defineComponent } from "vue";

export default defineComponent({
	props: ["pathname"],
	setup() {
		return {
			Cpt_url
		};
	},
	methods: {
		goHome() {
			this.Cpt_url.go("/group");
		}
	}
});
</script>

<template>
	<aResult status="404" title="404" :sub-title="pathname" class="flex1">
		<template #extra>
			<aButton type="primary" @click="goHome">
				{{ $t("BackHome").label }}
			</aButton>
		</template>
	</aResult>
</template>
