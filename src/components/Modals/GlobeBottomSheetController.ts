import { MutableRefObject } from "react";
import { IGlobeBottomSheet } from "./GlobeHalfBottomSheet";

export type CustomModalRef = {
	show: (message?: IGlobeBottomSheet) => void;
	hide: () => void;
};

export default class GlobeBottomSheetController {
	static modalRef: MutableRefObject<CustomModalRef>;
	static setModalRef = (ref: any) => {
		this.modalRef = ref;
	};

	static showModal = (data?: IGlobeBottomSheet) => {
		this.modalRef?.current?.show(data);
	};
	static hideModal = () => {
		this.modalRef?.current?.hide();
	};
}
