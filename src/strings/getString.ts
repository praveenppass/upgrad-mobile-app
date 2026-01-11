import strings from "@strings/locales/en";
import type {
	IDeepKeys,
	IGetByPath,
	IStringsType,
} from "@strings/utils/strings.interface";
import {
	getStringValueByPath,
	isFunction,
	isString,
} from "@strings/utils/strings.utils";

const getString = <P extends IDeepKeys<IStringsType>>(
	path: P,
	...args: IGetByPath<IStringsType, P> extends (...args: infer Args) => string
		? Args
		: []
) => {
	const value = getStringValueByPath(
		strings as unknown as Record<string, unknown>,
		path,
	);

	if (isFunction(value)) {
		if (args.length === 0) return "";

		return value(args[0] as unknown);
	}

	if (isString(value)) return value;

	return "";
};

export default getString;
