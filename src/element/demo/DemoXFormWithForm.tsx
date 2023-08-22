//@ts-nocheck
import { AllWasWell, defItem, State_UI, itemsInvalid, xU } from "@ventose/ui";
import { FormRules } from "@/utils/common.FormRules";
import { defineComponent } from "vue";

const { $t } = State_UI;
export const DemoXFormWithForm = defineComponent({
	props: {
		options: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		const { row } = this.options.payload || {};
		const { name, age } = row || {};

		return {
			tips1: `### 自定义form 宽度，label宽度，居中
\`\`\`html
<xForm class=\\"flex vertical\\" :labelStyle="State.styleForm">
\`\`\`
\`\`\`js
console.log(window)
//
\`\`\``,
			styleForm: {
				width: "120px",
				"text-align": "right"
			},
			row: row || {},
			dataXItem: {
				name: defItem({
					value: name || "新增",
					label: $t("name").label,
					rules: [FormRules.required()]
				}),
				age: defItem({
					value: age || 0,
					label: $t("age").label,
					rules: [FormRules.required()]
				})
			}
		};
	},
	methods: {
		async verifyForm() {
			return !(await itemsInvalid());
		},
		getParams() {
			return { ...this.row, ...this.data };
		}
	},
	render() {
		return (
			<div id="DialogModifyIP">
				<xForm class="flex vertical" labelStyle={this.styleForm}>
					<ElAlert title={this.$t("提示信息").label} type="info" />
					{xU.map(this.dataXItem, item => {
						return (
							<>
								<xGap t="10" />
								<xItem configs={item} />
							</>
						);
					})}
				</xForm>

				<mkit
					md={`### 自定义form 宽度，label宽度，居中
\`\`\`js
<xForm class="flex vertical" labelStyle={this.styleForm}>
	<ElAlert title={this.$t("提示信息").label} type="info" />
    {xU.map(this.dataXItem, (item) => {
     return (<>
      <xGap t="10" />
      <xItem configs={item} />
     </>);
    })}
</xForm>

dataXItem: {
    name:defItem({
     value: name || "新增",
     label: $t("name").label,
     rules: [FormRules.required()]
    }),
    age:defItem({
     value: age || 0,
     label: $t("age").label,
     rules: [FormRules.required()]
    })
   }

styleForm: {
	width: "120px",
	<!--todo:具体实现是join字符串，没有做camel的转换，所以用标准css属性短横线-->
	"text-align": "right"
}
\`\`\``}
				/>
			</div>
		);
	}
});
