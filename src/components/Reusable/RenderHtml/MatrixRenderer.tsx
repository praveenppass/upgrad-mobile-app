import React from "react";

import { MAX_ALLOWED_WIDTH } from "@components/Reusable/RenderHtml/renderHtml.constants";
import RNText from "@components/Reusable/RNText";
import SvgFromUrl from "@components/Reusable/SvgFromUrl";

import { horizontalScale, verticalScale } from "@utils/functions";

import { ENV } from "@config/env";

interface MathMLNode {
	type?: string;
	data?: string;
	name?: string;
	children?: MathMLNode[];
	parentNode?: MathMLNode;
}

interface DOMNode {
	children: MathMLNode[];
}

interface TNode {
	domNode: DOMNode;
}

interface IMatrixRendererProps {
	tnode: TNode;
}

const customDimensions = {
	width: horizontalScale(60),
	height: verticalScale(30),
};

const MATRIX_TABLE_CONSTANTS = {
	MATRIX_TABLE: "mtable",
	MATRIX_TABLE_CELLS: "mtd",
	MATRIX_TABLE_ROW: "mtr",
};

const extractTextFromMathML = (node: MathMLNode): string => {
	if (!node) return "";
	if (node.type === "text") return node.data?.trim() || "";
	if (Array.isArray(node.children)) {
		return node.children.map(extractTextFromMathML).join("");
	}
	return "";
};

const findMtable = (node: MathMLNode): MathMLNode | null => {
	if (!node) return null;
	if (node.name === MATRIX_TABLE_CONSTANTS.MATRIX_TABLE) return node;

	if (node.children?.length) {
		for (const child of node.children) {
			const found = findMtable(child);
			if (found) return found;
		}
	}
	return null;
};

const generateMatrixLatex = (rows: string[]) => {
	if (!rows.length) return;
	return `\\begin{bmatrix} ${rows.join(" \\\\ ")} \\end{bmatrix}`;
};

const mapCellsToRow = (row: MathMLNode): string => {
	const cells = (row.children ?? [])
		.filter(
			(cell: MathMLNode) =>
				cell.name === MATRIX_TABLE_CONSTANTS.MATRIX_TABLE_CELLS,
		)
		.map(extractTextFromMathML);

	return cells.join(" & ");
};

const getMatrixData = (data: MathMLNode[]) => {
	if (!data || !data.length) return;

	const mtableNode = findMtable({ children: data });
	if (!mtableNode || !mtableNode.children) return;

	const rows = mtableNode.children
		.filter(
			(row: MathMLNode) =>
				row.name === MATRIX_TABLE_CONSTANTS.MATRIX_TABLE_ROW,
		)
		.map(mapCellsToRow);

	if (!rows.length) return;

	return generateMatrixLatex(rows);
};

const getLatexRenderUrl = (matrix?: string) => {
	if (!matrix) return "";
	const encodedFormula = encodeURIComponent(matrix);

	return `${ENV.LatexRenderUrl}/render?formula=${encodedFormula}`;
};

const getFractionPart = (
	children: MathMLNode[] | undefined,
	index: number,
): string => {
	if (!children || !children[index]) return "";
	return children[index]?.children?.[0]?.data?.trim() ?? "";
};

const MatrixRenderer = ({ tnode: _tnode }: IMatrixRendererProps) => {
	const mathNode = _tnode?.domNode;
	if (!mathNode) return null;

	const fractionNode = mathNode.children?.find(
		(child) => child.name === "mfrac",
	);

	if (fractionNode) {
		const numberNodes = fractionNode.children?.filter(
			(c) => c.name === "mn",
		);
		const numerator = getFractionPart(numberNodes, 0);
		const denominator = getFractionPart(numberNodes, 1);

		if (numerator && denominator) {
			return <RNText>{`${numerator} / ${denominator}`}</RNText>;
		}
		return null;
	}

	const matrix = getMatrixData(_tnode.domNode.children);

	if (!matrix) return <></>;

	const url = getLatexRenderUrl(matrix);

	if (!url) return <></>;

	return (
		<SvgFromUrl
			url={url}
			customDimensions={customDimensions}
			maxWidth={MAX_ALLOWED_WIDTH}
		/>
	);
};

export default MatrixRenderer;
