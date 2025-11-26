import React from 'react';

export function AppContent({ children }: { children: React.ReactNode }) {
    return (
        <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4">
            {children}
        </main>
    );
}