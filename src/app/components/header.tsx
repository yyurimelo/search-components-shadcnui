import { ModeToggle } from "./modetoggle";

export function Header() {
    return (
        <header className="flex justify-between items-center sticky top-0 p-4">
            <div>
                <h1>Production test components shadcn/ui | search states</h1>

            </div>
            <div>
                <ModeToggle />
            </div>
        </header>
    )
}