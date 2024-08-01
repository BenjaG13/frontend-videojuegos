import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Tbody from '../../components/Tbody';
import ButtonNew from '../../components/ButtonNew';
import { AppContext } from '../../context/appContext';
import Success from '../../components/Success';
import Error from '../../components/Error';
import Footer from '../../components/FooterComponent';
import Loader from '../../components/Loader';
import HeaderComponent from '../../components/HeaderComponent';
import NavbarComponent from '../../components/NavBarComponent';

const PlataformaListPage = () => {
    const {state: { success }} = useContext(AppContext)
    const [plataformas, setPlataformas] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)

    const getPlataformaData = async () => {
      setLoading(true)
      try {
        const response = await axios.get('http://localhost:8000/plataformas');
        setPlataformas(response.data);
      }catch (error) {
        console.error(error);
      }

      setLoading(false)
  };

  useEffect(() => {
    setError(false)
    getPlataformaData()
  }, [])

  const setearError = (error) =>{
    setError(error)
  } 
  const setearPlataformas = (plataformas) =>{
    setPlataformas(plataformas)
  } 
  
    return(
        <>
        <HeaderComponent/>
        <NavbarComponent/>
        <div className="container col-6 mb-5 mt-5">
        {success && <Success msg={success} />}
        {error && <Error msg={error}/>}
        <h2 className="text-center mt-4 mb-3">Listado de plataformas</h2>
        {loading ? (
          <Loader/>
        ) : (
          <>
          <table className="table table-striped" >
            <thead>

            </thead>
            <Tbody  data={plataformas} category="plataformas" setearError={setearError} setearData={setearPlataformas}/>          
         </table>
        <ButtonNew category="plataformas" />
        </>
        )}
        
      </div>
      <Footer/>
      </>
    );
}

export default PlataformaListPage