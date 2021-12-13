import 'styled-components'

interface IPalette {
  bg: string
  fg: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    id: string
    palette: {
      body: string
      text: string
      primary: IPalette
    }
    zIndex: {
      menu: number
    }
  }
}
