<script lang="jsx">
import "./Footer.scss";
import { defineComponent } from "vue";
import { $ } from "@ventose/ui";

const version = Date.now();

const FootItem = ({ linkList, title, iconType }) => {
	return (
		<aCol span={6}>
			<h4 class="title flex horizon middle">
				{iconType ? (
					<xIcon
						icon={iconType}
						style="width: 24px;height: 24px;display: inline-block;"
					/>
				) : (
					""
				)}
				{title}
			</h4>
			{linkList.map((item, i) => {
				return (
					<p key={i}>
						<a href={item.itemLink} class="link">
							{item.itemTitle}
						</a>
					</p>
				);
			})}
		</aCol>
	);
};

export default defineComponent({
	data() {
		return {
			isFold: true,
			footList: [
				{
					title: "GitHub",
					iconType: "github",
					linkList: [
						{
							itemTitle: "YApi 源码仓库",
							itemLink: "https://github.com/YMFE/yapi"
						}
					]
				},
				{
					title: "团队",
					iconType: "team",
					linkList: [
						{
							itemTitle: "YMFE",
							itemLink: "https://ymfe.org"
						}
					]
				},
				{
					title: "反馈",
					iconType: "feedback",
					linkList: [
						{
							itemTitle: "Github Issues",
							itemLink: "https://github.com/YMFE/yapi/issues"
						},
						{
							itemTitle: "Github Pull Requests",
							itemLink: "https://github.com/YMFE/yapi/pulls"
						}
					]
				},
				{
					title: `Copyright © 2018-${new Date().getFullYear()} YMFE`,
					linkList: [
						{
							itemTitle: `版本: ${version} `,
							itemLink: "https://github.com/YMFE/yapi/blob/master/CHANGELOG.md"
						},
						{
							itemTitle: "使用文档",
							itemLink: "https://hellosean1025.github.io/yapi/"
						}
					]
				}
			]
		};
	},
	mounted() {
		$("#app").addClass("flex vertical");
		setTimeout(this.toggleFooter, 1000 * 3);
	},
	unmounted() {
		$("#app").removeClass("flex vertical");
	},
	computed: {
		wrapperStyle() {
			if (this.isFold) {
				return { height: "192px" };
			} else {
				return { height: "0" };
			}
		},
		toggleText() {
			if (this.isFold) {
				return "折叠";
			} else {
				return "展开";
			}
		}
	},
	methods: {
		toggleFooter() {
			this.isFold = !this.isFold;
		}
	},
	render() {
		return (
			<div class="footer-wrapper" style={this.wrapperStyle}>
				<xButton
					type="primary"
					class={{ "footer-toggle": true, unfold: this.isFold }}
					onClick={this.toggleFooter}>
					{this.toggleText}
				</xButton>
				<aRow class="footer-container">
					{this.footList.map((item, i) => {
						return (
							<FootItem
								key={i}
								linkList={item.linkList}
								title={item.title}
								iconType={item.iconType}
							/>
						);
					})}
				</aRow>
			</div>
		);
	}
});
</script>

<style lang="scss">
.ant-btn.x-button.footer-toggle {
	position: absolute;
	top: -32px;
	left: 0;
	opacity: 0.5;
	overflow: hidden;
	&.unfold {
		top: 0;
		opacity: 1;
	}
	&:hover {
		opacity: 1;
	}
}
</style>
