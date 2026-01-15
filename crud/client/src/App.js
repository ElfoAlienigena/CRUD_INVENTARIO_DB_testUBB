import './App.css';
import { useState, useEffect } from "react"
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from 'sweetalert2'
import Login from './login';


function App() {

  { /* VARIABLES DE LOGIN */}

  const [isLogged, setIsLogged] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  

  { /* VARIABLES USUARIO */ }

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [username, setUsername] = useState("");
  const [clave, setClave] = useState("");

  { /* VARIABLES MARCA */  }

  const [nombre_marca, setNombreMarca] = useState("");
  const [paisOrigen, setPaisOrigen] = useState("");
  
  { /* VARIABLES PRODUCTO */  }
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad_existencias, setCantidadExistencias] = useState("");
  const [usuario_registro_id, setUsuarioRegistroId] = useState("");
  const [marca_id, setMarcaId] = useState("");
  const [descripcion, setDescripcion] = useState("");

  { /* VARIABLES GENERALES */  }

  const [editar, setEditar] = useState(false);
  const [id, setId] = useState();
  const [userList, setUser] = useState([]);
  const [marcaList, setMarcaList] = useState([]);

  const [mostrarLista, setMostrarLista] = useState(false);
  const [mostrarListaMarca, setMostrarListaMarca] = useState(false);
  const [editarMarca, setEditarMarca] = useState(false);

  const [productoList, setProductoList] = useState([]);
  const [mostrarListaProducto, setMostrarListaProducto] = useState(false);
  const [editarProducto, setEditarProducto] = useState(false);

  const [criterioActual, setCriterioActual] = useState('p.id');
  const [direccion, setDireccion] = useState('ASC');

  useEffect(() => {
      getMarca();
      getUser();
    }, []);

  { /* FUNCIONES USUARIO */ }
  const agregar = () => {
    axios.post("http://localhost:3001/registrar", {
      nombre: nombre,
      apellido: apellido,
      username: username,
      clave: clave
    }).then(() => {
      Swal.fire({
        title: "¡Usuario registrado con éxito!",
        icon: "success",
      });

      limpiar();
    });
  }

  const update = () => {
    axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      apellido: apellido,
      username: username,
      clave: clave
    }).then(() => {
      getUser();
      Swal.fire({
        title: "¡Usuario actualizado con éxito!",
        icon: "success",
      });
      limpiar();
      setEditar(false);
    });
  }

  const limpiar = () => {
    setNombre("");
    setApellido("");
    setUsername("");
    setClave("");
  }

  const cancelar = () => {
    setEditar(false);
    limpiar();
  }

  const editUser = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setApellido(val.apellido);
    setUsername(val.username);
    setClave(val.clave);
    setId(val.id);
  }

  const getUser = (req, res) => {
    axios.get("http://localhost:3001/usuario").then((response) => {
      setUser(response.data);
    });
}

const toggleList = () => {
    if (!mostrarLista) {
      getUser(); // Carga los datos al abrir
    }
    setMostrarLista(!mostrarLista);
  }

const cerrarSesion = () => {
  // Cerrar la sesión
  setIsLogged(false);
  setUsuarioLogueado(null);
  
  // Resetear la visibilidad de todas las tablas
  setMostrarLista(false);
  setMostrarListaMarca(false);
  setMostrarListaProducto(false);

  // Limpiar los estados de edición 
  setEditar(false);
  setEditarMarca(false);
  setEditarProducto(false);
};

  const deleteUser = (id) => {

    Swal.fire({
        title: "Eliminar?",
        text: "Una vez eliminado no se pueden recuperar datos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((res) => { 
        if (res.isConfirmed) {
          axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
            getUser();
            limpiar();
          });
          Swal.fire({
            title: "Eliminado!",
            text: "Se han borrado permanentemente los datos del usuario seleccionado",
            icon: "success"
          });
        }
      });
  }

  { /* FUNCIONES MARCA */ }
const agregarMarca = () => {
    axios.post("http://localhost:3001/registrarMarca", {
      nombre_marca: nombre_marca,
      paisOrigen: paisOrigen
    }).then(() => {
      Swal.fire({
        title: "¡Marca registrada con éxito!",
        icon: "success",
      });

      limpiarMarca();
    });
  }

  const updateMarca = () => {
    axios.put("http://localhost:3001/updateMarca", {
      id: id,
      nombre_marca: nombre_marca,
      paisOrigen: paisOrigen
    }).then(() => {
      getMarca();
      Swal.fire("¡Actualizado!", "Marca actualizada con éxito", "success");
      limpiarMarca();
      setEditarMarca(false);
    });
  }

  const limpiarMarca = () => {
    setNombreMarca("");
    setPaisOrigen("");
  }

  const cancelarMarca = () => {
    setEditarMarca(false);
    limpiarMarca();
  }

  const editMarca = (val) => {
    setEditarMarca(true);
    setNombreMarca(val.nombre);
    setPaisOrigen(val.pais);
    setId(val.id);
  }

  const getMarca = (req, res) => {
    axios.get("http://localhost:3001/marca").then((response) => {
      setMarcaList(response.data);
    });
}

const toggleListMarca = () => {
    if (!mostrarListaMarca) {
      getMarca(); 
    }
    setMostrarListaMarca(!mostrarListaMarca);
  }

  const deleteMarca = (id) => {

    Swal.fire({
        title: "Eliminar marca?",
        text: "Una vez eliminado no se pueden recuperar datos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar"
      }).then((res) => {
        if (res.isConfirmed) {
          axios.delete(`http://localhost:3001/deleteMarca/${id}`).then((response) => {
            getMarca();
            limpiarMarca();
          });
          Swal.fire({
            title: "Eliminado!",
            text: "Se han borrado permanentemente los datos de la marca seleccionada",
            icon: "success"
          });
        }
      });
  }

  { /* FUNCIONES PRODUCTO */ }

  const agregarProducto = () => {
    axios.post("http://localhost:3001/registrarProducto", {
      nombre: producto,
      marca_id: marca_id,
      descripcion: descripcion,
      precio: precio,
      cantidad_existencias: cantidad_existencias,
      usuario_registro_id: usuario_registro_id
    }).then(() => {
      Swal.fire({
        title: "¡Producto registrado con éxito!",
        icon: "success",
      });
      getProducto();
      limpiarProducto();
    });
  }
  const limpiarProducto = () => {
    setMarcaId("");
    setProducto("");
    setPrecio("");
    setUsuarioRegistroId("");
    setCantidadExistencias("");
    setDescripcion("");
  }

  const cancelarProducto = () => {
    setEditarProducto(false);
    limpiarProducto();
  }

  const editProducto = (val) => {
    setEditarProducto(true);
    setId(val.id);
    setProducto(val.nombre);
    setMarcaId(val.marca_id);
    setUsuarioRegistroId(val.usuario_registro_id); 
    setPrecio(val.precio);
    setCantidadExistencias(val.cantidad_existencias);
    setDescripcion(val.descripcion);
}

const updateProducto = () => {
    axios.put("http://localhost:3001/updateProducto", {
      id: id,
      nombre: producto,
      marca_id: marca_id,
      descripcion: descripcion,
      precio: precio,
      cantidad_existencias: cantidad_existencias,
      usuario_registro_id: usuario_registro_id
    }).then(() => {
      getProducto();
      Swal.fire("Actualizado", "Producto actualizado correctamente", "success");
      limpiarProducto();
      setEditarProducto(false);
    });
}

const cambiarStock = (val, cambio) => {
  const nuevoStock = val.cantidad_existencias + cambio;

  // Evita que el stock sea menor a 0
  if (nuevoStock < 0) return;

  axios.patch(`http://localhost:3001/updateStock/${val.id}`, {
    cantidad_existencias: nuevoStock
  }).then(() => {
    getProducto(criterioActual, direccion); 
  }).catch((error) => {
    console.error("Error actualizando stock", error);
  });
};

const getProducto = (criterio = criterioActual, dir = direccion) => {
    axios.get(`http://localhost:3001/producto?orderBy=${criterio}&direction=${dir}`)
      .then((response) => {
        setProductoList(response.data);
        setCriterioActual(criterio); 
        setDireccion(dir); 
      });
}

const cambiarDireccion = () => {
    const nuevaDir = direccion === 'ASC' ? 'DESC' : 'ASC';
    getProducto(criterioActual, nuevaDir);
}

const toggleListProducto = () => {
    if (!mostrarListaProducto) {
      getProducto();
    }
    setMostrarListaProducto(!mostrarListaProducto);
  }

  const deleteProducto = (id) => {

    Swal.fire({
        title: "Eliminar?",
        text: "Una vez eliminado no se pueden recuperar datos!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar"
      }).then((res) => {
        if (res.isConfirmed) {
          axios.delete(`http://localhost:3001/deleteProducto/${id}`).then((response) => {
            getProducto();
            limpiarProducto();
          });
          Swal.fire({
            title: "Eliminado!",
            text: "Se han borrado permanentemente los datos del producto seleccionado.",
            icon: "success"
          });
        }
      });
  }

return (
    <div className="container">
      {!isLogged ? (
        <Login setIsLogged={setIsLogged} setUsuarioLogueado={setUsuarioLogueado} />
      ) : (
        <div className="card-group">
          <div className="container mt-4">
              {/* header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="card-header bg-success text-white">
                {usuarioLogueado?.rol === 'admin' ? "Gestión de Inventario" : "Registro de Productos"}
              </div>
              <button className="btn btn-danger" onClick={cerrarSesion}>
                Cerrar Sesión
              </button>
            </div>

              {/* Mensaje de Bienvenida */}
            <div className="row mb-4">
              <div className="col">
                <h3>Bienvenido {usuarioLogueado?.nombre} (Rol: {usuarioLogueado?.rol})</h3>
              </div>
            </div>

              {/* funcion principal crud tablas */}
            <div className="row justify-content-center align-items-stretch">
              {/* COLUMNA PARA ADMINISTRADORES */}
              {usuarioLogueado?.rol === 'admin' && (
                <>
                <div className="col-md-4 d-flex justify-content-center">
                  <div className="registro-usuarios mb-4 w-100">
                
                    <div className="card text-center">
                    <div className="card">REGISTRO DE USUARIOS</div>
                    <div className="card-body">
                      { /* label nombre */ }
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"> Nombre: </span>
                      <input onChange={(e) => {setNombre(e.target.value);}} type="text" value={nombre} className="form-control" placeholder="Ingrese su nombre" aria-label="nombre" aria-describedby="basic-addon1"/>
                    </div>

                      { /* label apellido */}
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"> Apellido: </span>
                      <input onChange={(e) => {setApellido(e.target.value);}} type="text" value={apellido} className="form-control" placeholder="Ingrese su apellido" aria-label="apellido" aria-describedby="basic-addon1"/>
                    </div>
                    
                      { /* label username */}
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"> Username: </span>
                      <input onChange={(e) => {setUsername(e.target.value);}} type="text" value={username} className="form-control" placeholder="Ingrese su nombre de usuario" aria-label="username" aria-describedby="basic-addon1"/>
                    </div>
                    
                      { /* label clave */}
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"> Clave: </span>
                      <input onChange={(e) => {setClave(e.target.value);}} type="password" value={clave} className="form-control" placeholder="Ingrese su contraseña" aria-label="username" aria-describedby="basic-addon1"/>
                    </div>
                      
                    </div>
                    <div className="card-footer text-muted">
                    {
                      editar?
                      <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" className="btn btn-danger" 
                          onClick={update} >Actualizar Usuario</button>
                        <button type="button" className="btn btn-outline-danger" onClick={cancelar}>Cancelar</button>
                      </div>
                      : <button className='btn btn-success' onClick={agregar} >Registrar Usuario</button>
                    }
                    </div>
                    </div>

                    <div className="mb-3">
                      <button 
                        onClick={toggleList} 
                        className={mostrarLista ? "btn btn-secondary" : "btn btn-primary"} >
                        {mostrarLista ? "Cerrar Lista" : "Listar Usuarios"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 d-flex justify-content-center">  
                  <div className="registro-marca mb-4 w-100">
                      <div className="card text-center">
                        <div className="card">REGISTRO DE MARCAS</div>
                        <div className="card-body">
                            { /* label marca */}
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"> Marca: </span>
                            <input onChange={(e) => {setNombreMarca(e.target.value);}} type="text" value={nombre_marca} className="form-control" placeholder="Ingrese la marca" aria-label="marca" aria-describedby="basic-addon1"/>
                          </div>

                            { /* label país de origen */}
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"> País de Origen: </span>
                            <input onChange={(e) => {setPaisOrigen(e.target.value);}} type="text" value={paisOrigen} className="form-control" placeholder="Ingrese el país de origen" aria-label="paisOrigen" aria-describedby="basic-addon1"/>
                          </div>
                          
                        </div>

                        <div className="card-footer text-muted">
                        {
                          editarMarca?
                          <div className="btn-group" role="group" aria-label="Basic outlined example">
                            <button type="button" className="btn btn-danger" 
                              onClick={updateMarca} >Actualizar Marca</button>
                            <button type="button" className="btn btn-outline-danger" onClick={cancelarMarca}>Cancelar</button>
                          </div>
                          : <button className='btn btn-success' onClick={agregarMarca} >Registrar Marca</button>
                        }
                        </div>
                      </div>

                      <div className="mb-3">
                        <button 
                          onClick={toggleListMarca} 
                          className={mostrarListaMarca ? "btn btn-secondary" : "btn btn-primary"} >
                          {mostrarListaMarca ? "Cerrar Lista" : "Listar Marcas"}
                        </button>
                      </div>
                  </div>
                </div>
                </>
              )}

              {/* COLUMNA PARA PRODUCTOS (Se adapta si no es admin) */}
              <div className={`${usuarioLogueado?.rol === 'admin' ? "col-md-4" : "col-md-6"} d-flex justify-content-center`}>
                {/* REGISTRO DE PRODUCTOS */}
                <div className="registro-producto w-100">
                  <div className="card text-center">
                      <div className="card">REGISTRO DE PRODUCTOS</div>
                      <div className="card-body overflow-auto">
                        <div className="input-group mb-3">
                          <span className="input-group-text">Nombre:</span>
                          <input onChange={(e) => setProducto(e.target.value)} type="text" placeholder='Ingrese nombre de producto' value={producto} className="form-control" />
                        </div>

                        {/* SELECT DE MARCA */}
                        <div className="input-group mb-3">
                          <span className="input-group-text">Marca:</span>
                          <select 
                            className="form-select" 
                            value={marca_id} 
                            onChange={(e) => setMarcaId(e.target.value)}
                          >
                            <option value="">Seleccione una marca...</option>
                            {marcaList.map((m) => (
                              <option key={m.id} value={m.id}>{m.nombre}</option>
                            ))}
                          </select>
                        </div>

                        {/* SELECT DE USUARIO */}
                        <div className="input-group mb-3">
                          <span className="input-group-text">Usuario:</span>
                          <select 
                            className="form-select" 
                            value={usuario_registro_id} 
                            onChange={(e) => setUsuarioRegistroId(e.target.value)}
                          >
                            <option value="">¿Quién registra?</option>
                            {userList.map((u) => (
                              <option key={u.id} value={u.id}>{u.nombre} {u.apellido}</option>
                            ))}
                          </select>
                        </div>

                        <div className="input-group mb-3">
                          <span className="input-group-text">Precio:</span>
                          <input onChange={(e) => setPrecio(e.target.value)} type="number" placeholder='$$$' value={precio} className="form-control" />
                        </div>

                        <div className="input-group mb-3">
                          <span className="input-group-text">Existencias:</span>
                          <input onChange={(e) => setCantidadExistencias(e.target.value)} type="number" placeholder='Ingrese Nº de existencias' value={cantidad_existencias} className="form-control" />
                        </div>
                        
                        <div className="input-group mb-3">
                          <span className="input-group-text">Descripción:</span>
                          <textarea onChange={(e) => setDescripcion(e.target.value)} value={descripcion} placeholder='Ingrese descripción de producto' className="form-control"></textarea>
                        </div>
                      </div>
                      

                      <div className="card-footer text-center">
                        {editarProducto ? (
                          <div className="btn-group">
                            <button onClick={updateProducto} className="btn btn-danger">Actualizar</button>
                            <button onClick={cancelarProducto} className="btn btn-outline-danger">Cancelar</button>
                          </div>
                        ) : (
                          <button className='btn btn-success' onClick={agregarProducto}>Registrar Producto</button>
                        )}
                      </div>
                  </div>
                  <div className="mb-3">
                        <button 
                          onClick={toggleListProducto} 
                          className={mostrarListaProducto ?  "btn btn-secondary" : "btn btn-primary"}>
                          {mostrarListaProducto ? "Cerrar Lista" : "Listar Productos"}
                        </button>
                  </div>
                </div>
              </div>
            </div>

            {/* TABLAS (Fuera de las columnas para que ocupen todo el ancho) */}
            <div className="row mt-4">
              <div className="col-12">
                {mostrarLista && (
                <table className="table table-striped table-hover">
                  <thead>
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Username</th>
                      <th scope="col">Clave</th>
                      <th scope="col">Acciones</th>
                  </tr>
                  </thead>
              
                  <tbody>
                  {
                    userList.map((val, key) => {
                      return <tr key={val.id}>
                          <th>{val.id}</th>
                          <td>{val.nombre}</td>
                          <td>{val.apellido}</td>
                          <td>{val.username}</td>
                          <td>{val.clave}</td>
                          <td>
                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                              <button type="button" 
                              onClick={() => {editUser(val)}} 
                              className="btn btn-outline-primary">Editar</button>
                              <button type="button" onClick={() => {deleteUser(val.id)}} className="btn btn-danger">Eliminar</button>
                            </div>
                          </td>
                        </tr>
                    })
                  }
                  </tbody>
                </table>
                )}
                {mostrarListaMarca && (
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre Marca</th>
                      <th scope="col">País de Origen</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
            
                  <tbody>
                  {
                    marcaList.map((val, key) => {
                      return <tr key={val.id}>
                          <th>{val.id}</th>
                          <td>{val.nombre}</td>
                          <td>{val.pais}</td>
                          <td>
                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                              <button type="button" onClick={() => {editMarca(val)}} className="btn btn-outline-primary">Editar</button>
                              <button type="button" onClick={() => {deleteMarca(val.id)}} className="btn btn-danger">Eliminar</button>
                            </div>
                          </td>
                        </tr>
                    })
                  }
                  </tbody>
                </table>
                )}
                {mostrarListaProducto && (
                <div className="mt-3">
                  <div className="d-flex align-items-center mb-2">
                      {/* Menú de Criterio */}
                  <div className="dropdown mb-2">
                    <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Ordenar por: {criterioActual === 'p.id' ? 'ID' : 
                                  criterioActual === 'p.nombre' ? 'Nombre' : 
                                  criterioActual === 'm.nombre' ? 'Marca' : 'Precio'}
                    </button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item" onClick={() => getProducto('p.id')}>ID (Defecto)</button></li>
                      <li><button className="dropdown-item" onClick={() => getProducto('p.nombre')}>Nombre Producto</button></li>
                      <li><button className="dropdown-item" onClick={() => getProducto('m.nombre')}>Marca</button></li>
                      <li><button className="dropdown-item" onClick={() => getProducto('p.precio')}>Precio</button></li>
                    </ul>
                  </div>

                      { /* Botón de Dirección */ }
                  <button className="btn btn-primary" onClick={cambiarDireccion}>
                    {direccion === 'ASC' ? ' Ascendente' : 'Descendente'}
                  </button>
                  </div>

                      {/*  Tabla */}
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre Producto</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Registrado por: </th>
                        <th scope="col">Precio</th>
                        <th scope="col">Existencias</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    
                    <tbody>
                    {
                      productoList.map((val, key) => {
                        return <tr key={val.id}>
                            <th>{val.id}</th>
                            <td>{val.nombre}</td>
                            <td>{val.nombre_marca}</td>
                            <td>{val.nombre_usuario}</td>
                            <td>{val.precio}</td>
                            <td>{val.cantidad_existencias}</td>
                            <td>{val.descripcion}</td>
                            <td>
                              <div className="btn-group" role="group" aria-label="Basic outlined example">
                                <button type="button" onClick={() => {cambiarStock(val, 1)}} className='btn btn-primary'>+</button>
                                <button type="button" onClick={() => {cambiarStock(val, -1)}} className='btn btn-secondary'>-</button>
                                <button type="button" onClick={() => {editProducto(val)}} className="btn btn-outline-primary">Editar</button>
                                <button type="button" onClick={() => {deleteProducto(val.id)}} className="btn btn-danger">Eliminar</button>
                              </div>
                            </td>
                          </tr>
                      })
                    }
                    </tbody>
                  </table>
                </div>
                )}
              </div>
            </div>
          </div>
        </div> 
      )} {/* Cierre de la condicional !isLogged */}
    </div>
  );
}

export default App;
