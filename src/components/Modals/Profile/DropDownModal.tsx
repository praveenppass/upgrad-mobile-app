import { useMutation } from "@apollo/client";
import {
	BottomSheetFlatList,
	BottomSheetScrollView,
	BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DropDownButton from "@components/Profile/DropDownButton";
import Loading from "@components/Reusable/Loading";
import RNText from "@components/Reusable/RNText";

import { createOnboardingOption } from "@graphql/mutation/createOnboardingOption";

import useDebounce from "@hooks/useDebounce";
import useGetOnboardingOptionsQuery from "@hooks/useGetOnboardingOptionsQuery";

import { isLastItem, moderateScale } from "@utils/functions";
import measures from "@utils/measures";

import { client } from "@config/apollo";

import {
	IDropDownData,
	IDropDownOptions,
	ISearchField,
} from "@interface/user.interface";

import { C } from "@assets/constants";

const {
	BORDER: { b4, b1 },
} = measures;

const {
	strings,
	themes: { bg, text },
	commonStyles: {
		spacing: { pl12, mb10, mh10, pb100, mt12, mh12, p16 },
		text: { clrBlack, bold, md, reg },
	},
} = C;

interface IDropdownProps extends IDropDownOptions {
	data: IDropDownData[];
	onChooseItem: (item: IDropDownData) => void;
	dataLoading?: boolean;
}

const DropDownModal = ({
	data,
	title,
	selectedItem,
	queryKey,
	dataLoading,
	onChooseItem,
}: IDropdownProps) => {
	const { getOptions, listing, loading } = useGetOnboardingOptionsQuery();
	const [searchText, setSearchText] = useState<string>("");

	const { bottom } = useSafeAreaInsets();

	const [addOptions] = useMutation(createOnboardingOption, {
		client,
		variables: {
			data: {
				field: queryKey,
				option: searchText,
			},
		},
		onCompleted: () => {
			const queryParams = {
				where: {
					name: searchText,
					field: queryKey,
				},
			};
			getOptions({
				variables: queryParams,
			});
		},
	});

	useEffect(() => {
		if (queryKey) {
			getSearchData();
		}
	}, []);

	useEffect(() => {
		const queryParams = {
			where: {
				name: "",
				field: queryKey,
			},
		};
		setSearchText("");
		getOptions({
			variables: queryParams,
		});
	}, [queryKey]);

	//* Query
	const getSearchData = (text?: string) => {
		const queryParams = {
			where: {
				name: text,
				field: queryKey,
			},
		};
		getOptions({
			variables: queryParams,
		});
	};

	const handleSearch = useDebounce((text: string) => {
		getSearchData(text);
	}, 800);

	const renderItem = ({
		item,
		index,
	}: {
		item: IDropDownData;
		index?: number | null;
	}) => {
		const onBtnHandler = () => {
			if (index === null) {
				return;
			}
			setSearchText("");
			onChooseItem(item);
		};

		const displayName = item.name ?? "Untitled Program";
		const isDisabled = displayName === "No Data Found" || index === null;
		const isActive =
			displayName === selectedItem || item.code === selectedItem;

		return (
			<DropDownButton
				key={`${item?.id}-${item?.code}-${index}`}
				disabled={isDisabled}
				title={displayName}
				onBtnHandler={onBtnHandler}
				isActive={isActive}
				withDivider={!isLastItem(data, index)}
			/>
		);
	};

	const renderHeader = () => (
		<RNText
			style={styles.titleStyle}
			title={`${strings.SELECT} ${title}`}
		/>
	);

	const onChangeText = (text: string) => {
		handleSearch(text);
		setSearchText(text);
	};

	const renderSearchHeader = () => {
		return (
			<BottomSheetTextInput
				autoFocus={false}
				value={searchText}
				style={styles.input}
				onChangeText={onChangeText}
				placeholder={`${strings.SELECT} ${title}`}
			/>
		);
	};

	const addNewItemFun = () =>
		Alert.alert("", strings.ADD_ON_BOARDING_ITEM_MESSAGE, [
			{
				text: strings.CANCEL,
				style: "cancel",
			},
			{ text: strings.ADD, onPress: () => addOptions() },
		]);

	const AddNewItemView = () => {
		return (
			<DropDownButton
				title={`<${strings.ADD}> ${searchText}`}
				onBtnHandler={addNewItemFun}
				isActive={false}
				withDivider={true}
			/>
		);
	};

	const loadingView = () => {
		return (
			<Loading style={[styles.defaultLoaderStyle, styles.loaderHeight]} />
		);
	};

	if (!data && !queryKey) {
		return <Loading />;
	}

	if (queryKey) {
		return (
			<BottomSheetScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={pb100}
			>
				{renderSearchHeader()}
				{loading && <Loading style={styles.defaultLoaderStyle} />}
				{listing?.getOnboardingOptions?.map((item, index) => {
					return renderItem({ item, index });
				})}
				{!loading &&
				!listing?.getOnboardingOptions?.length &&
				queryKey !== ISearchField.DEGREE ? (
					<AddNewItemView />
				) : (
					!loading &&
					searchText &&
					!listing?.getOnboardingOptions?.length &&
					renderItem({
						item: { name: strings.NO_DATA, id: "" },
						index: null,
					})
				)}
			</BottomSheetScrollView>
		);
	}

	return (
		<BottomSheetFlatList
			data={dataLoading ? [] : data}
			renderItem={renderItem}
			bounces={false}
			ListHeaderComponentStyle={queryKey ? mh10 : null}
			initialNumToRender={10}
			ListHeaderComponent={renderHeader}
			keyExtractor={(item) => `${item.id} - ${item.code} - ${item.name}`}
			ListEmptyComponent={
				dataLoading
					? loadingView()
					: renderItem({
							item: { name: strings.NO_DATA, id: "" },
							index: null,
						})
			}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: bottom }}
		/>
	);
};

export default DropDownModal;

const styles = StyleSheet.create({
	defaultLoaderStyle: {
		height: "50%",
	},
	input: {
		...mt12,
		...mh12,
		height: moderateScale(50),
		...p16,
		backgroundColor: bg.white,
		borderColor: text.steelBlue,
		borderRadius: b4,
		borderWidth: b1,
		...reg,
	},
	loaderHeight: {
		height: moderateScale(250),
	},
	titleStyle: {
		...md,
		...mb10,
		...bold,
		...pl12,
		...clrBlack,
		textTransform: "capitalize",
	},
});
