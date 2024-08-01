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

const GeneroListPage = () => {
    const {state: { success }} = useContext(AppContext)
    const [generos, setGeneros] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)

    const getGeneroData = async () => {
      setLoading(true)
      try {
        const response = await axios.get('http://localhost:8000/generos');
        setGeneros(response.data);
      }catch (error) {
        console.error(error);
      }
      setLoading(false)
  };

  useEffect(() => {
    setError(false)
    getGeneroData()
  }, [])

  const setearError = (error) =>{
    setError(error)
  } 
  const setearGeneros = (generos) =>{
    setGeneros(generos)
  } 
  
    return(
      <>
        <HeaderComponent/>
        <NavbarComponent/>
        <div className="container col-6 mb-5">

          {success && <Success msg={success} />}
          {error && <Error msg={error}/>}
          <h2 className="text-center mt-4 mb-3">Listado de géneros</h2>
          {loading ? (
            <Loader/>
          ) : (
            <>
              <table className="table table-striped" >
                <thead>

                </thead>
              <Tbody  data={generos} category="generos" setearError={setearError} setearData={setearGeneros}/>          
              </table>
              <ButtonNew category="generos" />
            </>
          )}
          
        </div>
        <Footer/>
      </>
      
    );
}

export default GeneroListPage