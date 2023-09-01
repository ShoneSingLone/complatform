import "./Search.scss";

import axios from "axios";

import { defineComponent } from "vue";
import { stateApp } from "@/state/app";

// @withRouter
export default defineComponent({
	props: [
		"groupList",
		"projectList",
		"router",
		"history",
		"location",
		"setCurrGroup",
		"changeMenuItem",
		"fetchInterfaceListMenu"
	],
	data() {
		return {
			state: {
				dataSource: []
			}
		};
	},
	methods: {
		async onSelect(value, option) {
			if (option.props.type === "分组") {
				this.props.changeMenuItem("/group");
				this.$router.push({ path: "/group/" + option.props["id"] });
				stateApp._setCurrGroup(ption.props["id"] - 0);
			} else if (option.props.type === "项目") {
				await stateApp._setCurrGroup(option.props["groupId"]);
				this.$router.push({ path: "/project/" + option.props["id"] });
			} else if (option.props.type === "接口") {
				await this.props.fetchInterfaceListMenu(option.props["projectId"]);
				this.props.history.push(
					"/project/" +
						option.props["projectId"] +
						"/interface/api/" +
						option.props["id"]
				);
			}
		},

		handleSearch(value) {
			axios
				.get("/api/project/search?q=" + value)
				.then(res => {
					if (res.data && res.data.errcode === 0) {
						const dataSource = [];
						for (let title in res.data.data) {
							res.data.data[title].map(item => {
								switch (title) {
									case "group":
										dataSource.push(
											<Option
												key={`分组${item._id}`}
												type="分组"
												value={`${item.groupName}`}
												id={`${item._id}`}>
												{`分组: ${item.groupName}`}
											</Option>
										);
										break;
									case "project":
										dataSource.push(
											<Option
												key={`项目${item._id}`}
												type="项目"
												id={`${item._id}`}
												groupId={`${item.groupId}`}>
												{`项目: ${item.name}`}
											</Option>
										);
										break;
									case "interface":
										dataSource.push(
											<Option
												key={`接口${item._id}`}
												type="接口"
												id={`${item._id}`}
												projectId={`${item.projectId}`}>
												{`接口: ${item.title}`}
											</Option>
										);
										break;
									default:
										break;
								}
							});
						}
						this.setState({
							dataSource: dataSource
						});
					} else {
						console.log("查询项目或分组失败");
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	},
	render() {
		const { dataSource } = this.state;

		return null;

		return (
			<div class="search-wrapper">
				<ElAutoComplete
					class="search-dropdown"
					dataSource={dataSource}
					style={{ width: "100%" }}
					defaultActiveFirstOption={false}
					onSelect={this.onSelect}
					onSearch={this.handleSearch}
					// filterOption={(inputValue, option) =>
					//   option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
					// }
				>
					<ElInput
						prefix={<xIcon icon="search" class="srch-icon" />}
						placeholder="搜索分组/项目/接口"
						class="search-input"
					/>
				</ElAutoComplete>
			</div>
		);
	}
});
