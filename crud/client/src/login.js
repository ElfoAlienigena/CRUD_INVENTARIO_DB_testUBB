import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ setIsLogged, setUsuarioLogueado }) {

const [logUser, setLogUser] = React.useState("");
const [logPass, setLogPass] = React.useState("");

function handleSubmit(e) {
    e.preventDefault();

    axios.post("http://localhost:3001/login", {
        usuario: logUser,
        clave: logPass
    }).then((response) => {
        if(response.data.message) {
            
            Swal.fire({
                title: "Error de autenticación",
                text: response.data.message,
                icon: "error",
            });
        } else {
            setUsuarioLogueado(response.data);
            setIsLogged(true);
            Swal.fire({
                title: "¡Inicio de sesión exitoso!",
                text: `Bienvenido, ${response.data.username}`,
                icon: "success",
            });
        }
    });
}  

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100 ">
        <div className='p-3 bg-white w-25'>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name'>Usuario</label>
                    <input type="text" placeholder='Ingrese nombre de usuario' className='form-control' onChange={e => setLogUser(e.target.value)}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'>Contraseña</label>
                    <input type="password" placeholder='Ingrese su contraseña' className='form-control' onChange={e => setLogPass(e.target.value)}/>
                </div>
                <div>
                    <button className='btn btn-success' type="submit">Iniciar Sesión</button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default Login;