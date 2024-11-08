import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <h1 className="text-3xl font-bold tracking-tight">
                        The best task manager awaits you.
                    </h1>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-transparent px-6 py-4  sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
