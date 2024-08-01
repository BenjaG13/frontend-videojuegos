import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import Error from '../../components/Error';
import Footer from '../../components/FooterComponent';
import Loader from '../../components/Loader';
import HeaderComponent from '../../components/HeaderComponent';
import NavbarComponent from '../../components/NavBarComponent';

const DashboardPage = () => {
  const [filtros, setFiltro] = useState({
    nombre: "",
    genero: null,
    plataforma: null,
    orden: "ASC",
  });

  const [tituloFiltro, setTituloFiltro] = useState("")
  const [generos, setGeneros] = useState([])
  const [plataformas, setPlataformas] = useState([])
  const [juegos, setJuegos] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const getGeneroData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/generos");
      setGeneros(response.data);
    }catch (error) {
      console.error(error);
      setError(true)
    }
};


const getPlataformaData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/plataformas');
      setPlataformas(response.data);
    }catch (error) {
      console.error(error);
      setError(true)
    }
};

 useEffect(() => {
   setLoading(true)
   getGeneroData()
   getPlataformaData()
   updateJuegos()
 }, [])


 const handleNombreChange = (e) => {
    const updatedData = { ...filtros, nombre: e.target.value };
    setFiltro(updatedData);
  };

  const handleGeneroChange = (e) => {
    const updatedData = { ...filtros, genero: e.target.value };
    setFiltro(updatedData);
  };

  const handlePlataformaChange = (e) => {
    const updatedData = { ...filtros, plataforma: e.target.value };
    setFiltro(updatedData);
  };

  const handleOrdenChange = (e) => {
    const updatedData = { ...filtros, orden: e.target.value };
    setFiltro(updatedData);
  };
 
  const updateTitulo = () => {
    var newTitulo = "Todos los juegos "
    if (filtros.nombre || filtros.genero || filtros.plataforma) {
        newTitulo = "Juegos ";
        filtros.nombre && (newTitulo += '"' + filtros.nombre + '" ')
        if(filtros.genero){
            var nombreGenero = generos.find((genero) => genero.id.toString() === filtros.genero)
            nombreGenero = nombreGenero.nombre
            newTitulo += 'de ' + nombreGenero + ' '
        }
        if(filtros.plataforma){
            var nombrePlataforma = plataformas.filter((plataforma) => plataforma.id.toString() === filtros.plataforma)[0]
            nombrePlataforma = nombrePlataforma.nombre
            newTitulo += 'para ' + nombrePlataforma + ' '
        }
    }
    (filtros.orden === "ASC") ? newTitulo += '(A-Z)' : newTitulo += '(Z-A)'
    setTituloFiltro(newTitulo)
  }
     
    
  const handleUpdateJuegos = (e) => {
    e.preventDefault();
    updateJuegos();
  }
  const updateJuegos = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:8000/juegos', {
        params: {
          nombre: filtros.nombre,
          genero: filtros.genero,
          plataforma: filtros.plataforma,
          orden: filtros.orden,
        },
      });
      const newJuegos = response.data
      updateTitulo()
      setJuegos(newJuegos);
      
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
    setLoading(false)
  };
  

  return (
    <>
      <HeaderComponent/>
      <NavbarComponent/>
      <div className="container">

        <h1 className="text-center mb-5 mt-5">Videojuegos</h1>
        <p className="mt-5">Filtros:</p>
        <Form onSubmit={handleUpdateJuegos}>
          <Row>
            <Col sm={2}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" onChange={handleNombreChange} />
            </Col>
            <Col sm={2}>
              <Form.Label>Genero</Form.Label>
              <Form.Select onChange={handleGeneroChange}>
                <option value="">Todos</option>
                {generos.map((genero) => (
                  <option key={genero.id} value={genero.id}>
                    {genero.nombre}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col sm={2}>
              <Form.Label>Plataforma</Form.Label>
              <Form.Select onChange={handlePlataformaChange}>
                <option value="">Todas</option>
                {plataformas.map((plataforma) => (
                  <option key={plataforma.id} value={plataforma.id}>
                    {plataforma.nombre}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col sm={2}>
              <Form.Label>Orden</Form.Label>
              <Form.Select onChange={handleOrdenChange}>
                <option value={"ASC"}> A-Z </option>
                <option value={"DESC"}> Z-A </option>
              </Form.Select>
            </Col>
          </Row>
          <Button className="mt-4" variant="primary" type="submit">
            Filtrar
          </Button>
        </Form>
      </div>
      <div className="container">
        {error && <Error msg={error} />}
  
        <h2 className="mt-5 mb-5">
          {!tituloFiltro ? "Todos los juegos (A-Z)" : tituloFiltro}
        </h2>
        {loading ? (
          <Loader />
        ) : (
          <>
            {juegos.length > 0 ? (
              juegos.map((juego) => (
                <Card key={juego.id} className="mb-3 h-100 height-card">
                  <div className="height-card">
                    <Row className="h-100 ">
                      <Col xs={3} className="d-flex align-items-stretch">
                        <Card.Img
                          src={`data:${juego.tipo_imagen};base64,${juego.imagen}`}
                          className="height-card"
                          alt={juego.nombre}
                        />
                      </Col>
                      <Col xs={9}>
                        <Card.Body>
                          <Card.Title>{juego.nombre}</Card.Title>
                          <Card.Text>{juego.nombre_plataforma}</Card.Text>
                          <Card.Text>{juego.descripcion}</Card.Text>
                          <a
                            href={juego.pagina_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=""
                          >
                            Página Oficial
                          </a>
                          <Card.Text className="mt-4">
                            <strong>Género: </strong>
                            {juego.nombre_genero}
                          </Card.Text>
                        </Card.Body>
                      </Col>
                    </Row>
                  </div>
                </Card>
              ))
            ) : (
                <p className="text-center fs-3 ">No se encontraron resultados para tu busqueda</p>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
  
};

export default DashboardPage;



