import "./ViewWiki.scss";
import { defineComponent } from "vue";
import { WikiLeftSider } from "./WikiLeftSider";
import { State_Wiki, Methods_Wiki, cpt_wikiBelongType } from "./State_Wiki";
import { TuiEditor } from "@/components";
import { API } from "@/api/index";
import { xU, xI, UI, defItem } from "@/ventose/ui";
import { Cpt_url } from "@/router/router";

export const ViewWiki = defineComponent({
	setup() {
		return {
			State_Wiki
		};
	},
	mounted() {
		if (cpt_wikiBelongType.value) {
			Methods_Wiki.updateWikiMenuList();
		} else {
			Cpt_url.value.go("/");
		}
	},
	data() {
		const vm = this;
		return {
			titleConfigs: defItem({ value: State_Wiki.currentWiki.title }),
			isReadonly: true
		};
	},
	methods: {
		async save() {
			try {
				UI.loading(true);
				const params = xU.merge(
					{},
					State_Wiki.currentWiki,
					{
						markdown: this.markdown
					},
					{ title: this.titleConfigs.value }
				);
				await API.wiki.upsertOne(params);
				Methods_Wiki.updateWikiMenuList();
				Methods_Wiki.setCurrentWiki(params._id, params);
				UI.message.success(xI("保存成功"));
				this.titleConfigs.value = "";
				this.isReadonly = true;
			} catch (error) {
				console.error(error);
			} finally {
				UI.loading();
			}
		}
	},
	computed: {
		btnEditOrSave() {
			return {
				text: this.isReadonly ? xI("编辑").label : xI("保存"),
				type: "primary",
				isShow: () => !!State_Wiki.currentWiki?._id,
				onClick: () => {
					if (this.isReadonly) {
						this.isReadonly = false;
						this.titleConfigs.value = State_Wiki.currentWiki?.title;
					} else {
						this.save();
					}
				}
			};
		},
		btnCancel() {
			return {
				text: xI("取消"),
				isShow: () => {
					return !this.isReadonly;
				},
				onClick: () => {
					Methods_Wiki.setCurrentWiki();
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
			return (
				<>
					<span
						class="ml10 flex1"
						style={{
							"font-weight": "700",
							"font-size": "18px",
							display: this.isReadonly ? "inline-block" : "none"
						}}>
						{State_Wiki.currentWiki.title}
					</span>
					<xItem
						id="wiki-editor-title"
						class={{
							"flex1 mr10": true,
							"display-none": this.isReadonly
						}}
						configs={this.titleConfigs}
					/>
				</>
			);
		}
	},
	render() {
		return (
			<section
				id="ViewWiki"
				class="flex flex1"
				v-xloading={State_Wiki.isLoading}>
				<WikiLeftSider
					onChange={() => (this.isReadonly = true)}
					isShow={this.isReadonly}
				/>
				<main class="flex flex1 padding10 vertical paddingB20">
					<div class="flex mb10 middle" style="height:48px;">
						{this.vDomTitle}
						<xButton configs={this.btnCancel} />
						<xGap r="10" />
						<xButton configs={this.btnEditOrSave} />
					</div>
					{/* {this.wikiContent.md} */}
					<TuiEditor v-model={this.wikiContent} isReadonly={this.isReadonly} />
				</main>
			</section>
		);
	}
});
