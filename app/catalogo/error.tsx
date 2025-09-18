"use client";

import { AlertCircle, RotateCcw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset?: () => void;
}) {
    return (
        <main className="flex min-h-screen items-center justify-center p-6">
            <div
                role="alert"
                className="max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-sm"
            >
                <AlertCircle className="mx-auto mb-3 text-red-600" size={40} aria-hidden />
                <h1 className="mb-2 text-xl font-bold text-red-700">
                    Ha ocurrido un error
                </h1>
                <p className="mb-6 text-gray-600">
                    {error?.message || "Lo sentimos, algo salió mal."}
                </p>

                <div className="flex justify-center gap-3">
                    {reset && (
                        <button
                            onClick={() => reset()}
                            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white shadow-sm transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                        >
                            <RotateCcw size={16} aria-hidden />
                            Reintentar
                        </button>
                    )}
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-700 shadow-sm transition hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                    >
                        Volver al inicio
                    </a>
                </div>
            </div>
        </main>
    );
}
