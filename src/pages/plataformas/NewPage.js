import { useContext, useEffect, useState } from "react";
import Error from "../../components/Error";
import axios from "axios";
import { AppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponent";
import NavbarComponent from "../../components/NavBarComponent";

const PlataformaNewPage = () => {
    const {setSuccess} = useContext(AppContext)
    const navigate = useNavigate()

    const [nombre, setNombre] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {
      setSuccess(false)
    }, [])
    

    const newPlataforma = async (e) => {
        e.preventDefault();
        if (!nombre || nombre === "") {
          setError("El nombre de la plataforma no puede estar vacio");
        } else {
          try {
            await axios.post(`http://localhost:8000/plataformas`, { nombre: nombre });
            setSuccess("¡La plataforma fue creada exitosamente!");
            navigate(`/plataformas`)
          } catch (error) {
            setError(error.message)
            console.error(error)
          }
        }
      };

    const handleNombreChange = (e) => {
        setNombre(e.target.value)
      };

    return(
        <>
          <HeaderComponent/>
          <NavbarComponent/>
          <div className="container mb-4">
            <h2 className="text-center mt-5 mb-4">Nueva plataforma</h2>
            <form onSubmit={newPlataforma}>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6 ">
                        <input 
                            type="text" 
                            id="genName" 
                            value={nombre} 
                            className="form-control text-center" 
                            onChange={handleNombreChange}>
                        </input>
                        <button type="button" className="btn btn-primary mt-4" onClick={newPlataforma}>Guardar</button>
                    </div>
                </div>
            </form>
            {error && <Error msg={error}/>}
        </div>
        <Footer/>
        </>
    );
}

export default PlataformaNewPage