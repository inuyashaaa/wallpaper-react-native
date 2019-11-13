import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Text, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')
const realWidth = height > width ? width : height


const scaleText = ({
  deviceBaseWidth,
  fontSize = 14,
  lineHeight = fontSize * 1.2,
}) => ({
  fontSize: Math.round((fontSize * realWidth) / deviceBaseWidth),
  lineHeight: Math.round((lineHeight * realWidth) / deviceBaseWidth),
})

const ScalableText = (props) => {
  const { style, children, deviceBaseWidth } = props
  const { fontSize, lineHeight } = StyleSheet.flatten(style)
  return (
    <Text
      allowFontScaling={false}
      {...props}
      style={[
        {
          fontFamily: 'Montserrat-Regular',
          paddingTop: 0,
          paddingBottom: 0,
          color: '#fff',
        },
        style,
        scaleText({
          deviceBaseWidth,
          fontSize,
          lineHeight,
        }),
      ]}
    >
      {children}
    </Text>
  )
}

ScalableText.propTypes = {
  deviceBaseWidth: PropTypes.number,
  style: Text.propTypes.style,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
}

ScalableText.defaultProps = {
  deviceBaseWidth: 375,
  style: {},
}

export default ScalableText
