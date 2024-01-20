import { ReactNode } from 'react'

export default function ButtonContainer({
    title,
    children,
}: {
    title: string
    children?: ReactNode
}) {
    return (
        <div className="rounded-lg border-2 border-black p-2">
            <p className="text-center mb-2">{title}</p>
            <div className="flex justify-center space-x-2">{children}</div>
        </div>
    )
}
