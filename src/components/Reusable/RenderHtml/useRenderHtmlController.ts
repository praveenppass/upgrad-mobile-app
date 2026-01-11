import { cleanContent } from "@components/Reusable/RenderHtml/renderHtml.utils";

interface IRenderHtmlControllerProps {
	content: string;
}

const useRenderHtmlController = ({ content }: IRenderHtmlControllerProps) => {
	const cleanedContent = cleanContent(content);

	return {
		cleanedContent,
	};
};

export default useRenderHtmlController;
