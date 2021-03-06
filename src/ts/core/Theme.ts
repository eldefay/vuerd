export interface Theme {
  canvas: string;
  table: string;
  tableActive: string;
  focus: string;
  keyPK: string;
  keyFK: string;
  keyPFK: string;
  font: string;
  fontActive: string;
  fontPlaceholder: string;
  contextmenu: string;
  contextmenuActive: string;
  edit: string;
  columnSelect: string;
  columnActive: string;
  minimapShadow: string;
  scrollBarThumb: string;
  scrollBarThumbActive: string;
  menubar: string;
  visualization: string;
}
export type ThemeKey = keyof Theme;

export function createTheme(): Theme {
  return {
    canvas: "#282828",
    table: "#191919",
    tableActive: "#14496d",
    focus: "#00a9ff",
    keyPK: "#B4B400",
    keyFK: "#dda8b1",
    keyPFK: "#60b9c4",
    font: "#a2a2a2",
    fontActive: "white",
    fontPlaceholder: "#6D6D6D",
    contextmenu: "#191919",
    contextmenuActive: "#383d41",
    edit: "#ffc107",
    columnSelect: "#232a2f",
    columnActive: "#372908",
    minimapShadow: "black",
    scrollBarThumb: "#6D6D6D",
    scrollBarThumbActive: "#a2a2a2",
    menubar: "black",
    visualization: "#191919",
  };
}
