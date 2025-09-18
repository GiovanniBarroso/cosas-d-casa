"use client";

export default function Error({ error }: { error: Error }) {
    return (
        <main className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center">
                <h2 className="text-lg font-semibold mb-2">Ha ocurrido un error</h2>
                <p className="text-gray-500">{error.message}</p>
            </div>
        </main>
    );
}
