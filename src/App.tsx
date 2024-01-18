import { Editor } from './components/Editor'
function App() {
    return (
        <div className="bg-black h-[100svh] p-[30px] overflow-hidden">
            <div className="flex justify-center">
                <div className="relative  text-white font-bold text-[50px]">
                    <div className="z-10 relative">Lexical Hub</div>
                    <div className="absolute z-0 bottom-2 left-3 block h-[20px] w-[270px] bg-lexical m-auto" />
                </div>
            </div>
            <Editor />
        </div>
    )
}

export default App
