import 'styled-components'

interface IPalette {
  bg: string
  fg: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      body: string
      text: string
      primary: IPalette
    }
  }
}
