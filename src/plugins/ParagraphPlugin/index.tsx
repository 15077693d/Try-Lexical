import { Button } from '@/components/ui/button'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $setBlocksType } from '@lexical/selection'
import { $createParagraphNode, $getSelection, $isRangeSelection } from 'lexical'

export default function ParagraphPlugin() {
    const [editor] = useLexicalComposerContext()
    const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createParagraphNode())
            }
        })
    }
    return <Button onClick={onClick}>P</Button>
}
