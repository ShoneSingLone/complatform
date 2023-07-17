import { VNode } from "vue";

export const VNodeCollection = {
	labelTips: (popContent: VNode) => (configs: any, className: string) => {
		const { prop, label } = configs;
		return (
			<div class="x-form-item-label">
				<label for={prop} class={className}>
					<span class="mr10">{label}</span>
					<ElPopover trigger="hover" placement="top">
						{{
							content: () => popContent,
							default: () => <xIcon icon="Insidetips" class="pointer ml4" />
						}}
					</ElPopover>
				</label>
			</div>
		);
	}
};
