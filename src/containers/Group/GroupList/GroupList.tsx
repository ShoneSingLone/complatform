import {
	Modal,
	Input,
	message,
	Spin,
	Row,
	Menu,
	Col,
	Popover,
	Tooltip
} from "ant-design-vue";

import axios from "axios";

import GuideBtns from "@/components/GuideBtns/GuideBtns";
import { _, AllWasWell, pickValueFrom, validateForm } from "@ventose/ui";
import "./GroupList.scss";
import { defineComponent } from "vue";
import { Methods_App, State_App } from "@/state/State_App";
import { UI } from "@ventose/ui";
import ViewAddGroup from "./ViewAddGroup.vue";
import { API } from "@/api";

const tip = (
	<div class="title-container">
		<h3 class="title">欢迎使用 YApi ~</h3>
		<p>
			这里的 <b>“个人空间”</b>{" "}
			是你自己才能看到的分组，你拥有这个分组的全部权限，可以在这个分组里探索
			YApi 的功能。
		</p>
	</div>
);

export default defineComponent({
	props: [
		"groupList",
		"currGroup",
		"fetchGroupList",
		"setCurrGroup",
		"setGroupList",
		"match",
		"history",
		"curUserRole",
		"curUserRoleInGroup",
		"studyTip",
		"study",
		"fetchNewsData",
		"setCurrGroup"
	],
	setup() {
		return {
			State_App
		};
	},
	data() {
		return {
			configsSearch: {
				isSearch: true,
				value: "",
				placeholder: "搜索分类",
				onSearch: this.searchGroup
			},
			groupListForShow: [],
			state: {
				addGroupModalVisible: false,
				newGroupName: "",
				newGroupDesc: "",
				currGroupName: "",
				currGroupDesc: "",
				groupList: [],
				owner_uids: []
			}
		};
	},

	async mounted() {
		await this.initGroupList();
	},
	methods: {
		async initGroupList() {
			try {
				await Methods_App.fetchGroupList();
				this.searchGroup();
			} catch (error) {
				console.error(error);
			}
		},
		openAddGroupDialog(row = {}) {
			UI.dialog.component({
				title: "添加分组",
				component: ViewAddGroup,
				area: ["480px", "360px"],
				onOk: async instance => {
					const validateResults = await validateForm(instance.vm.formItems);
					if (AllWasWell(validateResults)) {
						const { newGroupName, newGroupDesc, owner_uids } = pickValueFrom(
							instance.vm.formItems
						);
						await this.upsert({
							...row,
							group_name: newGroupName,
							group_desc: newGroupDesc,
							owner_uids: owner_uids
						});
						instance.close();
					} else {
						throw new Error("未通过验证");
					}
				}
			});
		},
		async upsert({ group_name, group_desc, owner_uids, id }) {
			if (id) {
				await API.group.updateGroup({
					group_name,
					group_desc,
					id
				});
			} else {
				await API.group.addGroup({
					group_name,
					group_desc,
					owner_uids
				});
			}

			await Methods_App.fetchGroupList();
			if (id) {
				const currGroup = _.find(this.State_App.groupList, group => {
					return +group._id === +id;
				});
				Methods_App.setCurrGroup(currGroup);
			}
			await Methods_App.setCurrGroup(State_App.currGroup._id);
			await Methods_App.fetchNewsData(State_App.currGroup._id, "group", 1, 10);
		},
		async selectGroup({ key: groupId }) {
			const currGroup = _.find(this.State_App.groupList, { _id: +groupId });
			await Methods_App.setCurrGroup(currGroup);
			this.$router.push({ path: `/group/${currGroup._id}` });
			await Methods_App.fetchNewsData(groupId, "group", 1, 10);
		},

		searchGroup: _.debounce(function () {
			const { groupList } = this.State_App;
			const keywords = this.configsSearch.value;
			if (keywords === "") {
				this.groupListForShow = groupList;
			} else {
				this.groupListForShow = _.filter(groupList, group =>
					new RegExp(keywords, "i").test(group.group_name)
				);
			}
		}, 300)
	},
	watch: {
		"State_App.groupList"() {
			this.searchGroup();
		}
	},
	render() {
		const { currGroup } = this.State_App;
		return (
			<div class="m-group flex1 height100">
				<div
					class="group-bar flex vertical"
					v-loading={this.groupListForShow.length === 0}>
					<div class="curr-group">
						<div class="curr-group-name">
							<span class="name">{currGroup.group_name}</span>
							<aTooltip title="添加分组">
								<a class="editSet">
									<xIcon
										class="btn"
										icon="addGroup"
										onClick={this.openAddGroupDialog}
										style="width:16px;"
									/>
								</a>
							</aTooltip>
						</div>
						<div class="curr-group-desc">简介: {currGroup.group_desc}</div>
					</div>

					<div class="group-operate">
						<div class="search">
							<xItem configs={this.configsSearch} />
						</div>
					</div>
					<aMenu
						class="group-list"
						mode="inline"
						onClick={this.selectGroup}
						selectedKeys={[`${currGroup._id}`]}>
						{this.groupListForShow.map(group => {
							let icon = "folderOpen";
							if (group.type === "private") {
								icon = "user";
							}
							return (
								<aMenuItem key={`${group._id}`} class="group-item flex">
									<div class="flex middle">
										<xIcon icon={icon} style="width:16px;" />
										<span>{group.group_name}</span>
									</div>
								</aMenuItem>
							);
						})}
					</aMenu>
				</div>
			</div>
		);
	}
});
