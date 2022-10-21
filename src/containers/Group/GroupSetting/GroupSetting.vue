<script lang="jsx">
import "./GroupSetting.scss";
import { defineComponent } from "vue";
import { UI, _ } from "@ventose/ui";

export default defineComponent({
	props: [
		"currGroup",
		"curUserRole",
		"changeGroupMsg",
		"fetchGroupList",
		"setCurrGroup",
		"setCurrGroup",
		"fetchNewsData",
		"updateGroupList",
		"deleteGroup",
		"groupList"
	],
	data() {
		return {
			state: {
				currGroupDesc: "",
				currGroupName: "",
				showDangerOptions: false,
				custom_field1_name: "",
				custom_field1_enable: false,
				custom_field1_rule: false
			}
		};
	},

	watch: {
		asdf() {
			this.initState();
			this.setState({
				showDangerOptions: false
			});
		}
	},

	methods: {
		initState(props) {
			this.currGroupName = this.currGroup.group_name;
			this.currGroupDesc = this.currGroup.group_desc;
			this.custom_field1_name = this.currGroup.custom_field1.name;
			this.custom_field1_enable = this.currGroup.custom_field1.enable;
		},

		// 修改分组名称
		changeNamee() {
			this.setState({
				currGroupName: e.target.value
			});
		},
		// 修改分组描述
		changeDesce() {
			this.setState({
				currGroupDesc: e.target.value
			});
		},

		// 修改自定义字段名称
		changeCustomNamee() {
			let custom_field1_rule = this.state.custom_field1_enable
				? !e.target.value
				: false;
			this.setState({
				custom_field1_name: e.target.value,
				custom_field1_rule
			});
		},

		// 修改开启状态
		changeCustomEnablee() {
			let custom_field1_rule = e ? !this.state.custom_field1_name : false;
			this.setState({
				custom_field1_enable: e,
				custom_field1_rule
			});
		},

		// 点击“查看危险操作”按钮
		toggleDangerOptions() {
			// console.log(this.state.showDangerOptions);
			this.setState({
				showDangerOptions: !this.state.showDangerOptions
			});
		},

		// 编辑分组信息
		async editGroup() {
			const id = this.props.currGroup._id;
			if (this.state.custom_field1_rule) {
				return;
			}
			const res = await this.props.changeGroupMsg({
				group_name: this.state.currGroupName,
				group_desc: this.state.currGroupDesc,
				custom_field1: {
					name: this.state.custom_field1_name,
					enable: this.state.custom_field1_enable
				},
				id: this.props.currGroup._id
			});

			if (!res.payload.data.errcode) {
				UI.notification.success("修改成功！");
				await this.props.fetchGroupList(this.props.groupList);
				this.props.updateGroupList(this.props.groupList);
				const currGroup = _.find(this.props.groupList, group => {
					return +group._id === +id;
				});
				this.props.setCurrGroup(currGroup);
				this.props.setCurrGroup(this.props.currGroup._id);
				this.props.fetchNewsData(this.props.currGroup._id, "group", 1, 10);
			}
		},
		// 删除分组
		async deleteGroup() {
			const that = this;
			const { currGroup } = that.props;
			const res = await this.props.deleteGroup({ id: currGroup._id });
			if (!res.payload.data.errcode) {
				UI.notification.success("删除成功");
				await that.props.fetchGroupList();
				const currGroup = that.props.groupList[0] || {
					group_name: "",
					group_desc: ""
				};
				that.setState({ groupList: that.props.groupList });
				that.props.setCurrGroup(currGroup);
			}
		},

		// 删除分组的二次确认
		showConfirm() {
			const that = this;
			confirm({
				title: "确认删除 " + that.props.currGroup.group_name + " 分组吗？",
				content: (
					<div
						style={{ marginTop: "10px", fontSize: "13px", lineHeight: "25px" }}>
						<aAlert
							message="警告：此操作非常危险,会删除该分组下面所有项目和接口，并且无法恢复!"
							type="warning"
						/>
						<div style={{ marginTop: "16px" }}>
							<p>
								<b>请输入分组名称确认此操作:</b>
							</p>
							<aInput id="group_name" />
						</div>
					</div>
				),
				onOk() {
					const groupName = document.getElementById("group_name").value;
					if (that.props.currGroup.group_name !== groupName) {
						message.error("分组名称有误");
						return new Promise((resolve, reject) => {
							reject("error");
						});
					} else {
						that.deleteGroup();
					}
				},
				iconType: "delete",
				onCancel() {}
			});
		}
	},

	render() {
		return (
			<div class="m-panel card-panel card-panel-s panel-group">
				<aRow type="flex" justify="space-around" class="row" align="middle">
					<aCol span={4} class="label">
						分组名：
					</aCol>
					<aCol span={20}>
						<aInput
							size="large"
							placeholder="请输入分组名称"
							value={this.state.currGroupName}
							onChange={this.changeName}
						/>
					</aCol>
				</aRow>
				<aRow type="flex" justify="space-around" class="row" align="middle">
					<aCol span={4} class="label">
						简介：
					</aCol>
					<aCol span={20}>
						<aTextArea
							size="large"
							rows={3}
							placeholder="请输入分组描述"
							value={this.state.currGroupDesc}
							onChange={this.changeDesc}
						/>
					</aCol>
				</aRow>
				<aRow type="flex" justify="space-around" class="row" align="middle">
					<aCol span={4} class="label">
						接口自定义字段&nbsp;
						<aTooltip title={"可以在接口中添加 额外字段 数据"}>
							<xIcon icon="question-circle-o" style={{ width: "10px" }} />
						</aTooltip>
						：
					</aCol>
					<aCol span={12} style={{ position: "relative" }}>
						<aInput
							placeholder="请输入自定义字段名称"
							style={{
								borderColor: this.state.custom_field1_rule ? "#f5222d" : ""
							}}
							value={this.state.custom_field1_name}
							onChange={this.changeCustomName}
						/>
						<div
							className="custom-field-rule"
							style={{
								display: this.state.custom_field1_rule ? "block" : "none"
							}}>
							自定义字段名称不能为空
						</div>
					</aCol>
					<aCol span={2} class="label">
						开启：
					</aCol>
					<aCol span={6}>
						<aSwitch
							checked={this.state.custom_field1_enable}
							checkedChildren="开"
							unCheckedChildren="关"
							onChange={this.changeCustomEnable}
						/>
					</aCol>
				</aRow>
				<aRow type="flex" justify="center" class="row save">
					<aCol span={4} class="save-button">
						<aButton
							className="m-btn btn-save"
							icon="save"
							type="primary"
							onClick={this.editGroup}>
							保 存
						</aButton>
					</aCol>
				</aRow>
				{/* 只有超级管理员能删除分组 */}
				{this.props.curUserRole === "admin" ? (
					<aRow type="flex" justify="center" class="danger-container">
						<aCol span={24} class="title">
							<h2 class="content">
								<xIcon icon="exclamation-circle-o" />
								危险操作
							</h2>
							<aButton onClick={this.toggleDangerOptions}>
								查 看
								<aIcon type={this.state.showDangerOptions ? "up" : "down"} />
							</aButton>
						</aCol>
						{this.state.showDangerOptions ? (
							<aCard
								hoverable={true}
								className="card-danger"
								style={{ width: "100%" }}>
								<div class="card-danger-content">
									<h3>删除分组</h3>
									<p>分组一旦删除，将无法恢复数据，请慎重操作！</p>
									<p>只有超级管理员有权限删除分组。</p>
								</div>
								<aButton
									type="danger"
									ghost
									className="card-danger-btn"
									onClick={this.showConfirm}>
									删除
								</aButton>
							</aCard>
						) : null}
					</aRow>
				) : null}
			</div>
		);
	}
});
</script>
