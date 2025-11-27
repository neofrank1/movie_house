'use client';

import AppLayout from "@/components/layout/app-layout";
import { Text } from "@/components/retroui/Text";
import { Button } from "@/components/retroui/Button";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    return (
        <AppLayout>
            <div className="p-4 flex flex-col items-center justify-center gap-4 col-span-full min-h-[60vh]">
                <Text as="h1" className="text-3xl font-bold text-center">Movie not found</Text>
                <Button onClick={() => router.push(`/`)}>Go to Home</Button>
            </div>
        </AppLayout>
    );
}