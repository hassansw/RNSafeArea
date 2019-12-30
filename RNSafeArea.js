import React, {PureComponent} from 'react'
import DeviceInfo from 'react-native-device-info'
import {View, Text, StyleSheet, StatusBar, Platform, NativeModules, Dimensions} from 'react-native'
import PropTypes from 'prop-types'
class SafeAreaDecider extends PureComponent {
	constructor(props) {
		super(props)
	}

	state = {
		navbarHeight: null,
		deviceHaveNotch: false,
		deviceVersion: 9, // things change after 9.
	}

	componentDidMount = async () => {
		const deviceHaveNotch = await DeviceInfo.hasNotch()
		const deviceVersion = await DeviceInfo.getSystemVersion()
		if (Platform.OS === 'ios') {
			const iosHeight = deviceHaveNotch ? 44: 20
			this.setState({navbarHeight: iosHeight, deviceHaveNotch: deviceHaveNotch})
		} else if (Platform.OS === 'android') {
			this.setState({navbarHeight: StatusBar.currentHeight, deviceHaveNotch: deviceHaveNotch, deviceVersion: Number(deviceVersion.toString().split('.')[0])})
		}
	}

	render() {
		const {navbarHeight, deviceHaveNotch, deviceVersion} = this.state
		const {
			backgroundColor,
			statusBarHiddenForNotch,
			statusBarHiddenForNonNotch,
			...rest
		} = this.props
		const versionCheck = deviceVersion<9
		if (deviceHaveNotch && versionCheck) {
			return (
				<View
					style={{
						height: navbarHeight,
						backgroundColor: backgroundColor,
						width: Dimensions.get('window').width
					}}
				>
					<StatusBar {...rest} translucent hidden={this.props.statusBarHiddenForNotch} />
				</View>
			)
		} else if (!deviceHaveNotch && Platform.OS === 'ios') {
			return (
				<View
					style={{
						backgroundColor: backgroundColor,
						width: Dimensions.get('window').width
					}}
				>
					<StatusBar {...rest} translucent hidden={this.props.statusBarHiddenForNonNotch} />
				</View>
			)
		} else if (!deviceHaveNotch && Platform.OS === 'android') {
			return (
			<StatusBar {...rest} backgroundColor={backgroundColor} hidden={versionCheck ? false :this.props.statusBarHiddenForNonNotch} StatusBarStyle="light-content" />
			)
		} else {
			return null;
		}
	}
}

SafeAreaDecider.propTypes = {
	statusBarHiddenForNotch: PropTypes.bool,
	statusBarHiddenForNonNotch: PropTypes.bool,
	backgroundColor: PropTypes.string
}

SafeAreaDecider.defaultProps = {
	statusBarHiddenForNotch: false,
	statusBarHiddenForNonNotch: false,
	backgroundColor: '#fff'
	
}

export default SafeAreaDecider
