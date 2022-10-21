import { Form, Input, Button } from "ant-design-vue";
const FormItem = Form.Item;
function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class AddInterfaceForm extends Component {
	static propTypes = {
		form: PropTypes.object,
		onSubmit: PropTypes.func,
		onCancel: PropTypes.func,
		catdata: PropTypes.object
	};
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.onSubmit(values);
			}
		});
	};

	render() {
		const { getFieldDecorator, getFieldsError } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 14 }
			}
		};

		return (
			<Form onSubmit={this.handleSubmit}>
				<FormItem {...formItemLayout} label="分类名">
					{getFieldDecorator("name", {
						rules: [
							{
								required: true,
								message: "请输入分类名称!"
							}
						],
						initialValue: this.props.catdata
							? this.props.catdata.name || null
							: null
					})(<aInput placeholder="分类名称" />)}
				</FormItem>
				<FormItem {...formItemLayout} label="备注">
					{getFieldDecorator("desc", {
						initialValue: this.props.catdata
							? this.props.catdata.desc || null
							: null
					})(<aInput placeholder="备注" />)}
				</FormItem>

				<FormItem class="catModalfoot" wrapperCol={{ span: 24, offset: 8 }}>
					<aButton
						onClick={this.props.onCancel}
						style={{ marginRight: "10px" }}>
						取消
					</aButton>
					<aButton
						type="primary"
						htmlType="submit"
						disabled={hasErrors(getFieldsError())}>
						提交
					</aButton>
				</FormItem>
			</Form>
		);
	}
}

export default Form.create()(AddInterfaceForm);
