import { defineComponent } from "vue";
import { Cpt_url } from "@/router/router";
import {
	State_ProjectInterface,
	useInterfaceTableConfigs
} from "@/containers/Project/Interface/State_ProjectInterface";

export const InterfaceCategory = defineComponent({
	setup() {
		const { filterParams, configs_interfaceTable, fnUpdateListForShow } =
			useInterfaceTableConfigs();

		return {
			State_Project: State_ProjectInterface,
			Cpt_url,
			filterParams,
			configs_interfaceTable,
			fnUpdateListForShow
		};
	},
	computed: {},
	watch: {
		"State_Project.allInterface": {
			immediate: true,
			handler() {
				this.fnUpdateListForShow();
			}
		},
		filterParams: {
			deep: true,
			handler(allInterface) {
				this.State_Project.isLoading = true;
				this.configs_interfaceTable.selected = [];
				this.fnUpdateListForShow();
				setTimeout(() => {
					this.State_Project.isLoading = false;
				}, 10 * 1000);
			}
		},
		"Cpt_url.query.category_id": {
			immediate: true,
			handler(catid) {
				this.filterParams.catid = [Number(catid)];
			}
		}
	},
	render() {
		return (
			<xView class="Interface-view">
				<div class="Operation mb10">
					<aCard>
						<aButton>this.Cpt</aButton>
						{this.configs_interfaceTable.selected}
					</aCard>
				</div>
				<div class="elevation-1 padding20 flex1" style={{ height: "100px" }}>
					<xVirTable
						configs={this.configs_interfaceTable}
						class="flex1 width100 "
					/>
				</div>
			</xView>
		);
	}
});
