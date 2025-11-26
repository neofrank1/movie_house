import { Input } from "@/components/retroui/Input";
import { Button } from "@/components/retroui/Button";
import Link from "next/link";

export function AppHeader() {
    return (
        <header>
            <nav className="px-4 py-2 border-b-3 bg-white text-black">
                <div className="flex flex-wrap justify-evenly items-center mx-auto max-w-screen-lg">
                    <Link href="/" className="text-2xl font-bold">Movies House</Link>
                    <div className="flex justify-between items-center gap-2">
                        <Input placeholder="Search for a movie" className="size-14 mx-1 my-1" />
                        <Button className="" type="submit">Search</Button>
                    </div>
                </div>
            </nav>
        </header>
    );
}