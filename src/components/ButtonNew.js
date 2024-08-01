import { Button } from "react-bootstrap"

const ButtonNew = ({category}) => {
    return(
        <>
            <Button href={"/" + category + "/new"} size="lg" className="mt-3">
                Crear {(category === "generos") ? "genero nuevo" :"plataforma nueva"}
            </Button>
        </>
    )
}

export default ButtonNew