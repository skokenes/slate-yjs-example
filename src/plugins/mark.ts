import { Editor } from "slate";

export const toggleMark = (editor: Editor, format: string): void => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor: Editor, format: string): any => {
  const marks: any = Editor.marks(editor) as any;
  return marks ? (marks as any)[format] === true : false;
};
