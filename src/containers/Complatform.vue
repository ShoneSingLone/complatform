<template>
	<component :is="currentComponent" id="ViewComplatform"></component>
</template>

<script lang="jsx">
import { useURL } from "../compositionAPI/useURL";
import Group from "./Group/Group.vue";
import Project from "./Group/Group.vue";

const VIEW_COMPONENTS = {
	Group,
	Project
};

export default {
	setup() {
		const { Cpt_currentView } = useURL();
		return { Cpt_currentView };
	},
	computed: {
		currentComponent() {
			const _currentComponent = VIEW_COMPONENTS[this.Cpt_currentView] || Group;
			return _currentComponent;
		}
	}
};
</script>

<style lang="less">
#ViewComplatform {
	display: flex;
}
</style>
