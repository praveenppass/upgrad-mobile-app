import React from "react";
import { useEffect, useState } from "react";

import { IDropdownInputItem } from "@components/Inputs/Dropdowns/common/dropdown.interface";
import DropdownInput, {
	IDropdownInputProps,
} from "@components/Inputs/Dropdowns/DropdownInput";

interface INetworkDependentDropdownIputProps extends IDropdownInputProps {
	getValues?: () => Promise<IDropdownInputItem[]>;
}

const NetworkDependentDropdownIput = ({
	getValues,
	...rest
}: INetworkDependentDropdownIputProps) => {
	const [values, setValues] = useState<IDropdownInputItem[]>([]);

	useEffect(() => {
		const fetchValues = async () => {
			const v = await getValues?.();
			if (!v) return;
			setValues(v);
		};

		fetchValues();
	}, []);

	const inputProps = {
		...rest,
		values,
	};

	return <DropdownInput {...inputProps} />;
};

export default NetworkDependentDropdownIput;
