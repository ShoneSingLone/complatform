import "./ErrMsg.scss";
import { defineComponent } from "vue";
import { Cpt_url } from "./../../router/router";

/**
 * 错误信息提示
 *
 * @component ErrMsg
 * @examplelanguage js
 *
 * * 错误信息提示组件
 * * 错误信息提示组件
 *
 *
 */

/**
 * 标题
 * 一般用于描述错误信息名称
 * @property title
 * @type string
 * @description 一般用于描述错误信息名称
 * @returns {object}
 */
export const ErrMsg = defineComponent({
	name: "ErrMsg",
	props: ["type", "history", "title", "desc", "opration"],
	render() {
		let { type, title, desc, opration } = this;
		let icon = "frown-o";
		if (type) {
			switch (type) {
				case "noFollow":
					title = "你还没有关注项目呢";
					desc = (
						<span>
							先去 <a onClick={() => Cpt_url.value.go("/group")}>“项目广场”</a>{" "}
							逛逛吧, 那里可以添加关注。
						</span>
					);
					break;
				case "noInterface":
					title = "该项目还没有接口呢";
					desc = "在左侧 “接口列表” 中添加接口";
					break;
				case "noMemberInProject":
					title = "该项目还没有成员呢";
					break;
				case "noMemberInGroup":
					title = "该分组还没有成员呢";
					break;
				case "noProject":
					title = "该分组还没有项目呢";
					desc = <span>请点击右上角添加项目按钮新建项目</span>;
					break;
				case "noData":
					title = "暂无数据";
					desc = "先去别处逛逛吧";
					break;
				case "noChange":
					title = "没有改动";
					desc = "该操作未改动 Api 数据";
					icon = "meh-o";
					break;
				default:
					console.log("default");
			}
		}
		return (
			<div class="err-msg" style="margin:auto;">
				<aIcon type={icon} class="icon" />
				<p class="title">{title}</p>
				<p class="desc">{desc}</p>
				<p class="opration">{opration}</p>
			</div>
		);
	}
});
