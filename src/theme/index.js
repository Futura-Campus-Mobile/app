/*
    '#8e7af7', '#ee7ae6', '#34bbf3', '#292859'
    '#9510AC', '#dcdcdc', '#4458b8', '#2acbe0'
    '#262626', '#201f2f', '#0f0d13', '#48455a'
    '#5e6bde', '#2478fa', '#1662cf', '#3bdbe1',
    '#3986fa', '#5386d7', '#274691', '#fea43b', '#f6ce59'
    '#29283a', '#333244', '#b0529c', '#dc6779', '#8051a3', '#6958b6',
    '#140e27', '#8557af', #d5739c',
    '#0b193d', '#4273ef', '#43c0fa'
*/

const ThemeColors = {
    primaryText: {
        light: 'black',
        dark: 'white',
    },
    primaryBackground: {
        light: 'white',
        dark: '#292859',
    },
    containerBackground: {
        light: '#eaeaea',
        dark: '#292859'
    }
}

export default getTheme = mode => Object.entries(ThemeColors)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value[mode] }), {})