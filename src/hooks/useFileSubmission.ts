import { useCallback, useState } from "react";

import { isValidUrl } from "@utils/functions";

export interface FileSubmissionItem {
	id: string;
	name: string;
	url: string;
	type: "file" | "url";
	status: "uploading" | "completed" | "error";
	progress?: number;
	error?: string;
	size?: number;
}

export interface FileSubmissionConfig {
	maxFiles: number;
	maxUrls?: number;
	allowedTypes?: string[];
	maxFileSize?: number;
	onFileUpload?: () => Promise<any> | void;
	onUrlAdd?: (url: string) => void;
	initialFiles?: Array<{ name: string; url: string; type?: string }>;
}

export interface FileValidationError {
	errorMessage: string;
	errorFile: string;
}

export const useFileSubmission = (config: FileSubmissionConfig) => {
	const [submissions, setSubmissions] = useState<FileSubmissionItem[]>(() => {
		// Initialize with existing files if provided
		if (config.initialFiles) {
			return config.initialFiles.map((file, index) => ({
				id: `${file.name}-${index}`,
				name: file.name,
				url: file.url,
				type: (file.type === "url" ? "url" : "file") as "file" | "url",
				status: "completed" as const,
			}));
		}
		return [];
	});

	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);

	// Get counts by type
	const fileCount = submissions.filter((s) => s.type === "file").length;
	const urlCount = submissions.filter((s) => s.type === "url").length;

	// Check limits
	const canAddFiles = fileCount < config.maxFiles;
	const canAddUrls = !config.maxUrls || urlCount < config.maxUrls;
	const maxLimitReached = submissions.length >= config.maxFiles;
	const urlLimitReached =
		config.maxUrls !== undefined && urlCount >= config.maxUrls;

	// Add file submission
	const addFile = useCallback(async () => {
		if (!canAddFiles || !config.onFileUpload) return;

		setIsUploading(true);
		setUploadProgress(0);

		try {
			const result = config.onFileUpload();
			if (result instanceof Promise) {
				await result;
			}
		} finally {
			setIsUploading(false);
			setUploadProgress(0);
		}
	}, [canAddFiles, config.onFileUpload]);

	// Add URL submission
	const addUrl = useCallback(
		(url: string) => {
			if (!canAddUrls || !url.trim()) return false;

			const isValid = isValidUrl(url);
			if (!isValid) return false;

			const newSubmission: FileSubmissionItem = {
				id: `url-${Date.now()}`,
				name: url,
				url: url,
				type: "url",
				status: "completed",
			};

			setSubmissions((prev) => [...prev, newSubmission]);

			// Call the original URL handler if provided
			if (config.onUrlAdd) {
				config.onUrlAdd(url);
			}

			return true;
		},
		[canAddUrls, config.onUrlAdd],
	);

	// Remove submission
	const removeSubmission = useCallback((fileName: string) => {
		setSubmissions((prev) => prev.filter((file) => file.name !== fileName));
	}, []);

	// Update submissions (for external updates)
	const updateSubmissions = useCallback(
		(newFiles: Array<{ name: string; url: string; type?: string }>) => {
			const updatedSubmissions = newFiles.map((file, index) => ({
				id: `${file.name}-${index}`,
				name: file.name,
				url: file.url,
				type: (file.type === "url" ? "url" : "file") as "file" | "url",
				status: "completed" as const,
			}));
			setSubmissions(updatedSubmissions);
		},
		[],
	);

	// Set upload progress
	const setProgress = useCallback((progress: number) => {
		setUploadProgress(progress);
	}, []);

	// Set upload status
	const setUploaded = useCallback((uploaded: boolean) => {
		setIsUploading(!uploaded);
	}, []);

	// Validation
	const isValid = submissions.length === config.maxFiles;
	const hasSubmissions = submissions.length > 0;

	return {
		// State
		submissions,
		isUploading,
		uploadProgress,

		// Counts and limits
		fileCount,
		urlCount,
		canAddFiles,
		canAddUrls,
		maxLimitReached,
		urlLimitReached,

		// Actions
		addFile,
		addUrl,
		removeSubmission,
		updateSubmissions,
		setProgress,
		setUploaded,

		// Validation
		isValid,
		hasSubmissions,
	};
};
