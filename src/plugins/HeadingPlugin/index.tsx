import ButtonContainer from '@/components/Container/ButtonContainer'
import { Button } from '@/components/ui/button'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text'

import { $setBlocksType } from '@lexical/selection'
import { $getSelection, $isRangeSelection } from 'lexical'
export default function HeadingPlugin() {
    const [editor] = useLexicalComposerContext()
    const onClick = (type: HeadingTagType) => {
        editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode(type))
            }
        })
    }
    return (
        <ButtonContainer title={'Heading'}>
            <Button onClick={() => onClick('h1')}>h1</Button>
            <Button onClick={() => onClick('h2')}>h2</Button>
        </ButtonContainer>
    )
}
