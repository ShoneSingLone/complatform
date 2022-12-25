import { defineComponent } from "vue";
import $ from "jquery";

export const xVirTableTd = defineComponent({
	props: ["column", "data"],
	computed: {
		prop() {
			return this.column?.prop;
		},
		cell() {
			return this.data[this.prop];
		},
		renderEditor() {
			if (this.column?.renderEditor) {
				return this.column?.renderEditor;
			}
			return this.renderCell;
		},
		renderCell() {
			if (this.column?.renderCell) {
				return this.column?.renderCell;
			}
			return () => this.cell;
		
		},
		vDomCellContent() {
			if (this.isFocus) {
				return this.renderEditor({
					record: this.data,
					cell: this.cell,
					index: this.data.__virRowIndex
				});
			} else {
				return this.renderCell({
					record: this.data,
					cell: this.cell,
					index: this.data.__virRowIndex
				});
			}
		}
	},
	data(vm) {
		return {
			isFocus:false
		}
	},
	methods: {
		handleFocus() {
			$(window).trigger({
				type:"blur.allCell",
				trigger:this,
			  });
			this.isFocus = true;
		},
		handleBlur() {
			this.isFocus = false;
		}
	},
	mounted() {
		const vm = this;
		$(this.$refs.cell).on("blur","*", function(){
			debugger;
			vm.handleBlur
		});
		$(window).on("blur.allCell", function (e) {
			
			debugger;
			if (e.trigger === vm) {
				return 
			}
			vm.handleBlur
		})
	},
	beforeUnmount() {
		$(this.$refs.cell).off("blur","*", this.handleBlur)
		$(window).off("blur.allCell", this.handleBlur)
	},
	render() {
		return (
			<div
				ref="cell"
				onClick={this.handleFocus}
				role="td"
				class="xVirTable-cell"
				data-prop={this.prop}
				data-row-index={this.data.__virRowIndex} >
				{this.vDomCellContent}
			</div>
		);
	}
});
