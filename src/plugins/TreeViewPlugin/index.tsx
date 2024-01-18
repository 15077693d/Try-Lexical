import { DragIcon } from '@/components/Icon'
import { cn } from '@/lib/utils'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { TreeView } from '@lexical/react/LexicalTreeView'
import Draggable from 'react-draggable'

export default function TreeViewPlugin(): JSX.Element {
    const [editor] = useLexicalComposerContext()
    const btnClassName =
        'absolute top-[32px] left-[90px] bg-white py-1 px-3 rounded-lg text-black'
    const timeTravelRelatedclassName = 'absolute  left-[220px]'
    return (
        <Draggable>
            <div className="p-5 bg-black border-dashed border-green-300 border-4 rounded-lg max-w-[900px]">
                <DragIcon className=" absolute top-[28px] left-[35px] w-[40px] fill-green-300 text-white" />
                <TreeView
                    viewClassName="bg-black text-green-300 p-3 pt-[60px] overflow-y-auto overflow-x-auto"
                    treeTypeButtonClassName={cn(btnClassName, 'mb-4')}
                    timeTravelButtonClassName={cn(
                        btnClassName,
                        timeTravelRelatedclassName
                    )}
                    timeTravelPanelClassName={cn(
                        btnClassName,
                        timeTravelRelatedclassName
                    )}
                    timeTravelPanelSliderClassName="mx-5 translate-y-1"
                    editor={editor}
                    timeTravelPanelButtonClassName={''}
                />
            </div>
        </Draggable>
    )
}
