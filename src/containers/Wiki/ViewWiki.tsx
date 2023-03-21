import "./ViewWiki.scss";
import { defineComponent } from "vue";
import { WikiLeftSider } from "./WikiLeftSider";
import { State_Wiki, Methods_Wiki } from "./State_Wiki";
import { TuiEditor } from "@/components";
import { API } from "@/api/index";
import { xU } from "@/devui/ui/ventoseUtils";
import { $t } from "@/devui/ui/State_UI";
import { UI } from "@/devui/ui/UI";
import { defItem } from "@/devui/ui/index";

export const ViewWiki = defineComponent({
	setup() {
		return {
			State_Wiki
		};
	},
	mounted() {
		Methods_Wiki.updateWikiMenuList();
	},
	data(vm) {
		return {
			isReadonly: defItem.item({
				value: true,
				itemType: "Switch"
			}),
			btnSave: {
				preset: "save",
				onClick: vm.save,
				isShow() {
					return !vm.isReadonly.value;
				}
			}
		};
	},
	methods: {
		async save() {
			const params = xU.merge({}, this.State_Wiki.currentWiki, {
				markdown: this.markdown
			});
			const { data } = await API.wiki.action({
				action: "upsertOne",
				data: params
			});
			UI.message.success($t("保存成功").label);
		}
	},
	computed: {
		wikiContent: {
			get() {
				return {
					md: this.State_Wiki.currentWiki.markdown || ""
				};
			},
			set(modelValue, oldModelValue) {
				this.State_Wiki.currentWiki.markdown = modelValue.md;
			}
		}
	},
	render({ btnSave }) {
		return (
			<section id="ViewWiki" class="flex flex1">
				<WikiLeftSider />
				<main class="flex flex1 padding10 vertical">
					<div class="flex mb10 middle" style="height:48px;">
						<xItem configs={this.isReadonly} />
						<xGap f="1" />
						<xButton configs={btnSave} />
						{this.wikiContent}
					</div>
					{this.isReadonly.value ? (
						<div>
							<Mkit md={this.wikiContent.md} />
						</div>
					) : (
						<TuiEditor v-model={this.wikiContent} readonly />
					)}
				</main>
			</section>
		);
	}
});
