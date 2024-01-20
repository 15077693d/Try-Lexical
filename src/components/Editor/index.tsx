import HeadingPlugin from '@/plugins/HeadingPlugin'
import ListPlugin from '@/plugins/ListPlugin'
import ParagraphPlugin from '@/plugins/ParagraphPlugin'
import TreeViewPlugin from '@/plugins/TreeViewPlugin'
import { ListItemNode, ListNode } from '@lexical/list'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'

import { HeadingNode } from '@lexical/rich-text'
import { EditorState } from 'lexical'
import { ComponentProps, useEffect } from 'react'
import theme from './theme'

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

export function Editor() {
    const initialConfig: ComponentProps<
        typeof LexicalComposer
    >['initialConfig'] = {
        theme,
        namespace: 'MyEditor',
        onError,
        nodes: [HeadingNode, ListNode, ListItemNode],
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="bg-lexical my-3 p-3 rounded-t-lg">
                <div>
                    <span className="inline space-x-4 flex">
                        <span className="bg-white p-2 rounded-lg  text-center flex items-center">
                            Default <br />
                            Plugin
                        </span>
                        <ParagraphPlugin />
                        <HeadingPlugin />
                        <ListPlugin />
                    </span>
                </div>
                <MyOnChangePlugin
                    onChange={() => {
                        return
                    }}
                />
                <HistoryPlugin />
            </div>
            <div className="bg-slate-100 rounded-b-lg">
                <div className="relative w-full prose prose-2xl m-auto">
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable className="p-3 z-10 outline-none text-black min-h-[600px]" />
                        }
                        placeholder={
                            <div className="absolute text-black top-0 p-3 left-1  select-none pointer-events-none">
                                Enter some rich text
                            </div>
                        }
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                </div>
            </div>

            <TreeViewPlugin />
        </LexicalComposer>
    )
}
