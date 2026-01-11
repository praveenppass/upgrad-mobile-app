import React, { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";

const withFormContext = <P extends object>(
	Component: React.ComponentType<P>,
) => {
	return (props: P & PropsWithChildren) => {
		const formContext = useFormContext();

		if (!formContext)
			throw new Error("Component must be wrapped by the FormProvider");

		return <Component {...props} />;
	};
};

export default withFormContext;
