import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext } from "react"
import { AppContext } from "../context/appContext"

const Tbody = ({data, category, setearError, setearData}) => {
    const {setSuccess} = useContext(AppContext)
    const navigate = useNavigate()

    const handleEdit = (el) => {
        navigate(`/${category}/update/${el.id}`, { state: { data: el } })
    }

    const deleteGenero = async (id) => {
          try {
            await axios.delete(`http://localhost:8000/generos/${id}`);
            setearError(false)
            data = data.filter(item => item.id !== id)
            setearData(data)

          }catch (error) {
            console.error(error)
            console.log(error.response.data.error)
            setearError(error.message)
          } 
      };

    const deletePlataforma = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/plataformas/${id}`);
            setearError(false)
            data = data.filter(item => item.id !== id)
            setearData(data)
        }catch (error) {
            console.error(error.message);
            setearError(error.message)
        } 
    };  
       
    const handleDelete = (el) => {
        setSuccess(false)
        if (category === "plataformas"){
            if (window.confirm(`¿Estas seguro que deseas eliminar la plataforma "${el.nombre}?"`)) {
                deletePlataforma(el.id)
            } 
        }else{
            if (window.confirm(`¿Estas seguro que deseas eliminar el genero "${el.nombre}"?`)) {
                deleteGenero(el.id)
            }
        }
    }

    return(
        <>
            <tbody>
                {data.map(el => (
                <tr key={el.id}>
                    <td className="col-8">{el.nombre}</td>
                    <td>
                        <button className="btn btn-warning " onClick={() => handleEdit(el)}>
                            Editar
                        </button>
                    </td>
                    <td>
                        <button className="btn btn-danger "  onClick={() => handleDelete(el)}>
                            Eliminar
                        </button>
                    </td>
                </tr> 
                  ))}
            </tbody>
        </>
    )
}

export default Tbody;