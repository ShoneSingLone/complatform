import { defineComponent } from "vue";
import { xU } from "@/ventose/ui";
import { stateApp } from "@/state/app";

export const DialogShowApiModify = defineComponent({
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
		return { stateApp };
	},
	computed: {
		propDiffView() {
			return this.propOptions?.diffView || [];
		},
		vDomContentItem() {
			if (this.propDiffView.length === 0) {
				return <ErrMsg type="noChange" />;
			} else {
				return xU.map(this.propDiffView, (item, index) => {
					if (!item.content) {
						return null;
					}
					return (
						<div class="item-content">
							<h3 class="title">{item.title}</h3>
							<div v-html={item.content} />
						</div>
					);
				});
			}
		}
	},
	render() {
		return (
			<div class="flex vertical flex1" id="ViewApiModify">
				<div class="padding20">
					<ElAlert
						title={this.xI("注： 绿色代表新增内容，红色代表删除内容")}
						type="info"
						closable
						class="width100"
					/>
				</div>
				<div class="project-interface-change-content flex1 padding20">
					{this.vDomContentItem}
				</div>
			</div>
		);
	}
});
