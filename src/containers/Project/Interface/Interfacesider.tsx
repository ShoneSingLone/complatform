import { defineComponent, ref, watch } from "vue";
import { $, _ } from "@ventose/ui";
import { usefnObserveDomResize } from "./../../../compositions/useDomResize";

function dig(path = "0", level = 3) {
	const list = [];
	for (let i = 0; i < 10; i += 1) {
		const key = `${path}-${i}`;
		const treeNode = {
			title: key,
			key
		};
		if (level > 0) {
			treeNode.children = dig(key, level - 1);
		}
		list.push(treeNode);
	}
	return list;
}
export const InterfaceSider = defineComponent({
	setup() {
		const selectedKeys = ref(["0-0-0", "0-0-1"]);
		const checkedKeys = ref(["0-0-0", "0-0-1"]);
		watch(selectedKeys, () => {
			console.log("selectedKeys", selectedKeys);
		});
		watch(checkedKeys, () => {
			console.log("checkedKeys", checkedKeys);
		});

		const { fnObserveDomResize, fnUnobserveDomResize } =
			usefnObserveDomResize();

		return {
			treeData: dig(),
			selectedKeys,
			checkedKeys,
			fnObserveDomResize,
			fnUnobserveDomResize
		};
	},
	data(vm) {
		return {
			siderHeight: 500
		};
	},
	mounted() {
		this.fnObserveDomResize(this.$refs.wrapper, () => {
			const siderHeight = Math.floor($(this.$refs.wrapper).height());
			this.setSiderHeight(siderHeight);
		});
	},
	beforeUnmount() {
		this.fnUnobserveDomResize(this.$refs.wrapper);
	},
	methods: {
		setSiderHeight: _.debounce(function (siderHeight) {
			this.siderHeight = siderHeight;
		}, 20)
	},
	render() {
		return (
			<div id="ViewProjectInterface_wrapper" ref="wrapper">
				<aTree
					selectedKeys={this.selectedKeys}
					checkedKeys={this.checkedKeys}
					defaultExpandAll
					checkable
					height={this.siderHeight}
					treeData={this.treeData}>
					{{
						title({ title, key }) {
							if (key === "0-0-1-0") {
								return <span style="color: #1890ff">{title}</span>;
							} else {
								return <span>{title}</span>;
							}
						}
					}}
				</aTree>
			</div>
		);
	}
});
