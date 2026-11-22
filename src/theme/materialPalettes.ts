export interface MaterialPalette {
  name: string;
  surface: string;
  surfaceLowest: string;
  container: string;
  containerHigh: string;
  primary: string;
  accent: string;
  onPrimary: string;
  ink: string;
  muted: string;
  danger: string;
  dangerContainer: string;
  dangerInk: string;
  success: string;
  successContainer: string;
  successInk: string;
}

export const materialPalettes = {
  hosts: {
    name: 'Pedra Quente',
    surface: '#F8F6F2',
    surfaceLowest: '#FFFFFF',
    container: '#ECE8E0',
    containerHigh: '#E1DCD1',
    primary: '#0B57D0',
    accent: '#4285F4',
    onPrimary: '#FFFFFF',
    ink: '#1B1C1E',
    muted: '#57585B',
    danger: '#B3261E',
    dangerContainer: '#F9DEDC',
    dangerInk: '#410E0B',
    success: '#0F6D38',
    successContainer: '#CBEBD6',
    successInk: '#042110',
  },
  section1: {
    name: 'Azul Safira',
    surface: '#EDF2FF',
    surfaceLowest: '#FAFCFF',
    container: '#D8E2FF',
    containerHigh: '#C5D5FF',
    primary: '#0B57D0',
    accent: '#4285F4',
    onPrimary: '#FFFFFF',
    ink: '#041E49',
    muted: '#3A5280',
    danger: '#C5221F',
    dangerContainer: '#FADBD8',
    dangerInk: '#4D0C0A',
    success: '#0F6D38',
    successContainer: '#CBEBD6',
    successInk: '#042110',
  },
  section2: {
    name: 'Terracota Coral',
    surface: '#FFF0EB',
    surfaceLowest: '#FFFBF9',
    container: '#FFDBD0',
    containerHigh: '#FFC6B4',
    primary: '#C83E1D',
    accent: '#FF6D42',
    onPrimary: '#FFFFFF',
    ink: '#3B0905',
    muted: '#7A3E31',
    danger: '#B3261E',
    dangerContainer: '#F9DEDC',
    dangerInk: '#410E0B',
    success: '#0F6D38',
    successContainer: '#CBEBD6',
    successInk: '#042110',
  },
  section3: {
    name: 'Verde Esmeralda',
    surface: '#E7F5EC',
    surfaceLowest: '#F8FDF9',
    container: '#CBEBD6',
    containerHigh: '#B2DFC2',
    primary: '#0F6D38',
    accent: '#1EA358',
    onPrimary: '#FFFFFF',
    ink: '#042110',
    muted: '#2D5E41',
    danger: '#C5221F',
    dangerContainer: '#FADBD8',
    dangerInk: '#4D0C0A',
    success: '#0F6D38',
    successContainer: '#CBEBD6',
    successInk: '#042110',
  },
  section4: {
    name: 'Violeta Íris',
    surface: '#F2ECFF',
    surfaceLowest: '#FCF9FF',
    container: '#E2D5FF',
    containerHigh: '#D1BCFF',
    primary: '#5E35B1',
    accent: '#8E6CEF',
    onPrimary: '#FFFFFF',
    ink: '#1D0847',
    muted: '#553D82',
    danger: '#C5221F',
    dangerContainer: '#FADBD8',
    dangerInk: '#4D0C0A',
    success: '#0F6D38',
    successContainer: '#CBEBD6',
    successInk: '#042110',
  },
  section5: {
    name: 'Verde-Petróleo',
    surface: '#E3F4F6',
    surfaceLowest: '#F6FCFD',
    container: '#C4E7EC',
    containerHigh: '#A7DBE3',
    primary: '#006874',
    accent: '#0097A7',
    onPrimary: '#FFFFFF',
    ink: '#001F24',
    muted: '#2D5B63',
    danger: '#C5221F',
    dangerContainer: '#FADBD8',
    dangerInk: '#4D0C0A',
    success: '#0F6D38',
    successContainer: '#CBEBD6',
    successInk: '#042110',
  },
} satisfies Record<string, MaterialPalette>;

export type PaletteKey = keyof typeof materialPalettes;