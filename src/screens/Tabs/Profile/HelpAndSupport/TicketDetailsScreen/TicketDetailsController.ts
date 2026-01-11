import { useRef, useState } from "react";
import { AxiosResponse } from "axios";
import { useMedia } from "@hooks/useMedia";
import { uploadResume } from "@services/uploadBase64";
import {
	IAttachment,
	IFileUploadResType,
} from "@interface/helpSupport.interface";
import { useRoute } from "@react-navigation/native";
import { RootHomeStackRouteProps } from "@interface/types/rootHomeStack.type";
import { useHelpSupportEvents } from "@hooks/useHelpSupportEvents";

export const TicketDetailsController = () => {
	const { chooseFile } = useMedia();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>("");
	const [reopenTicket, setReopenTicket] = useState(false);
	const { onConversationEdit, onExpansionTicketCard } =
		useHelpSupportEvents();
	const { params } = useRoute<RootHomeStackRouteProps<"TicketDetails">>();

	const scrollViewRef = useRef();

	const scrollToBottom = () => {
		scrollViewRef?.current?.scrollToEnd({ animated: true });
	};

	const [selectedAttachments, setSelectedAttachments] = useState<
		IAttachment[]
	>([]);

	const onChooseIcon = () => {
		setIsOpen((prev) => !prev);
		onExpansionTicketCard(params?.id, !isOpen);
	};

	const onResetFun = () => {
		scrollToBottom()
		setInputValue("");
		setSelectedAttachments([]);
	};

	const onReopenTicket = () => {
		setReopenTicket(false);
	};

	const onSubmit = () => {
		onConversationEdit(inputValue, params?.id);
	};
	const onInputChange = (t: string) => {
		setInputValue(t);
	};

	const onMediaHandler = async () => {
		const result = await chooseFile();
		if (!result) {
			return null;
		}
		const formData = new FormData();
		formData.append("upload", {
			uri: result[0].uri,
			type: result[0].type,
			name: result[0].name,
		});
		const uploadRes: AxiosResponse<IFileUploadResType> = await uploadResume(
			formData,
		);
		const fileObj: IAttachment = {
			key: uploadRes.data.Key,
			size: uploadRes.data.size,
			name: uploadRes.data.originalname,
		};
		const attachments = [...selectedAttachments, fileObj];
		setSelectedAttachments(attachments);
	};

	const onRemoveItem = (t: number) => {
		const newArr = selectedAttachments?.filter((_, i) => i !== t);
		setSelectedAttachments(newArr);
	};

	return {
		isOpen,
		onResetFun,
		inputValue,
		onRemoveItem,
		reopenTicket,
		onChooseIcon,
		setReopenTicket,
		onInputChange,
		onMediaHandler,
		onReopenTicket,
		onSubmit,
		selectedAttachments,
		scrollViewRef,
		scrollToBottom
	};
};
