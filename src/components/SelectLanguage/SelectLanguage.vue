<script setup>
import { computed } from "vue";
import { State_UI } from "@ventose/ui";

const languageLabels = {
	"zh-CN": { label: "简体中文", icon: "🇨🇳" },
	"en-US": { label: "English", icon: "🇺🇸" }
};

const Cpt_selectedKey = computed(() => {
	return [State_UI.language];
});

const changeLanguage = ({ key }) => {
	State_UI.language = key;
	setTimeout(() => {
		window.location.reload();
	}, 300);
};
</script>

<template>
	<aDropdown placement="bottomRight">
		<GlobalOutlined />
		<template #overlay>
			<aMenu :selected-keys="Cpt_selectedKey" @click="changeLanguage">
				<aMenuItem v-for="(locale, prop) in languageLabels" :key="prop">
					<span role="img" :aria-label="locale.label"> {{ locale.icon }} </span>
					<span>{{ locale.label }}</span>
				</aMenuItem>
			</aMenu>
		</template>
	</aDropdown>
</template>
