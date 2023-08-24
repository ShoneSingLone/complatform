import {
	itemsInvalid,
	AllWasWell,
	pickValueFrom,
	 xU, defItem,
	setValueTo,
	xI
} from "@/ventose/ui";
import { defineComponent, markRaw } from "vue";
import { API } from "@/api";
import { stateApp } from "@/state/app";
import {
	Methods_ProjectInterface,
	State_ProjectInterface
} from "@/containers/Project/Interface/State_ProjectInterface";
import { FormRules } from "@/utils/common.FormRules";
import { ITEM_OPTIONS } from "@/utils/common.options";
import { Cpt_url } from "@/router/router";
import { Methods_Wiki, cpt_wikiBelongType } from "./State_Wiki";
import { ARTICLE } from "@/utils/variable";

export const DialogAddArticle = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	setup() {
		return { stateApp, Cpt_url };
	},
	data() {
		const vm = this;
		return {
			dataXItem: {
				title: defItem({
					value: "",
					label: xI("文档名称"),
					placeholder: xI("文档名称"),
					rules: [FormRules.required()]
				})
			}
		};
	},
	computed: {
		pid() {
			const _id = this.propOptions.parentDoc?._id;
			return _id || 0;
		},
		belong_type() {
			return this.propOptions.belong_type || "all";
		}
	},
	mounted() {
		this.propOptions.vm = this;
	},
	methods: {
		async onOk() {
			if (!(await itemsInvalid())) {
				const { project_id, group_id } = this.Cpt_url.query;
				let belong_id;

				if (cpt_wikiBelongType.value === "group") {
					belong_id = group_id;
				}
				if (cpt_wikiBelongType.value === "project") {
					belong_id = project_id;
				}
				const { title } = pickValueFrom(this.dataXItem);
				const params = {
					title,
					type: ARTICLE,
					p_id: this.pid,
					belong_type: cpt_wikiBelongType.value,
					belong_id
				};
				try {
					const { data } = await API.wiki.upsertOne(params);
					if (data?.msg?._id) {
						xU.message.success("添加文档成功");
						Methods_Wiki.updateWikiMenuList();
						Methods_Wiki.clickWiki({ wiki_id: data.msg._id });
						this.propOptions.$close();
					}
				} catch (error) {
					xU.message.error(error || "添加失败");
				}
			}
		}
	},
	render() {
		return (
			<>
				<div class="x-dialog-boddy-wrapper">
					<xGap t="10" />
					<ElAlert
						title={this.xI("保存标题后再编辑文档内容")}
						type="info"
						closable
						class="width100"
					/>
					<xForm
						class="flex vertical"
						labelStyle={{ "min-width": "120px", width: "unset" }}>
						{xU.map(this.dataXItem, (configs, prop) => {
							return (
								<>
									<xGap t="10" />
									<xItem configs={configs} />
								</>
							);
						})}
					</xForm>
					<xGap t="10" />
				</div>
				<xDialogFooter
					configs={{
						onCancel: this.propOptions.$close,
						onOk: this.onOk
					}}
				/>
			</>
		);
	}
});
