import React, { memo } from "react";
import Pdf, { PdfProps, Source } from "react-native-pdf";

/**
 * Isolated PDF component that only re-renders when URI actually changes.
 * This prevents the native onAfterUpdateTransaction from being called during animations.
 *
 * NOTE - parent component should also only try to limit rate at which passed uri updates
 */

const PdfView = (props: PdfProps) => {
	return <Pdf {...props} />;
};

const IsolatedPdfView = memo(
	PdfView,

	// Only re-render if URI changes - ignore all other prop changes
	(prevProps, nextProps) =>
		(prevProps.source as Source).uri === (nextProps.source as Source).uri,
);

export default IsolatedPdfView;
