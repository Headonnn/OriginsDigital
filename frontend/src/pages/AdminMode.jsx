import React from "react";
import { FaTimes } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import BlueDiv from "../components/BlueDiv";
import ButtonOrange from "../components/ButtonOrange";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function AdminMode() {
  const handleButtonClick = () => {
    // Logique du bouton ici
  };
  const videoCar=[]
  const [sections,setSections] = useState([
    { id: 0, type: "Hero" },
    { id: 1, type: "CarouselDate" },
    { id: 2, type: "CarouselAll" },
  ]);
  

  const handleSubmit=(e)=>{
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
   
    const haha = Object.keys(formJson);
    console.log(haha)
    haha.forEach((e)=> videoCar.push({id_car:sections.length,id_vid:parseInt(e)}))
    console.log(videoCar)
  }

  return (<>
    <div>
        <select id="add">
          <option value="Hero">Hero</option>
          <option  value="Carousel">CarouselFiltre</option>
          <option  value="Carousel">Carousel All</option>
          
          
          </select>
        <button onClick={()=>{setSections([...sections,{id:sections.length,type : add.value}]);console.warn(sections)}}> +</button>
      </div>
      <form method="post" onSubmit={handleSubmit}>
      {dataVideo.length > 0 && dataVideo.map((e)=>{return(
<div>
<label> {e.title}</label>
<input type="checkbox" name={e.id} id={e.id}  />

</div>)
      })}
<button className="bg-green-400"type="submit">ajouter une video</button>
</form>
    <div className="loginid-container bg-black min-h-screen relative overflow-hidden">
      <NavBar />
      <div className="flex flex-col items-center justify-center pt-20 pb-10">
        <div className="flex items-center space-x-6">
          <FaTimes className="text-orange-500 w-6 h-6 md:w-8 md:h-8" />
          <h1 className="text-white text-3xl md:text-5xl font-bold font-poppins">
            Mode Admin
          </h1>
          <BsCheckCircle className="text-green-500 w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>
      <div className="flex justify-center">
        <BlueDiv className="w-full">
          <div className="flex flex-col items-center space-y-36 md:space-y-16 mx-5">
            <div className="w-full max-w-md md:w-auto md:max-w-none md:h-[6rem] md:px-6 md:py-6 flex items-center relative">
              <ButtonOrange
                onClick={handleButtonClick}
                className="w-full flex-grow"
              >
                Administration des vidéos
              </ButtonOrange>
            </div>
            <div className="w-full max-w-md md:w-auto md:max-w-none md:h-[6rem] md:px-6 md:py-6 flex items-center relative">
              <ButtonOrange
                onClick={handleButtonClick}
                className="w-full flex-grow"
              >
                Administration des catégories
              </ButtonOrange>
            </div>
            <div className="w-full max-w-md md:w-auto md:max-w-none md:h-[6rem] md:px-6 md:py-6 flex items-center relative">
              <ButtonOrange
                onClick={handleButtonClick}
                className="w-full flex-grow"
              >
                Administration des sections
              </ButtonOrange>
            </div>
          </div>
        </BlueDiv>
      </div>
      <Footer />
    </div>
    </>
  );
}

export default AdminMode;
