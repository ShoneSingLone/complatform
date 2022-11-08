import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

export function useURL() {
	const router = useRouter();
	const route = useRoute();

	const Cpt_groupId = computed({
		get(): any {
			return route.query.group_id || "";
		},
		set(group_id: string) {
			router.push({
				path: route.path,
				query: {
					group_id
				}
			});
		}
	});
	const Cpt_currentView = computed({
		get(): any {
			return route.query.current_view || "Group";
		},
		set(current_view: string) {
			router.push({
				path: route.path,
				query: {
					current_view
				}
			});
		}
	});

	return {
		Cpt_groupId,
		Cpt_currentView
	};
}
