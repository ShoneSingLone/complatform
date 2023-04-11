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
	data(vm) {
		return {
			title: "",
			titleConfigs: defItem.item({ placeholder: $t("文档名称").label }),
			isReadonly: defItem.item({
				value: true,
				itemType: "Switch",
				checkedChildren: $t("预览").label
			}),
			btnSave: {
				preset: "save",
				isShow() {
					return !vm.isReadonly.value;
				},
				onClick: vm.save
			}
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
		}
	},
	computed: {
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
			if (this.isReadonly.value) {
				return (
					<span class="ml10" style="font-weight:700;font-size:18px;">
						{State_Wiki.currentWiki.title}
					</span>
				);
			} else {
				return (
					<>
						<xItem
							configs={this.titleConfigs}
							modelValue={State_Wiki.currentWiki.title}
							onUpdate:modelValue={val => (this.title = val)}
						/>
					</>
				);
			}
		}
	},
	render({ btnSave, vDomTitle }) {
		return (
			<section
				id="ViewWiki"
				class="flex flex1"
				v-loading={State_Wiki.isLoading}>
				<WikiLeftSider onChange={() => (this.isReadonly.value = true)} />
				<main class="flex flex1 padding10 vertical paddingB20">
					<div class="flex mb10 middle" style="height:48px;">
						<xItem configs={this.isReadonly} />
						{vDomTitle}
						<xGap f="1" />
						<xButton configs={btnSave} />
					</div>
					{/* {this.wikiContent.md} */}
					<TuiEditor
						v-model={this.wikiContent}
						isReadonly={this.isReadonly.value}
					/>

					{/* {this.isReadonly.value ? (
						<div class="flex flex1 overflow-auto border-radius elevation-1 padding20">
							<Mkit md={this.wikiContent.md} />
						</div>
					) : (
						<TuiEditor
							v-model={this.wikiContent}
							isReadonly={this.isReadonly.value}
						/>
					)} */}
				</main>
			</section>
		);
	}
});
