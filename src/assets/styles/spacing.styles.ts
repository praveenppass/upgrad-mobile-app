import { StyleSheet } from "react-native";
import {
	moderateScale,
	verticalScale,
	horizontalScale,
} from "@utils/functions";

const spacing = StyleSheet.create({
	// gap
	g0: {
		gap: moderateScale(0),
	},
	g2: {
		gap: moderateScale(2),
	},
	g3: {
		gap: moderateScale(3),
	},
	g4: {
		gap: moderateScale(4),
	},
	g5: {
		gap: moderateScale(5),
	},
	g6: {
		gap: moderateScale(6),
	},
	g8: {
		gap: moderateScale(8),
	},
	g10: {
		gap: moderateScale(10),
	},
	g12: {
		gap: moderateScale(12),
	},
	g14: {
		gap: moderateScale(14),
	},
	g16: {
		gap: moderateScale(16),
	},
	g18: {
		gap: moderateScale(18),
	},
	g20: {
		gap: moderateScale(20),
	},
	g22: {
		gap: moderateScale(22),
	},
	g24: {
		gap: moderateScale(24),
	},
	rg32: {
		rowGap: moderateScale(32),
	},
	rg38: {
		rowGap: moderateScale(38),
	},

	rg4: {
		rowGap: moderateScale(4),
	},
	// padding
	p0: {
		padding: 0,
	},
	p2: {
		padding: moderateScale(2),
	},
	p4: {
		padding: moderateScale(4),
	},
	p6: {
		padding: moderateScale(6),
	},
	p8: {
		padding: moderateScale(8),
	},
	p10: {
		padding: moderateScale(10),
	},
	p12: {
		padding: moderateScale(12),
	},
	p14: {
		padding: moderateScale(14),
	},
	p16: {
		padding: moderateScale(16),
	},
	p18: {
		padding: moderateScale(18),
	},
	p20: {
		padding: moderateScale(20),
	},
	// padding-top
	pt0: {
		paddingTop: horizontalScale(0),
	},
	pt2: {
		paddingTop: horizontalScale(2),
	},
	pt4: {
		paddingTop: horizontalScale(4),
	},
	pt6: {
		paddingTop: horizontalScale(6),
	},
	pt8: {
		paddingTop: horizontalScale(8),
	},
	pt10: {
		paddingTop: horizontalScale(10),
	},
	pt12: {
		paddingTop: horizontalScale(12),
	},
	pt14: {
		paddingTop: horizontalScale(14),
	},
	pt16: {
		paddingTop: horizontalScale(16),
	},
	pt20: {
		paddingTop: horizontalScale(20),
	},
	pt24: {
		paddingTop: horizontalScale(24),
	},
	pt100: {
		paddingTop: horizontalScale(100),
	},
	// padding-bottom
	pb2: {
		paddingBottom: horizontalScale(2),
	},
	pb4: {
		paddingBottom: horizontalScale(4),
	},
	pb6: {
		paddingBottom: horizontalScale(6),
	},
	pb8: {
		paddingBottom: horizontalScale(8),
	},
	pb10: {
		paddingBottom: horizontalScale(10),
	},
	pb12: {
		paddingBottom: horizontalScale(12),
	},
	pb14: {
		paddingBottom: horizontalScale(14),
	},
	pb16: {
		paddingBottom: horizontalScale(16),
	},
	pb50: {
		paddingBottom: horizontalScale(50),
	},
	pb20: {
		paddingBottom: horizontalScale(20),
	},
	pb32: {
		paddingBottom: horizontalScale(32),
	},
	pb40: {
		paddingBottom: horizontalScale(40),
	},
	pb80: {
		paddingBottom: horizontalScale(80),
	},
	pb100: {
		paddingBottom: horizontalScale(100),
	},
	pb120: {
		paddingBottom: horizontalScale(120),
	},
	pb150: {
		paddingBottom: horizontalScale(150),
	},
	pb180: {
		paddingBottom: horizontalScale(180),
	},
	pbm10: {
		paddingBottom: moderateScale(10),
	},
	// padding-left
	pl2: {
		paddingLeft: verticalScale(2),
	},
	pl4: {
		paddingLeft: verticalScale(4),
	},
	pl6: {
		paddingLeft: verticalScale(6),
	},
	pl8: {
		paddingLeft: verticalScale(8),
	},
	pl10: {
		paddingLeft: verticalScale(10),
	},
	pl12: {
		paddingLeft: verticalScale(12),
	},
	pl14: {
		paddingLeft: verticalScale(14),
	},
	pl16: {
		paddingLeft: verticalScale(16),
	},
	pl18: {
		paddingLeft: verticalScale(18),
	},
	pl20: {
		paddingLeft: verticalScale(20),
	},
	// padding-right
	pr2: {
		paddingRight: verticalScale(2),
	},
	pr4: {
		paddingRight: verticalScale(4),
	},
	pr6: {
		paddingRight: verticalScale(6),
	},
	pr8: {
		paddingRight: verticalScale(8),
	},
	pr10: {
		paddingRight: verticalScale(10),
	},
	pr12: {
		paddingRight: verticalScale(12),
	},
	pr14: {
		paddingRight: verticalScale(14),
	},
	pr16: {
		paddingRight: verticalScale(16),
	},
	pr18: {
		paddingRight: verticalScale(18),
	},
	pr20: {
		paddingRight: verticalScale(20),
	},
	pr60: {
		paddingRight: verticalScale(60),
	},
	// paddingHorizontal
	ph2: {
		paddingHorizontal: verticalScale(2),
	},
	ph4: {
		paddingHorizontal: verticalScale(4),
	},
	ph6: {
		paddingHorizontal: verticalScale(6),
	},
	ph8: {
		paddingHorizontal: verticalScale(8),
	},
	ph10: {
		paddingHorizontal: verticalScale(10),
	},
	ph12: {
		paddingHorizontal: verticalScale(12),
	},
	ph14: {
		paddingHorizontal: verticalScale(14),
	},
	ph16: {
		paddingHorizontal: verticalScale(16),
	},
	ph18: {
		paddingHorizontal: verticalScale(18),
	},
	ph20: {
		paddingHorizontal: verticalScale(20),
	},
	ph24: {
		paddingHorizontal: verticalScale(24),
	},
	ph26: {
		paddingHorizontal: verticalScale(26),
	},
	// paddingVertical
	pv2: {
		paddingVertical: verticalScale(2),
	},
	pv4: {
		paddingVertical: verticalScale(4),
	},
	pv6: {
		paddingVertical: verticalScale(6),
	},
	pv8: {
		paddingVertical: verticalScale(8),
	},
	pv10: {
		paddingVertical: verticalScale(10),
	},
	pv12: {
		paddingVertical: verticalScale(12),
	},
	pv14: {
		paddingVertical: verticalScale(14),
	},
	pv16: {
		paddingVertical: verticalScale(16),
	},
	pv18: {
		paddingVertical: verticalScale(18),
	},
	pv20: {
		paddingVertical: verticalScale(20),
	},
	// margin
	m2: {
		margin: moderateScale(2),
	},
	m4: {
		margin: moderateScale(4),
	},
	m6: {
		margin: moderateScale(6),
	},
	m5: {
		margin: moderateScale(5),
	},
	m8: {
		margin: moderateScale(8),
	},
	m10: {
		margin: moderateScale(10),
	},
	m16: {
		margin: moderateScale(16),
	},
	m12: {
		margin: moderateScale(12),
	},
	// margin-left
	ml2: {
		marginLeft: verticalScale(2),
	},
	ml4: {
		marginLeft: verticalScale(4),
	},
	ml6: {
		marginLeft: verticalScale(6),
	},
	ml8: {
		marginLeft: verticalScale(8),
	},
	ml10: {
		marginLeft: verticalScale(10),
	},
	ml12: {
		marginLeft: verticalScale(12),
	},
	ml14: {
		marginLeft: verticalScale(14),
	},
	ml16: {
		marginLeft: verticalScale(16),
	},
	ml18: {
		marginLeft: verticalScale(18),
	},
	ml20: {
		marginLeft: verticalScale(20),
	},
	ml24: {
		marginLeft: verticalScale(24),
	},
	ml30: {
		marginLeft: verticalScale(30),
	},
	ml40: { marginLeft: verticalScale(40), },
	ml60: {
		marginLeft: verticalScale(60),
	},
	// padding-right
	mr2: {
		marginRight: verticalScale(2),
	},
	mr4: {
		marginRight: verticalScale(4),
	},
	mr6: {
		marginRight: verticalScale(6),
	},
	mr8: {
		marginRight: verticalScale(8),
	},
	mr10: {
		marginRight: verticalScale(10),
	},
	mr12: {
		marginRight: verticalScale(12),
	},
	mr14: {
		marginRight: verticalScale(14),
	},
	mr16: {
		marginRight: verticalScale(16),
	},
	mr18: {
		marginRight: verticalScale(18),
	},
	mr20: {
		marginRight: verticalScale(20),
	},
	mr24: {
		marginRight: verticalScale(24),
	},
	mr30: {
		marginRight: verticalScale(30),
	},
	// margin-top
	mt0: {
		marginTop: 0,
	},
	mt2: {
		marginTop: horizontalScale(2),
	},
	mt4: {
		marginTop: horizontalScale(4),
	},
	mt6: {
		marginTop: horizontalScale(6),
	},
	mt8: {
		marginTop: horizontalScale(8),
	},
	mt10: {
		marginTop: horizontalScale(10),
	},
	mt12: {
		marginTop: horizontalScale(12),
	},
	mt14: {
		marginTop: horizontalScale(14),
	},
	mt16: {
		marginTop: horizontalScale(16),
	},
	mt20: {
		marginTop: horizontalScale(20),
	},
	mt24: {
		marginTop: horizontalScale(24),
	},
	mt32: {
		marginTop: horizontalScale(32),
	},
	mt36: {
		marginTop: horizontalScale(36),
	},
	mt40: { marginTop: horizontalScale(40) },
	mt50: { marginTop: horizontalScale(50) },
	mt60: {
		marginTop: horizontalScale(60),
	},
	mt70: {
		marginTop: horizontalScale(70),
	},
	mt80: {
		marginTop: horizontalScale(80),
	},
	// margin-bottom
	mb2: {
		marginBottom: horizontalScale(2),
	},
	mb4: {
		marginBottom: horizontalScale(4),
	},
	mb6: {
		marginBottom: horizontalScale(6),
	},
	mb8: {
		marginBottom: horizontalScale(8),
	},
	mb10: {
		marginBottom: horizontalScale(10),
	},
	mb12: {
		marginBottom: horizontalScale(12),
	},
	mb16: {
		marginBottom: horizontalScale(16),
	},
	mb32: {
		marginBottom: horizontalScale(32),
	},
	mb20: {
		marginBottom: horizontalScale(20),
	},
	mh40: {
		marginBottom: horizontalScale(40),
	},
	mh0: {
		marginHorizontal: 0,
	},
	mh2: {
		marginHorizontal: horizontalScale(2),
	},
	mh4: {
		marginHorizontal: horizontalScale(4),
	},
	mh6: {
		marginHorizontal: horizontalScale(6),
	},
	mh8: {
		marginHorizontal: horizontalScale(8),
	},
	mh10: {
		marginHorizontal: horizontalScale(10),
	},
	mh12: {
		marginHorizontal: horizontalScale(12),
	},
	mh14: {
		marginHorizontal: horizontalScale(14),
	},
	mh16: {
		marginHorizontal: horizontalScale(16),
	},
	mh18: {
		marginHorizontal: horizontalScale(18),
	},
	mh20: {
		marginHorizontal: horizontalScale(20),
	},
	mh72: {
		marginHorizontal: horizontalScale(72),
	},
	mv0: {
		marginVertical: verticalScale(0),
	},
	mv2: {
		marginVertical: verticalScale(2),
	},
	mv4: {
		marginVertical: verticalScale(4),
	},
	mv6: {
		marginVertical: verticalScale(6),
	},
	mv8: {
		marginVertical: verticalScale(8),
	},
	mv10: {
		marginVertical: verticalScale(10),
	},
	mv12: {
		marginVertical: verticalScale(12),
	},
	mv16: {
		marginVertical: verticalScale(16),
	},
	mv20: {
		marginVertical: verticalScale(20),
	},
	mv24: {
		marginVertical: verticalScale(24),
	},
	mv32: {
		marginVertical: verticalScale(32),
	},
	mv100: {
		marginVertical: verticalScale(100),
	},
});

export default spacing;
