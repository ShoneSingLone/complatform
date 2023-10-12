import { computed, defineComponent, watch } from "vue";
import { $, xU, defCol, defDataGrid, xI, lStorage, xScope } from "@/ventose/ui";
import { API } from "@/api";
import { cptRouter } from "@/router/router";
import { ITEM_OPTIONS_VDOM } from "@/utils/common.options";
import { stateApp } from "@/state/app";
import { DialogModifyInterface } from "./DialogModifyInterface";
import { makeAhref } from "@/components/RouterView/RouterView";
import * as copyToClipboard from "copy-to-clipboard";
import { TuiEditor } from "@/components/TuiEditor/TuiEditor";
import { JsonSchemaMonaco } from "@/components/JsonSchemaEditor/JsonSchemaMonaco";
import { MonacoEditor } from "@/components/MonacoEditor/MonacoEditor";
import { socket, newWsPayload } from "@/utils/ws";
import {
	colParamsName,
	colRemark,
	colRequired,
	colExample,
	colType,
	colValue
} from "@/utils/common.columns";
import { DialogPostman } from "./DialogPostman";
import { getAvatarSrcByid } from "@/utils/common";

export const InterfaceDetailEdit = defineComponent({
	props: ["info"],
	setup() {
		var state = {};
		type t_vm = typeof state;
		state = xScope<t_vm>(state);

		return function () {
			return <h1>Edit</h1>;
		};
	}
});
