import ButtonContainer from '@/components/Container/ButtonContainer'
import { Button } from '@/components/ui/button'
import {
    INSERT_CHECK_LIST_COMMAND,
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    ListType,
} from '@lexical/list'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { ListPlugin as LexicalListPlugin } from '@lexical/react/LexicalListPlugin'

export default function ListPlugin() {
    const [editor] = useLexicalComposerContext()
    const onClick = (type: ListType) => {
        const command = {
            number: INSERT_ORDERED_LIST_COMMAND,
            bullet: INSERT_UNORDERED_LIST_COMMAND,
            check: INSERT_CHECK_LIST_COMMAND,
        }
        const a = editor.dispatchCommand(command[type], undefined)
        console.log(a)
    }
    return (
        <ButtonContainer title="List">
            <LexicalListPlugin />
            <CheckListPlugin />
            <Button onClick={() => onClick('number')}>Number</Button>
            <Button onClick={() => onClick('bullet')}>Bullet</Button>
            <Button onClick={() => onClick('check')}>Check</Button>
        </ButtonContainer>
    )
}
