import React, {
	forwardRef,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import GlobeBottomSheetController, { CustomModalRef } from "./GlobeBottomSheetController";
import LocalBottomSheetWrapper from "./LocalBottomSheetWrapper";
import BottomSheet from "@gorhom/bottom-sheet";
import { C } from "@assets/constants";
import { HalfBottomSheet } from "./HalfBottomSheet";
import { IHalfBottomSheetType } from "@interface/app.interface";
const {
	themes: { bg },
} = C;

export interface IGlobeBottomSheet extends IHalfBottomSheetType {
	indicatorColor?: string;
	backgroundColor?: string;
	dismissible?: boolean
}

const GlobeHalfBottomSheet = () => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [modalData, setModalData] = useState<IGlobeBottomSheet | null>(null);

	const modalRef = useRef<CustomModalRef>();

	useLayoutEffect(() => {
		GlobeBottomSheetController.setModalRef(modalRef);
	}, []);

	useImperativeHandle(
		modalRef,
		() => ({
			show: (data?: IGlobeBottomSheet) => {
				if (data) {
					setModalData(data);
				}
				bottomSheetRef?.current?.expand();
			},
			hide: () => {
				bottomSheetRef?.current?.close();
			},
		}),
		[],
	);

	return (
		<LocalBottomSheetWrapper
			indicatorColor={bg.disabled}
			enableSwipeToClose={modalData?.dismissible}
			dismissible={modalData?.dismissible}
			backgroundColor={modalData?.backgroundColor ?? modalData?.backGroundColor}
			bottomSheetRef={bottomSheetRef}
			{...modalData}
		>
			<HalfBottomSheet {...modalData} />
		</LocalBottomSheetWrapper>
	);
};

export default forwardRef(GlobeHalfBottomSheet);
