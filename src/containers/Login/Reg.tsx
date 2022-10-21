import { Form, Button, Input, Icon, message } from "ant-design-vue";
import { regActions } from "../../reducer/modules/user";

const FormItem = Form.Item;
const formItemStyle = {
	marginBottom: ".16rem"
};

const changeHeight = {
	height: ".42rem"
};

@connect(
	state => {
		return {
			loginData: state.user
		};
	},
	{
		regActions
	}
)
@withRouter
class Reg extends Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmDirty: false
		};
	}

	static propTypes = {
		form: PropTypes.object,
		history: PropTypes.object,
		regActions: PropTypes.func
	};

	handleSubmit = e => {
		e.preventDefault();
		const form = this.props.form;
		form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.props.regActions(values).then(res => {
					if (res.payload.data.errcode == 0) {
						this.props.history.replace("/group");
						message.success("注册成功! ");
					}
				});
			}
		});
	};

	checkPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue("password")) {
			callback("两次输入的密码不一致啊!");
		} else {
			callback();
		}
	};

	checkConfirm = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(["confirm"], { force: true });
		}
		callback();
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				{/* 用户名 */}
				<FormItem style={formItemStyle}>
					{getFieldDecorator("userName", {
						rules: [{ required: true, message: "请输入用户名!" }]
					})(
						<aInput
							style={changeHeight}
							prefix={<xIcon icon="user" style={{ fontSize: 13 }} />}
							placeholder="Username"
						/>
					)}
				</FormItem>

				{/* Emaiil */}
				<FormItem style={formItemStyle}>
					{getFieldDecorator("email", {
						rules: [
							{
								required: true,
								message: "请输入email!",
								pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$/
							}
						]
					})(
						<aInput
							style={changeHeight}
							prefix={<xIcon icon="mail" style={{ fontSize: 13 }} />}
							placeholder="Email"
						/>
					)}
				</FormItem>

				{/* 密码 */}
				<FormItem style={formItemStyle}>
					{getFieldDecorator("password", {
						rules: [
							{
								required: true,
								message: "请输入密码!"
							},
							{
								validator: this.checkConfirm
							}
						]
					})(
						<aInput
							style={changeHeight}
							prefix={<xIcon icon="lock" style={{ fontSize: 13 }} />}
							type="password"
							placeholder="Password"
						/>
					)}
				</FormItem>

				{/* 密码二次确认 */}
				<FormItem style={formItemStyle}>
					{getFieldDecorator("confirm", {
						rules: [
							{
								required: true,
								message: "请再次输入密码密码!"
							},
							{
								validator: this.checkPassword
							}
						]
					})(
						<aInput
							style={changeHeight}
							prefix={<xIcon icon="lock" style={{ fontSize: 13 }} />}
							type="password"
							placeholder="Confirm Password"
						/>
					)}
				</FormItem>

				{/* 注册按钮 */}
				<FormItem style={formItemStyle}>
					<aButton
						style={changeHeight}
						type="primary"
						htmlType="submit"
						class="login-form-button">
						注册
					</aButton>
				</FormItem>
			</Form>
		);
	}
}
const RegForm = Form.create()(Reg);
export default RegForm;
