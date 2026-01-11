/* eslint-disable func-style */
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import {
	IAssetItem,
	IModuleType,
} from "@components/Courses/CourseDetails/Note/common/ModuleAndAssetInterface";
import { useNotesModel } from "@components/Courses/CourseDetails/Note/useNotesModel";
import { ToastType, useToast } from "@components/Reusable/Toast";

import { IGeneralNotesItems } from "@graphql/query/generalNotes/getAllGeneralNotesQuery";
import { INotesAssetCourseType } from "@graphql/query/notes/getNoteAssetCourseQuery";
import {
	IAssetUserProgram,
	INotesAssetQuery,
} from "@graphql/query/notes/getNotesAssetQuery";
import { INoteItems } from "@graphql/query/notes/getNotesListQuery";
import { INotesForUserProgram } from "@graphql/query/notes/getNotesProgramContainerQuery";

import downloadBase64File from "@services/downloadBase64File";

import { studyPlanSlice } from "@redux/slices/studyplan.slice";

import {
	ICourseVariantEnum,
	IFileTypeEnum,
	LearningPathType,
} from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";
import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { strings } from "@assets/strings";

const emptyGeneralNotesItems = {
	note: { id: "", content: "", title: "", type: "", updatedAt: "" },
};

const emptyNoteItems = {
	id: "",
	level1: "",
	level2: "",
	level3: "",
	level4: "",
	content: "",
	asset: null,
	updatedAt: "",
};

export enum ActiveTab {
	GenerateNotes = "GeneralNotes",
	Notes = "Notes",
}
export interface RouteParams {
	courseID: string;
	courseVariant: ICourseVariantEnum;
	courseName: string;
}

export interface CourseData {
	asset: null | undefined;
	code: string;
	label: string;
	level1: string;
	level2: string;
	level3: string;
	level4: string;
	name: string;
	totalBookmarks: number;
	description?: string | null;
}

export enum INotesModalType {
	ListOfNotes = "listOfNotes",
	AddNotes = "addNotes",
}
interface INotesScreenController {
	learningPathType: string;
	learningPathId: string;
	learningPathName: string;
	workshopId: string;
	workshopCode: string;
	userProgramId?: string;
	learningPathCode: string;
}
export const useNotesController = ({
	learningPathType,
	learningPathId,
	learningPathName,
	workshopId,
	workshopCode,
	userProgramId,
	learningPathCode,
}: INotesScreenController) => {
	const dispatch = useDispatch();

	const { showToast } = useToast();
	const [addNote, setAddNote] = useState("");
	const [saveNoteList, setSaveNoteList] = useState({});
	const [showNoteModal, setShowNoteModal] = useState(false);
	const [activeNotesTab, setActiveNotesTab] = useState(ActiveTab.Notes);
	const [editNoteItem, setEditNoteItem] = useState<IGeneralNotesItems>(
		emptyGeneralNotesItems,
	);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [editInfo, setEditInfo] = useState<INoteItems>(emptyNoteItems);
	const [modalType, setModalType] = useState<INotesModalType | null>(null);
	const [isConfirmationModalVisible, setConfirmationModal] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const {
		programContainerDetails,
		listOfGeneralNotesProgram,
		listOfGeneralNotesCourse,
		notesAssetData,
		totalNotesCount,
		studyProgramContainer,
		courseContainerDetails,
		studyCourseContainer,
		getGeneralNotesProgram,
		getGeneralNotesCourse,
		getProgramContainerDetails,
		downloadGeneralNotes,
		deleteGeneralNoteCall,
		createGeneralNoteCall,
		updateGeneralNoteCall,
		getNotesAssetsList,
		getTotalNotes,
		getStudyCourseDetails,
		deleteNoteCall,
		updateNoteCall,
		getCourseContainerDetails,
		getStudyCourseContainerDetails,
		getNotesAssetsCourseList,
		downloadCourseNotes,
	} = useNotesModel();

	const navigation = useNavigation<RootHomeStackList>();

	const [courseRender, setCourseRender] = useState<{
		courseData: INotesForUserProgram[];
		activeIndex: number;
	}>({ courseData: [], activeIndex: 0 });

	const isProgramType = learningPathType === LearningPathType.PROGRAM;

	const navigateToAssetScreen = async (item: IAssetItem) => {
		if (item.notes?.[0]) {
			const { id, level1, level2, level3, level4 } = item.notes[0];
			const code = item.asset?.code;
			const name = item.asset?.name;
			const assetType = item.asset?.assetType?.type;

			await dispatch(
				studyPlanSlice.actions.selectAsset({
					id: id,
					activity: { level1, level2, level3, level4 },
					code,
					name,
				}),
			);

			// Navigate to the Asset screen
			navigation.navigate("Container6Screen", {
				assetCode: code ?? "",
				learningPathType: isProgramType
					? LearningPathType.PROGRAM
					: LearningPathType.COURSE,
				learningPathId: learningPathId,
				learningPathName: learningPathName,
				courseId: level1 || null,
				moduleId: level2 || null,
				sessionId: level3 || null,
				segmentId: level4 || null,
				ispostSubmission: false,
				elective: "",
				electiveGroup: "",
				track: "",
				trackGroup: "",
				workshopId,
				workshopCode,
				userProgramId,
				learningPathCode,
				assetType: (assetType as IAssetType) || null,
			});
		}
	};

	// general note
	useEffect(() => {
		(async () => {
			await getGeneralNoteList();
		})();
	}, []);

	async function getGeneralNoteList() {
		if (isProgramType)
			await getGeneralNotesProgram({
				variables: { where: { userProgram: learningPathId } },
			});
		else
			await getGeneralNotesCourse({
				variables: { where: { userCourse: learningPathId } },
			});
	}

	const listOfGeneralNotes = useMemo(() => {
		return isProgramType
			? listOfGeneralNotesProgram?.notesForUserProgram
			: listOfGeneralNotesCourse?.notesForUserCourse;
	}, [isProgramType, listOfGeneralNotesProgram, listOfGeneralNotesCourse]);

	const handleNotesPopup = (
		noteType: string,
		editItem: IGeneralNotesItems,
	) => {
		setAddNote(noteType);
		setEditNoteItem(editItem);
	};

	const handleTabs = (type: ActiveTab) => {
		setActiveNotesTab(type);
	};

	const handleNoteModal = (value: boolean) => {
		setShowNoteModal(value);
		setModalType(INotesModalType.ListOfNotes);
	};

	const handleCloseModal = () => {
		setShowNoteModal(false);
		setShowDeleteModal(false);
	};

	const handleOpenModal = (type: INotesModalType) => {
		setModalType(type);
	};

	const openAddNote = (item: INoteItems) => {
		handleOpenModal(INotesModalType.AddNotes);
		setEditInfo(item);
	};

	async function downloadGeneralNote() {
		const filteredGeneralNotes = listOfGeneralNotes?.filter(
			(item: IGeneralNotesItems) => item.note !== null,
		);

		if (
			filteredGeneralNotes?.length == 0 &&
			courseRender?.courseData?.[0]?.totalNotes == null
		) {
			showToast({
				message: strings.NO_NOTE_AVAILABLE,
				type: ToastType.SUCCESS,
			});
		} else {
			const variables = {
				where: {
					...(isProgramType
						? { userProgram: learningPathId }
						: { userCourse: learningPathId }),
				},
			};

			try {
				await downloadGeneralNotes({
					variables,
					onCompleted: (responseData) => {
						downloadBase64File({
							base64File:
								responseData.downloadProgramNotesCSV.file,
							fileName:
								responseData.downloadProgramNotesCSV.__typename,
							fileExtension: IFileTypeEnum.CSV,
							successCallback: () => {
								showToast({
									message: strings.DOWNLOAD_NOTES_SUCCESS,
									type: ToastType.SUCCESS,
								});
							},
							errorCallback: () => {
								showToast({
									message: strings.DOWNLOAD_NOTE_FAIL,
									type: ToastType.ERROR,
								});
							},
						});
					},
				});
			} catch (error) {}
		}
	}

	const downloadCourseNote = async () => {
		if (totalNotesCount?.learnerCourseNotesCount?.totalCount === 0) {
			return showToast({
				message: strings.NO_NOTE_AVAILABLE,
				type: ToastType.SUCCESS,
			});
		}
		const variables = { where: { userCourse: learningPathId } };
		try {
			await downloadCourseNotes({
				variables,
				onCompleted: (responseData) => {
					downloadBase64File({
						base64File: responseData.downloadNotesCSV.file,
						fileName: responseData.downloadNotesCSV.__typename,
						fileExtension: IFileTypeEnum.CSV,
						successCallback: () => {
							showToast({
								message: strings.DOWNLOAD_NOTES_SUCCESS,
								type: ToastType.SUCCESS,
							});
						},
						errorCallback: () => {
							showToast({
								message: strings.DOWNLOAD_NOTE_FAIL,
								type: ToastType.ERROR,
							});
						},
					});
				},
			});
		} catch (error) {}
	};

	const handleConfirmationModal = () => {
		setConfirmationModal(!isConfirmationModalVisible);
		setAddNote("");
	};

	const handleNumberSelect = (value: number) => {
		const courses = isProgramType
			? (programContainerDetails?.notesForUserProgram ?? [])
			: (courseContainerDetails?.notesForUserCourse ?? []);
		const _data_arr = courses[value];
		setCourseRender({ courseData: [_data_arr], activeIndex: value });
		getCourseAsset(_data_arr?.code);
		setIsLoading(true);
	};

	useEffect(() => {
		const courses = isProgramType
			? (programContainerDetails?.notesForUserProgram ?? [])
			: (courseContainerDetails?.notesForUserCourse ?? []);

		if (courses?.length > 0) {
			const _data_arr = courses[courseRender?.activeIndex];
			setCourseRender({
				courseData: [_data_arr],
				activeIndex: courseRender.activeIndex,
			});
			getCourseAsset(_data_arr?.code);
		}
		setIsLoading(false);
	}, [programContainerDetails, courseContainerDetails]);

	useFocusEffect(
		useCallback(() => {
			(async () => {
				if (learningPathId) {
					if (isProgramType) {
						getProgramSelector();
						getStudyProgramSelector();
					} else {
						getCourseSelectorContainer();
						getStudyCourseSelector();
					}
					await getNotesCounts();
				}
			})();
		}, []),
	);

	// Course Selector Api
	async function getProgramSelector() {
		const variables = { where: { userProgram: learningPathId } };
		await getProgramContainerDetails({ variables });
	}

	async function getCourseSelectorContainer() {
		const variables = { where: { userCourse: learningPathId } };

		await getCourseContainerDetails({ variables });
	}

	async function getStudyProgramSelector() {
		const variables = { where: { id: learningPathId } };
		await getStudyCourseDetails({ variables });
	}

	async function getStudyCourseSelector() {
		const variables = { where: { id: learningPathId } };
		await getStudyCourseContainerDetails({ variables });
	}

	async function getNotesCounts() {
		const variables = {
			where: {
				...(isProgramType
					? { userProgram: learningPathId }
					: { userCourse: learningPathId }),
			},
		};
		await getTotalNotes({ variables });
	}

	// Module Card Api
	const [assetModuleList, setAssetModuleList] = useState<IModuleType[]>([]);

	async function getCourseAsset(code: string) {
		try {
			const variables = {
				where: {
					...(isProgramType
						? { userProgram: learningPathId }
						: { userCourse: learningPathId }),
					level1: code,
				},
			};

			const { data } = isProgramType
				? await getNotesAssetsList({ variables })
				: await getNotesAssetsCourseList({ variables });

			const notesData: IAssetUserProgram[] = isProgramType
				? ((data as INotesAssetQuery)?.notesForUserProgram ?? [])
				: ((data as INotesAssetCourseType)?.notesForUserCourse ?? []);

			if (!notesData) {
				setAssetModuleList([]);
				return;
			}

			const filterList: IModuleType[] = notesData
				.filter(
					(item) =>
						item.asset == null ||
						(item.notes && item.notes.length > 0),
				)
				.map((item) => ({ ...item, assetItem: [] }));

			setAssetModuleList(filterList);
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	}

	// note delete
	const deleteGeneralNote = () => {
		deleteGeneralNoteCall({
			variables: { where: { id: editNoteItem.note?.id } },
			onCompleted: () => {
				getNotesCounts();
				getGeneralNoteList();
				setConfirmationModal(false);
				showToast({
					message: strings.NOTE_DELETED,
					type: ToastType.SUCCESS,
				});
			},
		});
	};

	const handleAddNoteApiCall = (title: string, notes: string) => {
		if (title?.trim() != "" && notes?.trim() != "") {
			if (editNoteItem.note?.id != "") {
				updateGeneralNote(title, notes);
			} else {
				createGeneralNote(title, notes);
			}
		}
	};

	const handleNoteApiCall = (title: string, notes: string) => {
		if (notes?.trim() != "") {
			updateNote(notes);
		}
	};

	const updateNote = async (notes: string) => {
		await updateNoteCall({
			variables: { data: { content: notes }, where: { id: editInfo.id } },
			onCompleted: async (data) => {
				if (data) {
					handleCloseModal();
					setModalType(INotesModalType.ListOfNotes);
					if (isProgramType) {
						getProgramSelector();
						getStudyProgramSelector();
					} else {
						getCourseSelectorContainer();
						getStudyCourseSelector();
					}
					await getNotesCounts();
					showToast({
						message: strings.NOTE_EDITED,
						type: ToastType.SUCCESS,
					});
				}
			},
		});
	};

	const deleteNote = () => {
		deleteNoteCall({
			variables: { where: { id: editInfo?.id } },
			onCompleted: async () => {
				handleCloseModal();
				if (isProgramType) {
					getProgramSelector();
					getStudyProgramSelector();
				} else {
					getCourseSelectorContainer();
					getStudyCourseSelector();
				}
				await getNotesCounts();
				showToast({
					message: strings.NOTE_DELETED,
					type: ToastType.SUCCESS,
				});
			},
		});
	};

	// note create
	const createGeneralNote = async (title: string, notes: string) => {
		await createGeneralNoteCall({
			variables: {
				data: {
					content: notes,
					title: title,
					type: "generic",
					...(isProgramType
						? { userProgram: learningPathId }
						: { userCourse: learningPathId }),
				},
			},
			onCompleted: (data) => {
				if (data) {
					getNotesCounts();
					handleNotesPopup("", emptyGeneralNotesItems);
					getGeneralNoteList();
					showToast({
						message: strings.GENERAL_NOTE_ADDED,
						type: ToastType.SUCCESS,
					});
				}
			},
		});
	};

	//note update
	const updateGeneralNote = async (title: string, notes: string) => {
		await updateGeneralNoteCall({
			variables: {
				where: { id: editNoteItem?.note?.id ?? "" },
				data: { content: notes, title: title },
			},
			onCompleted: (data) => {
				if (data) {
					handleNotesPopup("", emptyGeneralNotesItems);
					getGeneralNoteList();
					showToast({
						message: strings.GENERAL_NOTE_UPDATED,
						type: ToastType.SUCCESS,
					});
				}
			},
		});
	};

	const handleItemPress = async (code: string, item: any, index: number) => {
		try {
			const variables = {
				where: {
					...(isProgramType
						? { userProgram: learningPathId }
						: { userCourse: learningPathId }),
					level1: item?.level1 || code,
					...(item.level2 && { level2: item.level2 }),
					...(item.level2 && { level3: item.code }),
				},
			};

			const { data } = isProgramType
				? await getNotesAssetsList({ variables })
				: await getNotesAssetsCourseList({ variables });

			const notesData: IAssetUserProgram[] = isProgramType
				? ((data as INotesAssetQuery)?.notesForUserProgram ?? [])
				: ((data as INotesAssetCourseType)?.notesForUserCourse ?? []);

			if (notesData) {
				const filterAssetList = notesData.filter(
					(assetItem) => assetItem.asset != null,
				);
				const filteredModules = notesData.filter(
					(moduleItem) => moduleItem.asset == null,
				);

				setAssetModuleList((prevModulesList) => {
					const updatedModulesList = [...prevModulesList];

					filteredModules.forEach((moduleItem, idx) => {
						if (
							!updatedModulesList.some(
								(existingModule) =>
									existingModule.code === moduleItem.code,
							)
						) {
							updatedModulesList.splice(index + 1 + idx, 0, {
								...moduleItem,
								assetItem: [],
							});
						}
					});
					if (updatedModulesList[index]) {
						updatedModulesList[index].assetItem = filterAssetList;
					}
					return updatedModulesList;
				});
			}
		} catch (error) {}
	};

	const handleModal = (val: boolean) => {
		setShowNoteModal(!val);
		setShowDeleteModal(val);
		if (!val) {
			setModalType(INotesModalType.ListOfNotes);
		}
	};

	const closeDeleteModal = (val: boolean) => {
		setShowDeleteModal(val);
	};

	return {
		courseRender,
		programContainerDetails,
		addNote,
		activeNotesTab,
		listOfGeneralNotes,
		editNoteItem,
		isLoading,
		isConfirmationModalVisible,
		emptyGeneralNotesItems,
		notesAssetData,
		assetModuleList,
		totalNotesCount,
		studyProgramContainer,
		studyCourseContainer,
		showNoteModal,
		isProgramType,
		courseContainerDetails,
		handleNotesPopup,
		handleNumberSelect,
		handleTabs,
		downloadGeneralNote,
		navigateToAssetScreen,
		handleConfirmationModal,
		deleteGeneralNote,
		handleAddNoteApiCall,
		handleItemPress,
		handleNoteModal,
		saveNoteList,
		setSaveNoteList,
		modalType,
		INotesModalType,
		openAddNote,
		editInfo,
		deleteNote,
		handleNoteApiCall,
		handleModal,
		showDeleteModal,
		closeDeleteModal,
		downloadCourseNote,
	};
};

export default useNotesController;
