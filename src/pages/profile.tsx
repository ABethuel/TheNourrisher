import React, { useState, useRef, ChangeEvent, MouseEvent } from 'react';

const ProfilePage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [diet, setDiet] = useState<string>(''); // L'état pour le régime alimentaire
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      }
      reader.readAsDataURL(file);
    }
  }

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  }

  const handleDietChange = (e: ChangeEvent<HTMLSelectElement>) => { 
    setDiet(e.target.value);
  }

  return (
    <div className="h-screen bg-[#CACACA] sm:bg-[#535961]">
        <div className="grid place-items-center mb-10">
            <h1 className="text-center text-xl font-bold text-black pt-5">
            Ma page de profil
            </h1>
        </div>

        <div className="h-screen bg-[#535961] rounded-3xl">

            <div className="grid place-items-center">

                <div className="grid place-items-center">
                    <img 
                    src={image || "https://via.placeholder.com/150"} 
                    alt="profile" 
                    style={{height: '150px', width: '150px',borderRadius: '50%', marginTop: '40px', marginBottom: '10px'}}/> 

                    <input 
                    type="file" 
                    style={{display: 'none'}} 
                    ref={fileInputRef} 
                    accept="image/*" 
                    onChange={handleImageUpload}/>

                    <button onClick={handleButtonClick}>
                      <text style={{color:'white'}}>
                      Changer l'image de profil
                      </text>
                    </button>
                   
                    <text style={{marginTop: '40px', color:'white'}}>
                      Paul Renard
                    </text>

                    <text style={{color:'white'}}>
                      {diet && <p>Régime alimentaire : {diet}</p>}
                    </text>

                    <select onChange={handleDietChange} style={{marginTop: '30px'}}>
                    <option value="">Sélectionnez un régime</option>
                    <option value="Végétarien">Végétarien</option>
                    <option value="Flexitarien">Flexitarien</option>
                    <option value="Carnivore">Carnivore</option>
                    <option value="Omnivore">Omnivore</option>
                    <option value="Fructivore">Fructivore</option>
                    <option value="Halal">Halal</option>
                    <option value="Casher">Casher</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
  );
}






export default ProfilePage;

