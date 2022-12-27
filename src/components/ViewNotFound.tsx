import { defineComponent } from "vue";
import { Cpt_url } from "../router/router";
import { JsonSchemaMonaco } from "./JsonSchemaEditor/JsonSchemaMonaco";

export const ViewNotFound = defineComponent({
	props: ["pathname"],
	setup() {
		return {
			Cpt_url
		};
	},
	methods: {
		goHome() {
			this.Cpt_url.go("/group");
		}
	},
	mounted() {
		if (this.Cpt_url.pathname === "/") {
			this.goHome();
		}
	},
	data(vm) {
		return {
			value: `{
				"$schema": "http://json-schema.org/draft-04/schema#",
				"type": "object",
				"properties": {
					"auth": {
						"type": "object",
						"properties": {
							"identity": {
								"type": "object",
								"properties": {
									"methods": {
										"type": "array",
										"items": {
											"type": "string"
										}
									},
									"password": {
										"type": "object",
										"properties": {
											"user": {
												"type": "object",
												"properties": {
													"name": {
														"type": "string"
													},
													"password": {
														"type": "string"
													},
													"domain": {
														"type": "object",
														"properties": {
															"name": {
																"type": "string"
															}
														}
													}
												}
											}
										}
									}
								}
							},
							"scope": {
								"type": "object",
								"properties": {
									"domain": {
										"type": "object",
										"properties": {
											"name": {
												"type": "string"
											}
										}
									}
								}
							}
						}
					}
				}
			}`
		}
	},
	render() {
		return <div style="height:500px;overflow:auto;"><JsonSchemaMonaco schemaString={this.value} /></div>
		return (
			<aResult status="404" title="404" subTitle={this.pathname} class="flex1">
				{{
					extra: () => (
						<aButton type="primary" onClick={this.goHome}>
							{this.$t("BackHome").label}
						</aButton>
					)
				}}
			</aResult>
		);
	}
});
