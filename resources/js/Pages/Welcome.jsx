import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="The best task manager ever." />
            <div className="bg-gray-50 text-black/50 ">
                <div className="relative flex min-h-screen flex-col items-center justify-center ">
                    <div className="">
                        <header className="">
                            <h1 className="text-6xl font-bold tracking-tighter text-black  max-w-xl text-center">
                                Welcome to the best task manager ever.
                            </h1>
                        </header>
                        <main className="flex justify-center items-center">
                            <nav className="flex flex-row gap-3 mt-5">
                                <>
                                    <Link
                                        href={route("login")}
                                        className="rounded-md  text-center w-36 px-3 py-2 text-white bg-black ring-1 ring-transparent transition  focus:outline-none focus-visible:ring-[#FF2D20]  dark:focus-visible:ring-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="rounded-md w-36 text-center px-3 py-2 text-white bg-black ring-1 ring-transparent transition focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                    >
                                        Register
                                    </Link>
                                </>
                            </nav>
                        </main>
                        <footer className="py-16 text-center text-sm ">
                            The best task manager ever, seriously.
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
