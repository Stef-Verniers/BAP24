import Logo from '/public/images/BAP24.svg'
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
    <div className="min-h-screen flex flex-col justify-center sm:justify-center items-center sm:pt-0 bg-teal-600">
        <div>
            <Link href="/">
                <img src={Logo} className="w-40 h-20" />
            </Link>
        </div>

        <div className="w-4/5 sm:max-w-md px-6 py-4 bg-white bg-white shadow-md overflow-hidden rounded-lg drop-shadow-lg">
            {children}
        </div>
    </div>
    );
}
