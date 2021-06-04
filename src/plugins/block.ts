import { Editor, Transforms } from "slate";

const LIST_TYPES: string[] = ["numbered-list", "bulleted-list"];

export const toggleBlock = (editor: Editor, format: string): void => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n: any) => LIST_TYPES.includes(n.type as any),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  } as any);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const isBlockActive = (editor: Editor, format: string): boolean => {
  const [match] = Editor.nodes(editor, {
    match: (n: any) => n.type === format,
  });

  return !!match;
};
