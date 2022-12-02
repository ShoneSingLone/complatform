import { defineComponent } from "vue";
import { _ } from "@ventose/ui";
import { State_Interface, useInterfaceTableConfigs } from "./State_Interface";
import { Cpt_url } from "./../../../router/router";

export const InterfaceCategory = defineComponent({
	setup() {
		const {
			isLoading,
			filterParams,
			configs_interfaceTable,
			fnUpdateListForShow
		} = useInterfaceTableConfigs();

		return {
			State_Interface,
			Cpt_url,
			isLoading,
			filterParams,
			configs_interfaceTable,
			fnUpdateListForShow
		};
	},
	computed: {},
	watch: {
		"State_Interface.allInterface": {
			immediate: true,
			handler() {
				this.fnUpdateListForShow();
			}
		},
		filterParams: {
			deep: true,
			handler(allInterface) {
				this.isLoading = true;
				this.fnUpdateListForShow();
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
			<xView class="flex height100 padding20 vertical InterfaceAll-view">
				<div class="Operation mb10">
					<aCard></aCard>
				</div>
				<div
					class="elevation-1 padding20 flex1"
					style={{ height: "100px" }}
					v-loading={this.isLoading}>
					<xVirTable
						configs={this.configs_interfaceTable}
						class="flex1 width100 "
					/>
				</div>
			</xView>
		);
	}
});
