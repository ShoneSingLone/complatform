import "./ViewWiki.scss";
import { defineComponent } from "vue";
import { WikiLeftSider } from "./WikiLeftSider";
import { stateWiki, Methods_Wiki } from "@/state/wiki";
import { TuiEditor } from "@/components";
import { API } from "@/api/index";
import { xU, xI, defItem } from "@/ventose/ui";
import { cptRouter } from "@/router/router";

export const ViewWiki = defineComponent({
	props: ["belongType"],
	setup() {
		return {
			stateWiki
		};
	},
	mounted() {
		stateWiki.__resetState({ ctx: this });
		if (stateWiki.belongType) {
			Methods_Wiki.updateWikiMenuList();
		} else {
			cptRouter.value.go("/");
		}
	},
	data() {
		const vm = this;
		return {
			titleConfigs: defItem({
				value: stateWiki.currentWiki.title,
				itemWrapperClass: "flex1 mr10",
				isShow: () => !vm.isReadonly
			}),
			isReadonly: true
		};
	},
	methods: {
		async save() {
			try {
				xU.loading(true);
				const params = xU.merge(
					{},
					stateWiki.currentWiki,
					{
						markdown: this.markdown
					},
					{ title: this.titleConfigs.value }
				);
				await API.wiki.upsertOne(params);
				Methods_Wiki.updateWikiMenuList();
				Methods_Wiki.setCurrentWiki(params._id, params);
				xU.message.success(xI("保存成功"));
				this.titleConfigs.value = "";
				this.isReadonly = true;
			} catch (error) {
				console.error(error);
			} finally {
				xU.loading();
			}
		}
	},
	computed: {
		btnEditOrSave() {
			return {
				text: this.isReadonly ? xI("编辑") : xI("保存"),
				type: "primary",
				isShow: () => !!stateWiki.currentWiki?._id,
				onClick: () => {
					if (this.isReadonly) {
						this.isReadonly = false;
						this.titleConfigs.value = stateWiki.currentWiki?.title;
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
					md: stateWiki.currentWiki.markdown || ""
				};
			},
			set(modelValue) {
				stateWiki.currentWiki.markdown = modelValue.md;
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
						{stateWiki.currentWiki.title}
					</span>
					<xItem id="wiki-editor-title" configs={this.titleConfigs} />
				</>
			);
		}
	},
	render() {
		return (
			<section
				id="ViewWiki"
				class="flex flex1"
				v-xloading={stateWiki.isLoading}>
				<WikiLeftSider
					onChange={() => (this.isReadonly = true)}
					isShow={this.isReadonly}
				/>
				<main class="flex flex1 padding10 vertical">
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
