import { Cpt_url } from "../router/router";
import { computed } from "vue";
import { API } from "../api";

export function useProjectBasicProperties() {
	const Cpt_currGroupId = computed(() => {
		return Cpt_url?.value?.query?.group_id || false;
	});
	const Cpt_currProjectId = computed(() => {
		return Cpt_url?.value?.query?.project_id || false;
	});

	async function ifUrlNoProjectIdGetIt() {
		try {
			if (!Cpt_currProjectId.value) {
				let group_id = await (async () => {
					if (!Cpt_currGroupId.value) {
						let { data: group } = await API.group.getMyGroup();
						return group._id;
					} else {
						return Cpt_currGroupId.value;
					}
				})();
				Cpt_url.value.go("/group", { group_id });
			}
		} catch (e) {
			console.error(e);
			setTimeout(ifUrlNoProjectIdGetIt, 1000);
		}
	}

	ifUrlNoProjectIdGetIt();
	return {
		Cpt_currGroupId,
		Cpt_currProjectId,
		ifUrlNoProjectIdGetIt
	};
}
