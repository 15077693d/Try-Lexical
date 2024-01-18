import TreeViewPlugin from '@/plugins/TreeViewPlugin'
import {
    INSERT_ORDERED_LIST_COMMAND,
    ListItemNode,
    ListNode,
} from '@lexical/list'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'

import { $createHeadingNode, HeadingNode } from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import {
    $createTextNode,
    $getRoot,
    $getSelection,
    $isRangeSelection,
    EditorState,
    EditorThemeClasses,
} from 'lexical'
import { ComponentProps, useEffect } from 'react'

const theme: EditorThemeClasses = {
    h1: 'text-black',
    paragraph: 'text-black',
    quote: 'editor-quote',
    list: {
        nested: {
            listitem: 'editor-nested-listitem',
        },
        ol: 'editor-list-ol',
        ul: 'editor-list-ul',
        listitem: 'editor-listItem',
        listitemChecked: 'editor-listItemChecked',
        listitemUnchecked: 'editor-listItemUnchecked',
    },
    hashtag: 'editor-hashtag',
    image: 'editor-image',
    link: 'editor-link',
    text: {
        bold: 'editor-textBold',
        code: 'editor-textCode',
        italic: 'editor-textItalic',
        strikethrough: 'editor-textStrikethrough',
        subscript: 'editor-textSubscript',
        superscript: 'editor-textSuperscript',
        underline: 'editor-textUnderline',
        underlineStrikethrough: 'editor-textUnderlineStrikethrough',
    },
    code: 'editor-code',
    codeHighlight: {
        atrule: 'editor-tokenAttr',
        attr: 'editor-tokenAttr',
        boolean: 'editor-tokenProperty',
        builtin: 'editor-tokenSelector',
        cdata: 'editor-tokenComment',
        char: 'editor-tokenSelector',
        class: 'editor-tokenFunction',
        'class-name': 'editor-tokenFunction',
        comment: 'editor-tokenComment',
        constant: 'editor-tokenProperty',
        deleted: 'editor-tokenProperty',
        doctype: 'editor-tokenComment',
        entity: 'editor-tokenOperator',
        function: 'editor-tokenFunction',
        important: 'editor-tokenVariable',
        inserted: 'editor-tokenSelector',
        keyword: 'editor-tokenAttr',
        namespace: 'editor-tokenVariable',
        number: 'editor-tokenProperty',
        operator: 'editor-tokenOperator',
        prolog: 'editor-tokenComment',
        property: 'editor-tokenProperty',
        punctuation: 'editor-tokenPunctuation',
        regex: 'editor-tokenVariable',
        selector: 'editor-tokenSelector',
        string: 'editor-tokenSelector',
        symbol: 'editor-tokenProperty',
        tag: 'editor-tokenProperty',
        url: 'editor-tokenOperator',
        variable: 'editor-tokenVariable',
    },
}

function MyOnChangePlugin(props: {
    onChange: (editorState: EditorState) => void
}): null {
    const [editor] = useLexicalComposerContext()

    const { onChange } = props
    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            onChange(editorState)
        })
    }, [editor, onChange])
    return null
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: unknown) {
    console.error(error)
}

function SwitchListPlugin(): JSX.Element {
    const [editor] = useLexicalComposerContext()
    const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        console.log('123')
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        return
    }
    return <button onClick={onClick}>Change to OL</button>
}

function SwitchHeadingPlugin(): JSX.Element {
    const [editor] = useLexicalComposerContext()
    const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode('h1'))
            }
        })
    }
    return <button onClick={onClick}>Change to Heading</button>
}

function AddHeadingPlugin(): JSX.Element {
    const [editor] = useLexicalComposerContext()
    const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        editor.update(() => {
            const root = $getRoot()
            root.append(
                $createHeadingNode('h1').append($createTextNode('Hello World'))
            )
        })
    }
    return <button onClick={onClick}>Add Heading</button>
}
export function Editor() {
    const initialConfig: ComponentProps<
        typeof LexicalComposer
    >['initialConfig'] = {
        namespace: 'MyEditor',
        theme,
        onError,
        nodes: [HeadingNode, ListNode, ListItemNode],
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="bg-lexical my-3 p-3 rounded-t-lg">
                <ListPlugin />
                <AddHeadingPlugin />
                <SwitchHeadingPlugin />
                <MyOnChangePlugin
                    onChange={(editorState) => {
                        console.log(editorState)
                    }}
                />
                <SwitchListPlugin />
                <HistoryPlugin />
            </div>
            <div className="relative">
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="bg-white p-3 outline-none text-black min-h-[600px] rounded-b-lg bg-slate-100" />
                    }
                    placeholder={
                        <div className="absolute text-black top-0 p-3">
                            Give me a name
                        </div>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
            </div>
            <TreeViewPlugin />
        </LexicalComposer>
    )
}
