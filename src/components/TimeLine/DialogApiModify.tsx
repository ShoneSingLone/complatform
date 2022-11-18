import { defineComponent } from "vue";
import { _ } from "@ventose/ui";
import { State_App } from "../../state/State_App";

export const DialogApiModify = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		options: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	setup() {
		return { State_App };
	},
	computed: {
		propDiffView() {
			return this?.options?.diffView || [];
		},
		vDomContentItem() {
			if (this.propDiffView.length === 0) {
				return <ErrMsg type="noChange" />;
			} else {
				return _.map(this.propDiffView, (item, index) => {
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
			<div class="flex vertical" id="ViewApiModify">
				<div class="padding20">
					<aAlert
						message={this.$t("注： 绿色代表新增内容，红色代表删除内容").label}
						type="info"
						closable
						className="width100"
					/>
				</div>
				<div class="project-interface-change-content flex1 padding20">
					{this.vDomContentItem}
				</div>
			</div>
		);
	}
});
