import React from "react";
import { AppContent } from "./app/app-content";
import { AppFooter } from "./app/app-footer";
import { AppHeader } from "./app/app-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <AppHeader/>
            <AppContent>
                {/* Content goes here */}
                {children}
            </AppContent>
            <AppFooter/>
        </div>
    );
}
