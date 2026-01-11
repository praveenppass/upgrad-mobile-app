import {
	STRING_PATH_SEPARATOR,
	VALID_PATH_PATTERN,
} from "@strings/utils/strings.constants";
import type {
	IStringOrFunction,
	IStringParams,
	StringPath,
} from "@strings/utils/strings.interface";

export const getStringValueByPath = (
	obj: Record<string, unknown>,
	path: string,
): string | ((params: unknown) => string) => {
	const keys = path.split(STRING_PATH_SEPARATOR);
	let current: unknown = obj;

	for (const key of keys) {
		if (typeof current === "object" && current !== null && key in current) {
			current = (current as Record<string, unknown>)[key];
		} else return "";
	}

	return current as string | ((params: unknown) => string);
};

export const isString = (value: IStringOrFunction): value is string =>
	typeof value === "string";

export const isFunction = (
	value: IStringOrFunction,
): value is (params: IStringParams) => string => typeof value === "function";

export const isValidPath = (path: string) => VALID_PATH_PATTERN.test(path);

export const createStringConstants = <T extends Record<string, StringPath>>(
	obj: T,
): T => obj;
