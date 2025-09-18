export default function Loading() {
    return (
        <main
            className="min-h-screen p-6"
            aria-busy="true"
            aria-label="Cargando contenido"
            role="status"
        >
            <span className="sr-only">Cargando…</span>

            <div className="mx-auto max-w-4xl space-y-6">
                {/* Imagen principal */}
                <div className="h-80 w-full animate-pulse rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />

                {/* Texto */}
                <div className="space-y-3">
                    <div className="h-7 w-2/3 animate-pulse rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
                    <div className="h-6 w-1/4 animate-pulse rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
                    <div className="h-20 w-full animate-pulse rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
                </div>
            </div>
        </main>
    );
}
