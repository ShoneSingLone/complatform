import "./Header.scss";

import Srch from "./Search/Search";
import { BreadcrumbNavigation } from "../Breadcrumb/Breadcrumb";
import { defineComponent, VNode } from "vue";
import { xU } from "@/ventose/ui";
import { cptAvatarUrl, stateApp } from "@/state/app";
import { cptRouter, aHashLink } from "@/router/router";
import { API } from "@/api";
import { ADMIN } from "@/utils/variable";

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
		return { stateApp, cptRouter, cptAvatarUrl };
	},
	methods: {
		goToGroup() {
			if (this.cptRouter.pathname === "/group") {
				return;
			}
			this.cptRouter.go("/group", {
				group_id: this.cptRouter.query.group_id
			});
		},
		goToI18nManger() {
			this.cptRouter.go("/xI", {});
		}
	},
	computed: {
		icon() {
			if (["/group", "/wiki", "/xI"].includes(this.cptRouter.pathname)) {
				return "yapi_logo";
			}
			return "back_group";
		},
		ToolUser() {
			const vm = this;
			let { groupList, isLogin } = this.stateApp.user;

			if (!isLogin) {
				return null;
			}

			const items = [
				{ content: "我的关注", path: "/follow", icon: "icon_我的关注" },
				{ content: "新建项目", path: "/follow", icon: "icon_新建项目" },
				{
					content: `使用文档`,
					href: "https://hellosean1025.github.io/yapi",
					icon: "icon_使用文档"
				}
			].map(i => {
				let link: VNode | null = null;
				const iconStyle = { fontSize: 16, color: "white" };
				if (i.path) {
					link = (
						<xIcon
							icon={i.icon}
							style={iconStyle}
							onClick={() => this.cptRouter.go(i.path)}
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
				const configsPopover = { content: i.content, placement: "left" };
				return (
					<div class="toolbar-li" v-xTips={configsPopover}>
						{link}
					</div>
				);
			});
			return (
				<div class="user-toolbar flex">
					<span
						onClick={this.goToI18nManger}
						class="flex middle pointer ml10 header-menu-icon_background">
						{/* yapi logo */}
						<xIcon icon="icon_i18n" style={this.styleLogo} />
					</span>
					<span class="flex middle pointer ml10 header-menu-icon_background">
						<a
							class="flex middle"
							href={aHashLink("/wiki_all", {})}
							style={this.styleLogo}
							target="_blank">
							<xIcon icon="wikidoc" style={this.styleLogo} />
						</a>
					</span>
					<div class="toolbar-li item-search">
						<Srch groupList={groupList} />
					</div>
					{items}
					<div class="toolbar-li">
						<elDropdown
							trigger="click"
							v-slots={{
								default: () => <elAvatar src={vm.cptAvatarUrl} />,
								dropdown: () => this.MenuUser
							}}
						/>
					</div>
				</div>
			);
		},
		MenuUser() {
			const { uid, role } = this.stateApp.user;
			return (
				<elDropdownMenu class="user-menu">
					{xU.map(
						{
							user: {
								path: aHashLink(`/user_profile`),
								name: "个人中心",
								icon: "user",
								adminFlag: false
							},
							user_doc: {
								path: aHashLink("/wiki_private"),
								target: "_blank",
								name: "个人文档",
								icon: "wikidoc",
								adminFlag: false
							},
							solution: {
								path: aHashLink("/user/list"),
								name: "用户管理",
								icon: "solution",
								adminFlag: true
							},
							logout: {
								name: "退出",
								icon: "logout",
								onClick() {
									stateApp._logoutActions();
								}
							}
						},
						(item, key) => {
							const isAdmin = role === ADMIN;

							if (item.adminFlag && !isAdmin) {
								return null;
							}

							const menuContent = (
								<span class="flex middle ">
									<xIcon icon={item.icon} />
									<span class="ml4">{item.name}</span>
								</span>
							);

							let menuLink = (
								<a
									href={item.path || ""}
									class="header-dropdown-menu-item"
									target={item.target || ""}
									onClick={item?.onClick}>
									{menuContent}
								</a>
							);

							return <elDropdownItem key={key}>{menuLink}</elDropdownItem>;
						}
					)}
				</elDropdownMenu>
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
		if (!stateApp.user.isLogin) {
			return null;
		}
		return (
			<header class="app-header-wrapper">
				<span onClick={this.goToGroup} class="flex middle pointer">
					{/* yapi logo */}
					<xIcon icon={this.icon} style={this.styleLogo} />
				</span>
				<BreadcrumbNavigation />
				<span class="flex1"></span>
				{this.ToolUser}
			</header>
		);
	}
});
