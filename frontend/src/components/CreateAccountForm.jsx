import React from "react";
import { FaTimes } from "react-icons/fa";

function CreateAccountForm() {

    return (

        <div className="loginid-container bg-black min-h-screen p-5 pt-20 pb-20 relative overflow-hidden">

            <div
                className="bg-gradient-to-r from-red-600 to-orange-500 rounded-full w-72 h-72 absolute bottom-[-10px] left-[60px]"
                style={{
                    clipPath:
                        "polygon(0 0, 100% 0, 100% 100%, 70% 100%, 30% 100%, 0 100%)",
                }}
            />
            <div
                className="bg-gradient-to-r from-red-600 to-orange-500 rounded-full w-72 h-72 absolute bottom-[-10px] right-[60px]"
                style={{
                    clipPath:
                        "polygon(0 0, 100% 0, 100% 100%, 70% 100%, 30% 100%, 0 100%)",
                }}
            />
            <div
                className="bg-gradient-to-r from-red-600 to-orange-500 rounded-full w-72 h-72 absolute top-[0px] left-1/2 transform -translate-x-1/2"
                style={{ clipPath: "circle(50% at 50% 50%)" }}
            />

            <div className="bg-gradient-to-br from-blue-900 via-blue-900 to-022340 mx-auto relative flex flex-col items-center justify-start h-screen pt-20 sm:w-10/12 lg:w-9/12 xl:w-10/12  shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">

                <FaTimes className="absolute top-8 right-8 cursor-pointer text-orange-500 w-10 h-10" />

                <h1 className="text-white text-3xl font-bold font-poppins text-center mt-15">
                    Création de votre compte
                </h1>
                <form class=" rounded-lg p-4 ">
                    <div>
                        <label for="email" class="block text-xl font-bold text-white">Votre Username</label>
                        <div class="py-2">
                            <input id="Username" name="Username" type="text" required class="w-full rounded-lg text-blue-800" />
                        </div>
                    </div>

                    <div>
                        <label for="Prénom" class="block text-xl font-bold text-white ">Prénom</label>
                        <div class="py-2">
                            <input id="Prénom" name="Prénom" type="text" required class="w-full rounded-lg text-blue-800" />
                        </div>
                    </div>
                    <div>
                        <label for="Nom" class="block text-xl font-bold text-white">Nom</label>
                        <div class="py-2">
                            <input id="Nom" name="Nom" type="text" required class="w-full rounded-lg text-blue-800" />
                        </div>
                    </div>
                    <div>
                        <label for="mail" class="block text-xl font-bold text-white">E-mail</label>
                        <div class="py-2">
                            <input id="e-mail" name="e-mail" type="email" required class="w-full rounded-lg text-blue-800" />
                        </div>
                    </div>
                    <div>
                        <label for="password" class="block text-xl font-bold text-white">Password</label>
                        <div class="py-2">
                            <input id="password" name="password" type="password" required class="w-full rounded-lg text-blue-800" />
                        </div>
                    </div>

                    <div class="flex pt-4 items-center ">
                        <input id="terms-and-privacy" name="terms-and-privacy" type="checkbox" class="" />
                        <label for="terms-and-privacy" class="ml-2 block text-sm text-gray-900"
                        >J'ai lu et j'accepte les
                            <a href="#" class="text-indigo-600 hover:text-indigo-500">Conditions</a>
                            et la
                            <a href="#" class="text-indigo-600 hover:text-indigo-500"> Politique de Confidentialité </a>.
                        </label>
                    </div>

                    <div className="">
                        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Je m'inscris !</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateAccountForm;