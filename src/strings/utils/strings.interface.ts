import strings from "@strings/locales/en";

export type IStringParams = Record<string, string | number | boolean>;

export type IStringOrFunction = string | ((params: IStringParams) => string);

export interface IBaseStringValue {
	[key: string]: IStringOrFunction | IBaseStringValue;
}

export type IDeepKeys<T> =
	T extends Record<string, unknown>
		? {
				[K in keyof T & string]: T[K] extends Record<string, unknown>
					? `${K}.${IDeepKeys<T[K]>}`
					: K;
			}[keyof T & string]
		: never;

export type IGetByPath<
	T,
	P extends string,
> = P extends `${infer Key}.${infer Rest}`
	? Key extends keyof T
		? IGetByPath<T[Key], Rest>
		: IStringOrFunction
	: P extends keyof T
		? T[P]
		: IStringOrFunction;

export type IExtractFunctionParams<T> = T extends (params: infer P) => string
	? P
	: T extends (...args: infer P) => string
		? P[0]
		: IStringParams;

export type IIsFunction<T> = T extends (...args: unknown[]) => string
	? true
	: false;

export type IGetStringParams<T, P extends string> =
	IGetByPath<T, P> extends infer Value
		? IIsFunction<Value> extends true
			? IExtractFunctionParams<Value>
			: never
		: never;

export type IStringsType = typeof strings;

// Type that provides intellisense for all possible string paths
export type StringPath = IDeepKeys<IStringsType>;

// Type for string constants that provides intellisense
export type StringConstants<T extends Record<string, StringPath>> = {
	readonly [K in keyof T]: T[K];
};

// Utility type to create string constants with intellisense
export type CreateStringConstants<T extends Record<string, StringPath>> =
	StringConstants<T>;
