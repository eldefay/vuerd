/**
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
 * https://developer.mozilla.org/ko/docs/Web/API/KeyboardEvent/key/Key_Values
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
 */

export const moveKeys: MoveKey[] = [
  "ArrowUp",
  "ArrowRight",
  "ArrowDown",
  "ArrowLeft",
];
export type MoveKey =
  | "ArrowUp"
  | "ArrowRight"
  | "ArrowDown"
  | "ArrowLeft"
  | "Tab";

export type RelationshipKeymapName =
  | "relationshipZeroOne"
  | "relationshipZeroN"
  | "relationshipOne"
  | "relationshipN"
  | "relationshipZeroOneN"
  | "relationshipOneN"
  | "relationshipOneOnly";

export interface KeymapOption {
  metaKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  key?: string;
}

export interface Keymap {
  edit: KeymapOption[];
  stop: KeymapOption[];
  find: KeymapOption[];
  undo: KeymapOption[];
  redo: KeymapOption[];
  addTable: KeymapOption[];
  addColumn: KeymapOption[];
  addMemo: KeymapOption[];
  removeTable: KeymapOption[];
  removeColumn: KeymapOption[];
  primaryKey: KeymapOption[];
  selectAllTable: KeymapOption[];
  selectAllColumn: KeymapOption[];
  copyColumn: KeymapOption[];
  pasteColumn: KeymapOption[];
  relationshipZeroOneN: KeymapOption[];
  relationshipZeroOne: KeymapOption[];
  relationshipZeroN: KeymapOption[];
  relationshipOneOnly: KeymapOption[];
  relationshipOneN: KeymapOption[];
  relationshipOne: KeymapOption[];
  relationshipN: KeymapOption[];
  tableProperties: KeymapOption[];
}

export type KeymapKey = keyof Keymap;

export function createKeymap(): Keymap {
  return {
    edit: [
      {
        metaKey: false,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        key: "Enter",
      },
    ],
    stop: [
      {
        metaKey: false,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        key: "Escape",
      },
    ],
    find: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: true,
        shiftKey: false,
        key: "KeyF",
      },
    ],
    undo: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: false,
        shiftKey: false,
        key: "KeyZ",
      },
    ],
    redo: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: false,
        shiftKey: true,
        key: "KeyZ",
      },
    ],
    addTable: [
      {
        metaKey: false,
        ctrlKey: false,
        altKey: true,
        shiftKey: false,
        key: "KeyN",
      },
    ],
    addColumn: [
      {
        metaKey: false,
        ctrlKey: false,
        altKey: true,
        shiftKey: false,
        key: "Enter",
      },
    ],
    addMemo: [
      {
        metaKey: false,
        ctrlKey: false,
        altKey: true,
        shiftKey: false,
        key: "KeyM",
      },
    ],
    removeTable: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: false,
        shiftKey: false,
        key: "Delete",
      },
    ],
    removeColumn: [
      {
        metaKey: false,
        ctrlKey: false,
        altKey: true,
        shiftKey: false,
        key: "Delete",
      },
    ],
    primaryKey: [
      {
        metaKey: false,
        ctrlKey: false,
        altKey: true,
        shiftKey: false,
        key: "KeyK",
      },
    ],
    selectAllTable: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: true,
        shiftKey: false,
        key: "KeyA",
      },
    ],
    selectAllColumn: [
      {
        metaKey: false,
        ctrlKey: false,
        altKey: true,
        shiftKey: false,
        key: "KeyA",
      },
    ],
    copyColumn: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: false,
        shiftKey: false,
        key: "KeyC",
      },
    ],
    pasteColumn: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: false,
        shiftKey: false,
        key: "KeyV",
      },
    ],
    relationshipZeroOneN: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: true,
        shiftKey: false,
        key: "Digit1",
      },
    ],
    relationshipZeroOne: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: true,
        shiftKey: false,
        key: "Digit2",
      },
    ],
    relationshipZeroN: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: true,
        shiftKey: false,
        key: "Digit3",
      },
    ],
    relationshipOneOnly: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: true,
        shiftKey: false,
        key: "Digit4",
      },
    ],
    relationshipOneN: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: true,
        shiftKey: false,
        key: "Digit5",
      },
    ],
    relationshipOne: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: true,
        shiftKey: false,
        key: "Digit6",
      },
    ],
    relationshipN: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: true,
        shiftKey: false,
        key: "Digit7",
      },
    ],
    tableProperties: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: false,
        shiftKey: false,
        key: "Space",
      },
    ],
  };
}

type MultipleKey = "altKey" | "metaKey" | "ctrlKey" | "shiftKey";
const multipleKeys: MultipleKey[] = [
  "altKey",
  "metaKey",
  "ctrlKey",
  "shiftKey",
];
export function keymapMatch(
  event: KeyboardEvent,
  keymapOptions: KeymapOption[]
): boolean {
  let result = false;
  for (const keymapOption of keymapOptions) {
    const isMultipleKey = !multipleKeys.some(
      (multipleKey) => !(keymapOption[multipleKey] === event[multipleKey])
    );
    if (keymapOption.key) {
      result =
        isMultipleKey &&
        (event.key.toUpperCase() === keymapOption.key.toUpperCase() ||
          event.code.toUpperCase() === keymapOption.key.toUpperCase());
    } else {
      result = isMultipleKey;
    }
    if (result) {
      break;
    }
  }
  return result;
}

export function keymapOptionToString(keymapOption?: KeymapOption): string {
  if (!keymapOption) return "";
  const result: string[] = [];
  if (keymapOption.metaKey) {
    result.push("Meta");
  }
  if (keymapOption.ctrlKey) {
    result.push("Ctrl");
  }
  if (keymapOption.altKey) {
    result.push("Alt");
  }
  if (keymapOption.shiftKey) {
    result.push("Shift");
  }
  if (keymapOption.key) {
    result.push(keymapOption.key);
  }
  return result.join(" + ");
}

export function keymapOptionToStringJoin(
  keymapOptions: KeymapOption[]
): string {
  return keymapOptions.map((option) => keymapOptionToString(option)).join(",");
}
