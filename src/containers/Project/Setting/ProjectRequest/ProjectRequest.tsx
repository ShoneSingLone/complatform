import { Form, Button, message } from "ant-design-vue";
const FormItem = Form.Item;
import "./project-request.scss";
import AceEditor from "client/components/AceEditor/AceEditor";
import {
	updateProjectScript,
	getProject
} from "../../../../reducer/modules/project";

@connect(
	state => {
		return {
			projectMsg: state.project.currProject
		};
	},
	{
		updateProjectScript,
		getProject
	}
)
@Form.create()
export default class ProjectRequest extends Component {
	static propTypes = {
		projectMsg: PropTypes.object,
		updateProjectScript: PropTypes.func,
		getProject: PropTypes.func,
		projectId: PropTypes.number
	};

	UNSAFE_componentWillMount() {
		this.setState({
			pre_script: this.props.projectMsg.pre_script,
			after_script: this.props.projectMsg.after_script
		});
	}

	handleSubmit = async () => {
		let result = await this.props.updateProjectScript({
			id: this.props.projectId,
			pre_script: this.state.pre_script,
			after_script: this.state.after_script
		});
		if (result.payload.data.errcode === 0) {
			message.success("保存成功");
			await this.props.getProject(this.props.projectId);
		} else {
			message.success("保存失败, " + result.payload.data.errmsg);
		}
	};

	render() {
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 }
			}
		};

		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0
				},
				sm: {
					span: 16,
					offset: 8
				}
			}
		};

		const { pre_script, after_script } = this.state;
		const codeString = `const {isNode, href, hostname, caseId, method, pathname, query, requestHeader, requestBody, promise, storage, uid, projectId, interfaceId, utils, responseData, responseHeader, responseStatus, runTime} = context ;
const ErrorCode=400;
`;
		return (
			<div class="project-request">
				<pre>
					<code>{codeString}</code>
				</pre>
				<Form onSubmit={this.handleSubmit}>
					<FormItem
						{...formItemLayout}
						label="Pre-request Script(pre_script 请求参数处理脚本)">
						<AceEditor
							data={pre_script}
							onChange={editor => this.setState({ pre_script: editor.text })}
							fullScreen={true}
							class="request-editor"
						/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="Pre-response Script(after_script 响应数据处理脚本)">
						<AceEditor
							data={after_script}
							onChange={editor => this.setState({ after_script: editor.text })}
							fullScreen={true}
							class="request-editor"
						/>
					</FormItem>
					<FormItem {...tailFormItemLayout}>
						<aButton onClick={this.handleSubmit} type="primary">
							保存
						</aButton>
					</FormItem>
				</Form>
			</div>
		);
	}
}
