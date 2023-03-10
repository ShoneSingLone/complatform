import UsernameAutoComplete from "../UsernameAutoComplete/UsernameAutoComplete";

/**
 * 对 UsernameAutoComplete的xItem封装
 * @param {*} param0
 * @returns
 */
export const ItemUAC = ({ listeners }) => {
	return (
		<UsernameAutoComplete
			callbackState={val => listeners["onUpdate:value"](val)}
		/>
	);
};
