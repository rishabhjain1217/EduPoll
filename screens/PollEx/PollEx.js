//
//  PollEx
//  PollScreen
//
//  Created by [Author].
//  Copyright © 2018 [Company]. All rights reserved.
//

import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"


export default class PollEx extends React.Component {

	static navigationOptions = ({ navigation }) => {
	
		const { params = {} } = navigation.state
		return {
				header: null,
				headerLeft: null,
				headerRight: null,
			}
	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	render() {
	
		return <View
				style={styles.pollExView}>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						justifyContent: "center",
					}}>
					<Image
						source={require("./../../assets/images/poll-ex-background-mask.png")}
						style={styles.pollExBackgroundMaskImage}/>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 66,
						width: 276,
						top: 64,
						bottom: 28,
						alignItems: "center",
					}}>
					<Text
						style={styles.cs1111Question1Text}>CS 1111: Question 1</Text>
					<Text
						style={styles.whatNumberIsThisInBinary1011Text}>What number is this in binary?{"\n"}{"\n"}1011</Text>
					<Text
						style={styles.textFourText}>8</Text>
					<Text
						style={styles.textText}>3</Text>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.textTwoText}>11</Text>
					<Text
						style={styles.textThreeText}>11</Text>
				</View>
				<Text
					style={styles.textFiveText}>5</Text>
			</View>
	}
}

const styles = StyleSheet.create({
	pollExView: {
		backgroundColor: "white",
		flex: 1,
	},
	pollExBackgroundMaskImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		width: null,
		height: 896,
	},
	cs1111Question1Text: {
		color: "black",
		fontFamily: ".AppleSystemUIFont",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 24,
		backgroundColor: "transparent",
	},
	whatNumberIsThisInBinary1011Text: {
		color: "rgb(106, 110, 113)",
		fontFamily: ".AppleSystemUIFont",
		fontSize: 32,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 40,
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		width: 276,
		marginTop: 112,
	},
	textFourText: {
		backgroundColor: "transparent",
		color: "white",
		fontSize: 32,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginTop: 175,
	},
	textText: {
		backgroundColor: "transparent",
		color: "white",
		fontSize: 32,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginTop: 55,
	},
	textTwoText: {
		backgroundColor: "transparent",
		color: "white",
		fontSize: 32,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginBottom: 69,
	},
	textThreeText: {
		backgroundColor: "transparent",
		color: "white",
		fontSize: 32,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		alignSelf: "flex-start",
		marginLeft: 122,
	},
	textFiveText: {
		backgroundColor: "transparent",
		color: "white",
		fontSize: 32,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		position: "absolute",
		alignSelf: "center",
		bottom: 44,
	},
})
