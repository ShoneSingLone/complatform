import "./ProjectCard.scss";
import constants from "@/utils/variable";
import {defineComponent} from "vue";
import {State_App, Methods_App} from "@/state/State_App";
import {API} from "@/api";
import ViewCopyProject from "./ViewCopyProject.vue";
import {_, UI, AllWasWell, pickValueFrom, validateForm} from "@ventose/ui/dist/VentoseUI.es";
import produce from 'immer';


export default defineComponent({
    props: [
        "projectData",
        "uid",
        "inFollowPage",
        "callbackResult",
        "isShow",
        "getProject",
        "checkProjectName",
        "currPage"
    ],
    setup() {
        ``
        return {State_App};
    },
    methods: {
        openCopyProjectView() {
            const vm = this;
            UI.dialog.component({
                title: `复制项目${this.projectData.name}`,
                component: ViewCopyProject,
                area: ["540px", "320px"],
                okText: "复制",
                projectName: this.projectData.name,
                async onOk(dialog) {
                    try {
                        debugger;
                        const validateResults = await validateForm(dialog.vm.formItems);
                        if (AllWasWell(validateResults)) {
                            const {projectName} = pickValueFrom(dialog.vm.formItems);
                            try {
                                await this.copyProject({projectName});
                                dialog.close();
                            } catch (error) {
                                UI.message.error("复制失败");
                            }
                        } else {
                            throw new Error("未通过验证");
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
            })

        },
        async copyProject({projectName}) {
            const id = this.projectData._id;
            let {data} = await API.project.getProjectById(id);
            let newData = produce(data, draftData => {
                draftData.preName = draftData.name;
                draftData.name = projectName;
            });
            debugger;
            // await API.project.copyProjectMsg(newData);
            UI.message.success('项目复制成功');
            this.props.callbackResult();
        },
        goToProject() {
            this.$router.push({
                path: "/project/" + (this.projectData.projectid || this.projectData._id)
            });
        },
        add: _.debounce(async function () {
            try {
                const {projectData} = this;
                const uid = this.State_App.user.uid;
                const param = {
                    uid,
                    projectid: projectData._id,
                    projectname: projectData.name,
                    icon: projectData.icon || constants.PROJECT_ICON[0],
                    color: projectData.color || constants.PROJECT_COLOR.blue
                };
                await API.project.addFollow(param);
            } catch (error) {
                console.error(error);
            } finally {
                this.callbackResult();
            }
        }, 300),
        del: _.debounce(async function () {
            try {
                const id = this.projectData.projectid || this.projectData._id;
                await API.project.delFollow(id);
            } catch (error) {
                console.error(error);
            } finally {
                this.callbackResult();
            }
        }, 300)
    },
    computed: {
        followIcon() {
            return (
                <span class="pointer" onClick={this.followIconClickHandler}>
					<aTooltip placement="rightTop" title={this.followIconTitle}>
						<xIcon icon={this.followIconIcon} style={{color: "#faad14"}}/>
					</aTooltip>
				</span>
            );
        },
        copyIcon() {
            if (this.isShow) {
                return (
                    <span class="pointer" onClick={this.openCopyProjectView}>
						<aTooltip placement="rightTop" title="复制项目">
							<xIcon icon="copy" style={{color: "#232426"}}/>
						</aTooltip>
					</span>
                );
            }
            return null;
        },
        iconStyle() {
            return {
                color: "white",
                borderRadius: "16px",
                backgroundColor:
                    constants.PROJECT_COLOR[this.projectData.color] ||
                    constants.PROJECT_COLOR.blue
            };
        },
        isFollowStatus() {
            /* 处于follow页面全是已follow的 */
            return Boolean(this.projectData.follow || this.inFollowPage);
        },
        followIconTitle() {
            return this.isFollowStatus ? "取消关注" : "添加关注";
        },
        followIconIcon() {
            return this.isFollowStatus ? "follow" : "unfollow";
        },
        followIconClickHandler() {
            return this.isFollowStatus ? this.del : this.add;
        },
        logo() {
            return (
                <xIcon
                    class="ui-logo"
                    icon={this.projectData.icon}
                    style={this.iconStyle}
                />
            );
        },
        title() {
            return (
                <h4 class="ui-title">
                    {this.projectData.name || this.projectData.projectname}
                </h4>
            );
        }
    },
    render() {
        return (
            <div class="card-container" style={"width:200px;"}>
                <aCard hoverable class="m-card" onClick={this.goToProject}>
                    {this.logo}
                    {this.title}
                </aCard>
                <div class="card-btns flex">
                    {this.copyIcon}
                    <xGap l="10"/>
                    {this.followIcon}
                </div>
            </div>
        );
    }
});
