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
} from 'lexical'
import { useEffect } from 'react'
import styled from 'styled-components'
import './styles.css'

const theme = {
    ltr: 'ltr',
    rtl: 'rtl',
    paragraph: 'editor-paragraph',
    quote: 'editor-quote',
    heading: {
        h1: 'editor-heading-h1',
        h2: 'editor-heading-h2',
        h3: 'editor-heading-h3',
        h4: 'editor-heading-h4',
        h5: 'editor-heading-h5',
        h6: 'editor-heading-h6',
    },
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

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
// function MyCustomAutoFocusPlugin() {
//     const [editor] = useLexicalComposerContext()

//     useEffect(() => {
//         // Focus the editor when the effect fires!
//         editor.focus()
//     }, [editor])

//     return null
// }

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

const StyledContentEditable = styled(ContentEditable)`
    padding: 0 8px;
    width: 100%;
    z-index: 10;
    border: unset;
    outline: unset;
    position: relative;
`

const NameWrapper = styled('div')`
    position: relative;
    #name-placeholder {
        color: rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 0;
        padding: 0 9px;
    }
`
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
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        nodes: [HeadingNode, ListNode, ListItemNode],
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <ListPlugin />
            <NameWrapper>
                <RichTextPlugin
                    contentEditable={<StyledContentEditable />}
                    placeholder={
                        <div id="name-placeholder">Give me a name</div>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
            </NameWrapper>
            <AddHeadingPlugin />
            <SwitchHeadingPlugin />
            <MyOnChangePlugin
                onChange={(editorState) => {
                    console.log(editorState)
                }}
            />

            <SwitchListPlugin />
            <HistoryPlugin />
        </LexicalComposer>
    )
}
