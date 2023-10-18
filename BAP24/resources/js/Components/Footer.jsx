import Logo from "./Logo";

export default function Footer(props) {
    return(
        <footer {...props}>
            <div className="w-11/12 m-auto">
                <Logo className="w-1/2"/>
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