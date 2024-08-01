import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Error from "../../components/Error";
import axios from "axios";
import { AppContext } from "../../context/appContext";
import Footer from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponent";
import NavbarComponent from "../../components/NavBarComponent";

const PlataformaUpdatePage = () => {
    const {setSuccess} = useContext(AppContext)
    const [data, setData] = useState({})
    const [error, setError] = useState(false)


    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
    
    }, [error]);

  useEffect(() => {
    const { data } = location.state || {};
    if (!data){  
        navigate(`/plataformas`)
    }
        setData(data);
        setSuccess(false)
  }, []);

  const handleNombreChange = (e) => {
    const updatedData = { ...data, nombre: e.target.value };
    setData(updatedData);
  };

  const updatePlataforma = async (e) => {
    e.preventDefault();
    if (!data.nombre || data.nombre === "") {
      setError("El nombre del plataforma no puede estar vacio");
    } else {
      try {
        await axios.put(`http://localhost:8000/plataformas/${data.id}`, { nombre: data.nombre });
        setSuccess("¡La plataforma fue actualizada exitosamente!");
        navigate(`/plataformas`)
      }catch (error) {
        console.error(error)
        setError(error.message);
      }
    }
  };

    return(data ? (
        <> 
          <HeaderComponent/>
          <NavbarComponent/>
          <div className="container mb-5">
            <h2 className="text-center mt-5 mb-4">Editar plataforma</h2>
            <form onSubmit={updatePlataforma}>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6 ">
                        <input 
                            type="text" 
                            id="genName" 
                            value={data.nombre} 
                            className="form-control text-center" 
                            onChange={handleNombreChange}>
                        </input>
                        <button type="button" className="btn btn-primary mt-4" onClick={updatePlataforma}>Guardar</button>
                    </div>
                </div>
            </form>
            {error && <Error msg={error}/>}
          </div>
          <Footer/>
        </>
    ) : null
    );
}

export default PlataformaUpdatePage