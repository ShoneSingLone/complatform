import "./Header.scss";

import Srch from "./Search/Search";
import { BreadcrumbNavigation } from "../Breadcrumb/Breadcrumb";
import { defineComponent, VNode } from "vue";
import { UI, xU } from "@ventose/ui";
import { Methods_App, State_App } from "./../../state/State_App";
import { Cpt_url } from "../../router/router";

export const AppHeader = defineComponent({
	props: [
		"router",
		"user",
		"msg",
		"uid",
		"role",
		"login",
		"logoutActions",
		"loginTypeAction",
		"changeMenuItem",
		"history",
		"location",
		"study",
		"studyTip",
		"imageUrl"
	],
	setup() {
		return { State_App, Cpt_url };
	},
	methods: {
		goToGroup() {
			this.Cpt_url.go("/group", {
				group_id: this.Cpt_url.query.group_id
			});
		},
		goToWIKI() {
			this.Cpt_url.go("/wiki", {});
		},
		goToI18nManger() {
			this.Cpt_url.go("/i18n", {});
		}
	},
	computed: {
		icon() {
			if (["/group", "/wiki", "/i18n"].includes(this.Cpt_url.pathname)) {
				return "yapi_logo";
			}
			return "back_group";
		},
		ToolUser() {
			let { imageUrl, uid, groupList, isLogin } = this.State_App.user;

			if (!isLogin) {
				return null;
			}
			imageUrl = imageUrl ? imageUrl : `/api/user/avatar?uid=${uid}`;

			const items = [
				{ content: "我的关注", path: "/follow", icon: "star" },
				{ content: "新建项目", path: "/follow", icon: "add" },
				{
					content: "使用文档",
					href: "https://hellosean1025.github.io/yapi",
					icon: "question"
				}
			].map(i => {
				let link: VNode | null = null;
				const iconStyle = { fontSize: 16, color: "white" };
				if (i.path) {
					link = (
						<xIcon
							icon={i.icon}
							style={iconStyle}
							onClick={() => this.Cpt_url.go(i.path)}
						/>
					);
				}

				if (i.href) {
					link = (
						<a target="_blank" href={i.href} rel="noopener noreferrer">
							<xIcon icon={i.icon} style={iconStyle} />
						</a>
					);
				}
				const configsPopover = { content: i.content, placement: "bottom" };
				return (
					<div class="toolbar-li" v-uiPopover={configsPopover}>
						{link}
					</div>
				);
			});
			const avatarUrl = imageUrl ? imageUrl : `/api/user/avatar?uid=${uid}`;
			return (
				<div class="user-toolbar flex">
					<span onClick={this.goToI18nManger} class="flex middle pointer ml10 header-menu-icon_background">
						<xIcon icon="icon_i18n" style={this.styleLogo} />
					</span>
					<span onClick={this.goToWIKI} class="flex middle pointer ml10 header-menu-icon_background">
						<xIcon icon="wikidoc" style={this.styleLogo} />
					</span>
					<div class="toolbar-li item-search">
						<Srch groupList={groupList} />
					</div>
					{items}
					<div class="toolbar-li">
						<aDropdown
							trigger={["click"]}
							v-slots={{
								default: () => (
									<a class="dropdown-link">
										<aAvatar src={avatarUrl} />
									</a>
								),
								overlay: () => this.MenuUser
							}}
						/>
					</div>
				</div>
			);
		},
		MenuUser() {
			const { uid, role } = this.State_App.user;
			return (
				<aMenu
					class="user-menu"
					onClick={({ key }) => {
						if (key === "logout") {
							Methods_App.logoutActions();
						}
					}}>
					{xU.map(
						{
							user: {
								path: `/user/profile/${uid}`,
								name: "个人中心",
								icon: "user",
								adminFlag: false
							},
							solution: {
								path: "/user/list",
								name: "用户管理",
								icon: "solution",
								adminFlag: true
							},
							logout: {
								name: "退出",
								icon: "logout"
							}
						},
						(item, key) => {
							const isAdmin = role === "admin";
							if (item.adminFlag && !isAdmin) {
								return null;
							}

							const menuContent = (
								<>
									<xIcon icon={item.icon} />
									<span class="ml4">{item.name}</span>
								</>
							);

							let menuLink = (
								<a to={item.path || ""} class="flex horizon">
									{menuContent}
								</a>
							);
							if (key === "logout") {
							}

							return <aMenuItem key={key}>{menuLink}</aMenuItem>;
						}
					)}
				</aMenu>
			);
		}
	},
	data() {
		return {
			styleLogo: {
				width: "32px",
				height: "32px"
			}
		};
	},
	render() {
		return (
			<aLayoutHeader class="header-box m-header elevation-4">
				<div class="content g-row flex middle">
					<span onClick={this.goToGroup} class="flex middle pointer">
						<xIcon icon={this.icon} style={this.styleLogo} />
					</span>
					<BreadcrumbNavigation />
					<span class="flex1"></span>
					{this.ToolUser}
				</div>
			</aLayoutHeader>
		);
	}
});
