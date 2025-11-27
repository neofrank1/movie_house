import { Text } from "@/components/retroui/Text";

export function AppFooter() {
    return (
        <footer className="grid grid-cols-[1fr_auto_1fr] items-center h-16 border-t bg-secondary text-white px-4">
            <div className="flex justify-center items-center">
                <Text as="p" className="text-secondary-foreground">Copyright © 2025 Neo Frank Uy</Text>
            </div>
            <div></div>
            <div className="flex justify-center items-center gap-3">
                <Text as="p" className="text-secondary-foreground">Privacy Policy</Text>
                <Text as="p" className="text-secondary-foreground">Terms of Service</Text>
            </div>
        </footer>
    );
}