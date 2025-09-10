import Link from "next/link";

export default function Custom404() {
    return (
        <div className="flex items-center justify-center h-[90%] bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">404</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                    Oops! The page you are looking for does not exist.
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition"
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
}
