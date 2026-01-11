import React, { memo } from "react";
import { useSelector } from "react-redux";

import Webview from "@components/Reusable/Webview";

import { RootState } from "@redux/store/root.reducer";

interface ISurveyWebview {
	onWebviewLoad?: () => void;
	onSubmit: () => void;
	formId?: string;
	userProgramId: string;
}

const SurveyWebview = ({
	onWebviewLoad,
	onSubmit,
	formId,
	userProgramId,
}: ISurveyWebview) => {
	const { learningPartnerUserId, id } = useSelector(
		(state: RootState) => state.user.user,
	);

	const typeFormUrl = React.useMemo(() => {
		const url = new URL(`https://form.typeform.com/to/${formId}`);
		const params = {
			java_id: learningPartnerUserId,
			user: id,
			userprogram: userProgramId,
		};
		Object.entries(params).forEach(([key, value]) => {
			if (value) url.searchParams.append(key, value);
		});
		return url;
	}, [formId, learningPartnerUserId, id, userProgramId]);

	const htmlContent = React.useMemo(
		() =>
			`
				<!DOCTYPE html>
				<html lang="en">
				<head>
				<title>Typeform Embed</title>
				<meta charset="UTF-8" />
				<script src="https://embed.typeform.com/embed.js"></script>
				<style>
					html, body, #typeform-embed {
					margin: 0;
					padding: 0;
					height: 100%;
					width: 100%;
					overflow: hidden;
					background-color: white;
					}
				</style>
				</head>
				<body>
				<div id="typeform-embed"></div>
				<script>
					window.onload = function () {
						window.typeformEmbed.makeWidget(
							document.getElementById('typeform-embed'),
							'${typeFormUrl.toString()}',
							{
								hideHeaders: true,
								hideFooter: false,
								opacity: 0,
								onSubmit: function() {
									window.ReactNativeWebView.postMessage('formSubmitted');
								}
							}
						);
					};
				</script>
				</body>
				</html>
		`,
		[typeFormUrl],
	);

	return (
		<Webview
			onMessage={(event) => {
				if (event.nativeEvent.data === "formSubmitted") onSubmit();
			}}
			htmlContent={htmlContent}
			onWebviewLoad={onWebviewLoad}
		/>
	);
};

export default memo(SurveyWebview);
