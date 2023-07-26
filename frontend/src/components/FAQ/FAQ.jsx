import React from "react";
import NavBar from "../NavBar/NavBar";
import BlockFAQ from "./BlockFAQ";

function FAQ() {
  const faq = [
    {
      question: "Dois-je m'inscrire pour accéder aux vidéos sportives ?",
      reponse:
        "Non, vous n'avez pas besoin de vous inscrire pour accéder aux vidéos sportives sur notre site. Elles sont disponibles gratuitement pour tous les utilisateurs.",
    },
    {
      question: "Quels sont les avantages de la création d'un compte ?",
      reponse:
        "En créant un compte personnel sur notre site, vous pouvez profiter de fonctionnalités supplémentaires telles que la possibilité de marquer vos vidéos préférées et de les ajouter à votre liste de favoris pour un accès ultérieur. Cela vous permet de garder une trace de vos contenus préférés et de les retrouver facilement.",
    },
    {
      question: "Quels types de vidéos sportives sont disponibles ?",
      reponse:
        " Nous proposons une vaste collection de vidéos sportives couvrant différents sports. Vous pourrez trouver des moments forts, des analyses de matchs, des interviews d'athlètes et bien plus encore. Nous nous efforçons de fournir un large éventail de contenus pour satisfaire tous les passionnés de sport.",
    },
    {
      question: "Le site est-il compatible avec les appareils mobiles ?",
      reponse:
        "Oui, nous avons développé le site en adoptant une approche centrée sur les appareils mobiles. Cela garantit une expérience utilisateur optimale, que vous utilisiez un smartphone, une tablette ou un ordinateur de bureau. Vous pourrez profiter de la plateforme de streaming sportif où que vous soyez.",
    },
  ];

  return (
    <>
      <NavBar />

      <section className="px-4 mx-auto mb-20 max-w-screen-md mt-12">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center  text-white ">
            <h2 className="mb-4 text-4xl font-extrabold text-center ">FAQ</h2>
            <p className="mb-8 lg:mb-16 font-light text-center sm:text-xl">
              Les questions fréquentes :
            </p>
          </div>

          {faq.map((blockFaq) => {
            return (
              <BlockFAQ
                question={blockFaq.question}
                reponse={blockFaq.reponse}
                key={blockFaq.reponse}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}

export default FAQ;
