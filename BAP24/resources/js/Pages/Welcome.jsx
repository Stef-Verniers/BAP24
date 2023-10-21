import { Link, Head } from '@inertiajs/react';
import Logo from '@/Components/Logo';
import Footer from '@/Components/Footer';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Home" />
            <div className="relative sm:flex sm:flex-col sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center selection:bg-red-500 selection:text-white w-full">
                <div className="w-11/12 h-12 sm:h-20 top-0 flex flex-row items-center justify-between m-auto text-right lg:w-2/3">
                    <Logo className="w-1/5 lg:w-28" />
                    <div className="w-3/5">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold hover:text-primary-red duration-300 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold hover:text-primary-red duration-300 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Inloggen
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 font-semibold hover:text-primary-red duration-300 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Registreren
                            </Link>
                        </>
                    )}
                    </div>
                </div>

                <main className="w-full">
                    <div className='h-[calc(100vh-48px)] sm:h-[calc(100vh-80px)] bg-hero-small w-full bg-bottom bg-cover lg:bg-hero-large lg:w-2/3 lg:m-auto lg:bg-contain bg-no-repeat'>
                        <section id="hero" className="w-11/12 lg:w-2/3 m-auto flex flex-col justify-end pt-20">
                            <h1 className="text-teal-600 text-3xl lg:w-4/5 lg:leading-[calc(36px*1.5)] lg:text-5xl font-bold xl:w-4/5">Een platform met een échte bijdrage</h1>
                            <p className='text-teal-600 text-lg lg:text-2xl xl:text-lg lg:w-2/3 xl:w-5/5 leading-6 font-base mt-2'>
                            Welkom op BAP24, een platform gericht naar studenten die hulp nodig hebben bij het zoeken naar deelnemers van jouw thesis.
                            </p>
                        </section>
                    </div>
                    <div className='h-auto bg-white py-8 lg:w-2/3 m-auto lg:mt-12'>
                        <section id="hero" className="h-full w-11/12 sm:w-full m-auto flex flex-col justify-center mb-6">
                            <h2 className="text-black text-xl font-bold text-left">Een springplank voor een succesvolle thesis</h2>
                            <p className='text-black text-base text-left mt-2 lg:w-2/3'>
                            Gedaan met hopeloos zitten wachten op mensen die je enquête willen invullen. Publiceer je enquête en onze gebruikers doen de rest.                            
                            </p>
                            <Logo className="my-12 w-2/3 lg:w-1/3 m-auto"/>
                        </section>
                        <section id="hero" className="h-full w-11/12 sm:w-full m-auto flex flex-col justify-center lg:mt-12">
                            <h2 className="text-black text-xl font-bold text-left">Eenvoudiger kan niet</h2>
                            <p className='text-black text-base text-left mt-2 lg:w-2/3'>
                            Geregistreerde gebruikers kunnen alle enquêtes invullen die bij hun profiel past. Hoe meer enquêtes ingevuld worden, hoe meer credits er te rapen vallen. Met die credits kan je terecht bij erkende sponsors.                           
                            </p>
                            <div className="flex flex-col lg:flex-row h-auto justify-evenly relative my-8 lg:w-full">
                                <div className="w-2/3 h-20 bg-gray-200 rounded-lg shadow-lg lg:w-40 lg:h-40 lg:relative">
                                    <h3 className='m-4 text-2xl font-bold lg:absolute lg:bottom-2 lg:left-3 lg:text-xl lg:m-0'>Registreren</h3>
                                </div>
                                <div className="w-2/3 h-20 bg-teal-600 m-auto -translate-y-6 rounded-lg shadow-lg lg:w-40 lg:h-40 lg:relative lg:-translate-y-0 lg:m-0">
                                    <h3 className='m-4 text-2xl font-bold lg:absolute lg:bottom-2 lg:left-3 lg:text-xl lg:m-0'>Invullen</h3>
                                </div>
                                <div className="w-2/3 h-20 bg-primary-red ml-auto -translate-y-12 rounded-lg shadow-lg lg:w-40 lg:h-40 lg:relative lg:-translate-y-0 lg:m-0">
                                    <h3 className='m-4 text-2xl font-bold lg:absolute lg:bottom-2 lg:left-3 lg:text-xl lg:m-0'>Inwisselen</h3>
                                </div>
                            </div>
                        </section>
                        <section id="hero" className="h-full w-11/12 sm:w-full m-auto flex flex-col justify-center lg:mt-12">
                            <h2 className="text-black text-xl font-bold text-left">Dé oplossing tegen een lage prijs</h2>
                            <p className='text-black text-base text-left mt-2 lg:w-2/3'>
                            Het publiceren van een enquête bedraagt slechts 10 euro. Met deze prijs worden onze kosten en uiteraard de sponsors vergoed die hun diensten aanbieden ten goede van ons product.                         
                            </p>
                        </section>
                        <section id="cta" className="h-full w-11/12 sm:w-full m-auto flex flex-col justify-center mt-20 mb-6 lg:h-24 lg:bg-white lg:mb-0 lg:translate-y-28 lg:drop-shadow-2xl lg:px-6 lg:py-20 lg:rounded-md lg:mt-0">
                            <h2 className="text-black text-xl font-bold text-left">Klaar voor de start?</h2>
                            <Link
                            href={route('register')}
                            >
                                <h2 className="mt-2 text-primary-red text-3xl font-bold text-left hover:text-teal-700 duration-300">Registreer je hier of meld je aan &#x21C0;</h2>
                            </Link>
                        </section>
                    </div>
                </main>
                <Footer className='bg-teal-900 py-10 sm:w-full lg:pt-40' />
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
