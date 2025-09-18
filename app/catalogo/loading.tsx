export default function Loading() {
    return (
        <main className="min-h-screen p-6 animate-pulse">
            <div className="max-w-4xl mx-auto bg-gray-200 h-96 rounded-xl mb-6" />
            <div className="max-w-4xl mx-auto space-y-3">
                <div className="h-6 bg-gray-200 rounded" />
                <div className="h-5 bg-gray-200 rounded w-1/3" />
                <div className="h-24 bg-gray-200 rounded" />
            </div>
        </main>
    );
}
