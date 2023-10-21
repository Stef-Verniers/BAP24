import Logo from "./Logo";

export default function Footer(props) {
    return(
        <footer {...props}>
            <div className="w-full m-auto lg:w-2/3">
                <Logo className="w-1/2 sm:w-1/4"/>
                <div className="my-8">
                    <ul  className="text-gray-100">
                        <li>Registreren</li>
                        <li>Inloggen</li>
                        <li>Meer informatie</li>
                    </ul>
                </div>
                <span className=" text-gray-300">&copy; BAP24 | Arteveldehogeschool 2023/2024</span>
            </div>
        </footer>
    )
}