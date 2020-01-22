import React, { useState } from 'react'

import getTheme from '../theme'

export const ManageThemeContext = React.createContext({
    mode: 'light',
    theme: getTheme('light'),
    toggle: () => { }
})

export const useTheme = () => React.useContext(ManageThemeContext)

export const ThemeProvider = props => {
    const [mode, setMode] = useState('light')

    toggleMode = () => setMode(mode === 'light' ? 'dark' : 'light')

    return (
        <ManageThemeContext.Provider value={{
            mode,
            theme: getTheme(mode),
            toggle: toggleMode
        }}>
            {props.children}
        </ManageThemeContext.Provider>
    )
}