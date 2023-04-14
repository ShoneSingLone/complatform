import "./ViewI18n.scss";
import { defineComponent } from "vue";
import { I18nLeftSider } from "./I18nLeftSider";
import { stateI18n } from "./State_i18n";
import { defXVirTableConfigs, defCol, xU, $t } from "@ventose/ui";
import { Cpt_url } from "@/router/router";
import { State_App } from "@/state/State_App";
import { ITEM_OPTIONS_VDOM, ITEM_OPTIONS } from "@/utils/common.options";
import { State_ProjectInterface } from "../Project/Interface/State_ProjectInterface";

export const ViewI18n = defineComponent({
	mounted() {
		stateI18n._$updateList({ belong_type: "all" });
	},
	data(vm) {
		return {
			configsI18nTable: defXVirTableConfigs({
				rowHeight: 120,
				dataSource: [],
				selectedConfigs: {
					type: "many",
					prop: "_id"
				},
				columns: {
					...defCol({
						label: "i18n id",
						prop: "id"
					}),
					...defCol({
						label: "i18n p_id",
						prop: "pId"
					}),
					...defCol({
						label: "valueArray",
						prop: "valueArray"
					}),
					...defCol({
						label: $t("描述").label,
						prop: "tag"
					})
				}
			})
		};
	},
	methods: {},
	computed: {},
	render() {
		return (
			<section id="ViewI18n" class="flex flex1" v-loading={stateI18n.isLoading}>
				<I18nLeftSider onChange={() => (this.isReadonly.value = true)} />
				<main class="flex flex1 padding10 vertical paddingB20">
					<xVirTable configs={this.configsI18nTable} class="flex1 width100 " />
					<aCard>
						<div>编辑区</div>
						<div>编辑区</div>
						<div>编辑区</div>
						<div>编辑区</div>
						<div>编辑区</div>
						<div>编辑区</div>
					</aCard>
				</main>
			</section>
		);
	}
});
