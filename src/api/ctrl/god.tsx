import { ajax } from "@/api/ajax";

export const god = {
	upsertOneI18nRecord(payload) {
		return this.say("upsertOneI18nRecord", payload);
	},
	upsertI18nRecordMany(payload) {
		return this.say("upsertI18nRecordMany", payload);
	},
	i18nRecords(condition = {}) {
		return this.say("i18nRecords", condition);
	},
	i18nRecordById(_id) {
		if (!_id) {
			return;
		}
		return this.say("i18nRecordById", { _id });
	},
	importI18nJSON(formData) {
		return ajax({
			method: "post",
			url: `/api/god/say`,
			headers: { "Content-Type": "multipart/form-data" },
			params: { incantations: "importI18nJSON" },
			data: formData
		});
	},
	say(incantations, data) {
		return ajax({
			method: "post",
			url: `/api/god/say`,
			params: { incantations },
			data
		});
	}
};
