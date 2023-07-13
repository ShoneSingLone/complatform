import "./ViewWiki.scss";
import { defineComponent } from "vue";
import { WikiLeftSider } from "./WikiLeftSider";
import { State_Wiki, Methods_Wiki } from "./State_Wiki";
import { TuiEditor } from "@/components";
import { API } from "@/api/index";
import { xU, $t, UI, defItem } from "@ventose/ui";

export const ViewWiki = defineComponent({
	mounted() {
		Methods_Wiki.updateWikiMenuList({ belong_type: "all" });
	},
	data() {
		const vm = this;
		return {
			title: "",
			titleConfigs: defItem.item({
				placeholder: $t("文档名称").label
			}),
			isReadonly: true
		};
	},
	methods: {
		async save() {
			const params = xU.merge(
				{},
				State_Wiki.currentWiki,
				{
					markdown: this.markdown
				},
				{ title: this.title }
			);
			const { data } = await API.wiki.action({
				action: "upsertOne",
				data: params
			});
			Methods_Wiki.updateWikiMenuList({ belong_type: "all" });
			Methods_Wiki.setCurrentWiki(params._id, params);
			UI.message.success($t("保存成功").label);
			this.isReadonly = true;
		}
	},
	computed: {
		btnSave() {
			return {
				text: this.isReadonly ? $t("编辑").label : $t("保存").label,
				type: "primary",
				onClick: () => {
					if (this.isReadonly) {
						this.isReadonly = false;
					} else {
						this.save();
					}
				}
			};
		},
		btnCancel() {
			return {
				text: $t("取消").label,
				isShow: () => {
					return !this.isReadonly;
				},
				onClick: () => {
					this.isReadonly = true;
				}
			};
		},
		wikiContent: {
			get() {
				return {
					md: State_Wiki.currentWiki.markdown || ""
				};
			},
			set(modelValue, oldModelValue) {
				State_Wiki.currentWiki.markdown = modelValue.md;
			}
		},
		vDomTitle() {
			if (this.isReadonly) {
				return (
					<span class="ml10 flex1" style="font-weight:700;font-size:18px;">
						{State_Wiki.currentWiki.title}
					</span>
				);
			} else {
				return (
					<>
						<xItem
							class="flex1 mr10"
							configs={this.titleConfigs}
							modelValue={State_Wiki.currentWiki.title}
							onUpdate:modelValue={val => (this.title = val)}
						/>
					</>
				);
			}
		}
	},
	render() {
		return (
			<section
				id="ViewWiki"
				class="flex flex1"
				v-loading={State_Wiki.isLoading}>
				<WikiLeftSider onChange={() => (this.isReadonly = true)} />
				<main class="flex flex1 padding10 vertical paddingB20">
					<div class="flex mb10 middle" style="height:48px;">
						{this.vDomTitle}
						<xButton configs={this.btnCancel} />
						<xGap r="10" />
						<xButton configs={this.btnSave} />
					</div>
					{/* {this.wikiContent.md} */}
					<TuiEditor v-model={this.wikiContent} isReadonly={this.isReadonly} />
				</main>
			</section>
		);
	}
});
