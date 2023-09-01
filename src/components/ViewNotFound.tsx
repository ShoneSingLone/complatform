import { defineComponent, onMounted } from "vue";
import { cptRouter } from "@/router/router";
import { xI } from "@/ventose/ui";

export const ViewNotFound = defineComponent({
	props: ["pathname"],
	setup(props) {
		function goHome() {
			cptRouter.value.go("/group");
		}
		onMounted(() => {
			if (cptRouter.value.pathname === "/") {
				goHome();
			}
		});
		return function () {
			return (
				<ElResult
					icon="error"
					title="404"
					subTitle={props.pathname}
					class="flex1">
					{{
						extra: () => (
							<xButton type="primary" onClick={goHome}>
								{xI("BackHome")}
							</xButton>
						)
					}}
				</ElResult>
			);
		};
	}
});
