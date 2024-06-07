// import React, { useState, useRef, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import Swal from "sweetalert2";

// /* icons */
// import { RiMailLine, RiLock2Line } from "react-icons/ri";
// import { IoMdClose } from "react-icons/io";
// import { LuEye, LuEyeOff } from "react-icons/lu";
// import { FcGoogle } from "react-icons/fc";
// import { FaArrowLeft, FaFacebook, FaGithub, FaHouse } from "react-icons/fa6";
// import { HiArrowUturnLeft } from "react-icons/hi2";
// //import { Checkbox } from "@material-tailwind/react";

// /* services, helpers and actions */
// import loginUser from "../../services/auth/requestLogin";
// import parseJwt from "../../helpers/parseJwt";
// import {
//   setIsLogged,
//   setInfoUserLogged
//   } from "../../redux/actions/index";
// import { IoCloseCircleOutline } from "react-icons/io5";


// import "./Conten.css"

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isLogged = useSelector((state) => state.isLogged);
//   const [showPassword, SetShowPassword] = useState(false);
//   const [showEmail, setShowEmail] = useState(false);
//   const { isAuthenticated} = useAuth0();
//   const { loginWithRedirect } = useAuth0();
//   const [formData, setFormData] = useState({
//     email: localStorage.getItem("email") || "",
//     password: "",
//   });

//   // Función que verifica y cambia el estado de la sesión
//   const checkToken = () => {
//     if (localStorage.getItem("token") && (isLogged === true || isAuthenticated === true))  {
//       dispatch(setIsLogged(
//         parseJwt(localStorage.getItem("token")).exp * 1000 > Date.now()
//       ));
//       //const emailAuth = infoUserLogged.email;
//       navigate("dashboard");
//     }
//     if (localStorage.getItem("token") && isLogged === false) {
//       dispatch(setIsLogged(
//         false
//       ));
//     }
//   };




//   //Función que escucha el cambio del estado autenticación
//   useEffect(() => {
    
//     // Verificar la validez del token inmediatamente
//     checkToken();
//     // Verificar la validez del token cada minuto
//     //const intervalId = setInterval(checkToken, 60000);
//     // Limpiar el intervalo cuando el componente se desmonte
//     //return () => clearInterval(intervalId);
//   }, [isLogged, isAuthenticated]);


//   // Submit de inicio de sesión
//   const handleLoginSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const token = await loginUser(formData);
//       localStorage.setItem("token", token);
//       dispatch(setInfoUserLogged(
//         localStorage.getItem("token") && parseJwt(localStorage.getItem("token"))
//       ));
//         Swal.fire({
//           icon: "success",
//           title: "Inicio de sesión exitoso",
//           text: "Bienvenido a la plataforma",
//           showConfirmButton: true,
//         });
        
//       dispatch(setIsLogged(
//         parseJwt(localStorage.getItem("token")).exp * 1000 > Date.now()
//       ));
//     } catch (error) {
//       console.error("Error al iniciar sesión:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Error al iniciar sesión",
//         showConfirmButton: true,
//       });
//     }
//   };

//   return (
//     <div className="content-loging w-full
//   "
//     >
      
//       <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-8 rounded-xl w-auto  lg:w-[450px] items-center justify-center shadow-2xl shadow-blue-800"
//       >
//         <>
//         <button className=" bg-blue-300 hover:bg-blue-700  text-gray-300 font-bold  rounded-md shadow-lg uppercase  m-2 " >
//           <Link to="/header">
//           <FaArrowLeft className="w-7 h-7 text-white"/>
//          </Link>
//         </button>
//       </>
//           <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
//             Iniciar <span className="text-primary">sesión</span>
//         </h1>

//           <div className="relative mb-4">
//             <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
//             <input
//               type="email"
//               className="py-3 pl-8 pr-8 bg-secondary-900 w-full outline-none rounded-lg focus:border focus:border-primary"
//               placeholder="Correo electrónico"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//             />
//             <IoMdClose
//               className="absolute top-1/2 -translate-y-1/2 right-2 text-primary hover:cursor-pointer"
//               onClick={() => setFormData({ ...formData, email: "" })}
//             />

//             {showEmail ? (
//               <button
//                 onClick={handleDeleteEmail}
//                 className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
//               >
//                 <IoCloseCircleOutline />
//               </button>
//             ) : null}
//           </div>
//           <div className="relative mb-8">
//             <RiLock2Line className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
//             <input
//               type={showPassword ? "text" : "password"}
//               className="py-3 pl-8 pr-8 bg-secondary-900 w-full outline-none rounded-lg focus:border focus:border-primary"
//               placeholder="Contraseña"
//               value={formData.password}
//               onChange={(e) =>
//                 setFormData({ ...formData, password: e.target.value })
//               }
//             />
//             {showPassword ? (
//               <LuEye
//                 onClick={() => SetShowPassword(!showPassword)}
//                 className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
//               />
//             ) : (
//               <LuEyeOff
//                 onClick={() => SetShowPassword(!showPassword)}
//                 className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
//               />
//             )}
//           </div>

//           <div>
//             <input
//               type="submit"
//               className="bg-s300 text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:text-gray-100 transition-colors"
//             onClick={handleLoginSubmit}
//             value="Iniciar sesión"
//             />
              
//         </div>

//         <p className=" text-black py-3 text-center "> O Ingresa con alguna de tus redes Sociales: </p>
//         <div className="flex items-center justify-center">
//           <button
//             className=" bg-gray-300 flex items-center justify-center mx-4 gap-2 bg-secondary-900 w-14 h-14 rounded-full mb-5 text-gray-300  hover:bg-blue-900 "
//             onClick={() => loginWithRedirect()}
//           >
//             <FcGoogle
//               className="w-9  h-9"
//             />
          
            
//         </button>

//         </div>
//           <div className="flex flex-col flex-gap-4 items-center ">
//             <Link
//               to="/auth/olvide-password"
//               className="hover:text-primary transition-colors "
//             >
//               ¿Olvidaste tu contraseña?
//             </Link>
//             <span className="flex items-center gap-2">
//               ¿No tienes cuenta?
//               <Link
//                 to="/auth/registro"
//                 className="text-primary hover:text-gray-100 transition-colors "
//               >
//                 Registrate
//               </Link>
//             </span>
//         </div>
        
//         </div>
      
//     </div>
//   );
// };

// export default Login;


//*Funciona
// import  { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import Swal from "sweetalert2";

// /* icons */
// import { RiMailLine, RiLock2Line } from "react-icons/ri";
// import { IoMdClose } from "react-icons/io";
// import { LuEye, LuEyeOff } from "react-icons/lu";
// import { FcGoogle } from "react-icons/fc";
// import { FaArrowLeft } from "react-icons/fa6";

// /* services, helpers and actions */
// import loginUser from "../../services/auth/requestLogin";
// import parseJwt from "../../helpers/parseJwt";
// import {validateLogin} from "../../utils/validateImputs";
// import {
//   setIsLogged,
//   setInfoUserLogged
// } from "../../redux/actions/index";

// import "./Conten.css";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isLogged = useSelector((state) => state.isLogged);
//   const { isAuthenticated } = useAuth0();
//   const { loginWithRedirect } = useAuth0();
//   const [showPassword, SetShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//   const [formData, setFormData] = useState({
//     email: localStorage.getItem("email") || "",
//     password: "",
//   });

//   const checkToken = () => {
//     if (localStorage.getItem("token") && (isLogged || isAuthenticated)) {
//       dispatch(setIsLogged(
//         parseJwt(localStorage.getItem("token")).exp * 1000 > Date.now()
//       ));
//       navigate("dashboard");
//     }
//     if (localStorage.getItem("token") && !isLogged) {
//       dispatch(setIsLogged(false));
//     }
//   };

//     const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     const validationErrors = validateLogin({ ...formData, [name]: value });
//     setErrors(validationErrors);
//   };

//   useEffect(() => {
//     checkToken();
//   }, [isLogged, isAuthenticated]);

//   useEffect(() => {
//     const validationErrors = validateLogin(formData);
//     setErrors(validationErrors);
//     setIsButtonDisabled(!Object.keys(validationErrors));
//   }, [formData]);

//   const handleLoginSubmit = async (event) => {
//     event.preventDefault();
      
//     const validationErrors = validateLogin({...formData});
//     setErrors(validationErrors);
//     if (Object.keys(validationErrors)) {
//     try {
//       const token = await loginUser(formData);

//       localStorage.setItem("token", token);

//       dispatch(setInfoUserLogged(
//         localStorage.getItem("token") && parseJwt(localStorage.getItem("token"))
//       ));
      
//       Swal.fire({
//         icon: "success",
//         title: "Inicio de sesión exitoso",
//         text: "Bienvenido a la plataforma",
//         showConfirmButton: true,
//       });
        
//       dispatch(setIsLogged(
//         parseJwt(localStorage.getItem("token")).exp * 1000 > Date.now()
//       ));
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Error al iniciar sesión completa las credenciales",
//         showConfirmButton: true,
//       });
//     }
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Por favor, corrige ingresa las credenciales correctas",
//         showConfirmButton: true,
//       });
//     }
//   };




//   return (
//     <div className="content-loging w-full">
//       <form className="bg-gradient-to-r from-blue-400 to-blue-500 p-8 rounded-xl w-auto lg:w-[450px] items-center justify-center shadow-2xl shadow-blue-800"
//       onSubmit={handleLoginSubmit}
//       >
//         <button className="bg-blue-300 hover:bg-blue-700 text-gray-300 font-bold rounded-md shadow-lg uppercase m-2">
//           <Link to="/header">
//             <FaArrowLeft className="w-7 h-7 text-white" />
//           </Link>
//         </button>
//         <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
//           Iniciar <span className="text-primary">sesión</span>
//         </h1>

//         <div className="relative mb-4">
//           <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
//           <input
//             type="email"
//             name="email"
//             className="py-3 pl-8 pr-8 bg-secondary-900 w-full outline-none rounded-lg focus:border focus:border-primary"
//             placeholder="Correo electrónico"
//             value={formData.email}
//             onChange={handleChange}
//              autoComplete="username"
//           />
//           <IoMdClose
//             className="absolute top-1/2 -translate-y-1/2 right-2 text-primary hover:cursor-pointer"
//             onClick={() => setFormData({ ...formData, email: "" })}
//           />
//         </div>
//           {errors.email && <span className=" flex items-center justify-center font-bold text-red-600 mb-4">{errors.email}</span>}

//         <div className="relative mb-8 flex items-center justify-center">
//           <RiLock2Line className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             className="py-3 pl-8 pr-8 bg-secondary-900 w-full outline-none rounded-lg focus:border focus:border-primary shadoe"
//             placeholder="Contraseña"
//             value={formData.password}
//             onChange={handleChange}
//              autoComplete="current-password"
//           />
//           {showPassword ? (
//             <LuEye
//               onClick={() => SetShowPassword(!showPassword)}
//               className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
//             />
//           ) : (
//             <LuEyeOff
//               onClick={() => SetShowPassword(!showPassword)}
//               className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
//             />
//           )}
//         </div>
//           {errors.password && <span className=" flex items-center justify-center  font-bold text-red-600 mb-6 ">{errors.password}</span>}

//         <div>
//           <input
//             type="submit"
//             className="bg-s300 text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:text-gray-100 transition-colors"
//             value="Iniciar Sesion"
//             disabled={isButtonDisabled}
//           />
//         </div>

//         <p className="text-black py-3 text-center">
//           O Ingresa con tu cuenta de Google:
//         </p>
//         <div className="flex items-center justify-center">
//           <button
//             className="bg-gray-300 flex items-center justify-center mx-4 gap-2 bg-secondary-900 w-14 h-14 rounded-full mb-5 text-gray-300 hover:bg-blue-900"
//             onClick={() => loginWithRedirect()}
//           >
//             <FcGoogle className="w-9 h-9" />
//           </button>
//         </div>

//         <div className="flex flex-col flex-gap-4 items-center">
//           <Link to="/auth/olvide-password" className="hover:text-primary transition-colors">
//             ¿Olvidaste tu contraseña?
//           </Link>
//           <span className="flex items-center gap-2">
//             ¿No tienes cuenta?
//             <Link to="/auth/registro" className="text-primary hover:text-gray-100 transition-colors">
//               Registrate
//             </Link>
//           </span>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;


// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import Swal from "sweetalert2";

// /* icons */
// import { RiMailLine, RiLock2Line } from "react-icons/ri";
// import { IoMdClose } from "react-icons/io";
// import { LuEye, LuEyeOff } from "react-icons/lu";
// import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";
// import { FaArrowLeft } from "react-icons/fa6";

// /* services, helpers and actions */
// import loginUser from "../../services/auth/requestLogin";
// import parseJwt from "../../helpers/parseJwt";
// import { validateLogin } from "../../utils/validateImputs";
// import {
//   setIsLogged,
//   setInfoUserLogged
// } from "../../redux/actions/index";

// import "./Conten.css";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isLogged = useSelector((state) => state.isLogged);
//   const { isAuthenticated, loginWithRedirect } = useAuth0();
//   const [showPassword, SetShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//   const [isSocialLogin, setIsSocialLogin] = useState(false); // Track if a social login is being used
//   const [formData, setFormData] = useState({
//     email: localStorage.getItem("email") || "",
//     password: "",
//   });

//   const checkToken = () => {
//     if (localStorage.getItem("token") && (isLogged || isAuthenticated)) {
//       dispatch(setIsLogged(
//         parseJwt(localStorage.getItem("token")).exp * 1000 > Date.now()
//       ));
//       navigate("dashboard");
//     }
//     if (localStorage.getItem("token") && !isLogged) {
//       dispatch(setIsLogged(false));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     const validationErrors = validateLogin({ ...formData, [name]: value });
//     setErrors(validationErrors);
//   };

//   useEffect(() => {
//     checkToken();
//   }, [isLogged, isAuthenticated]);

//   useEffect(() => {
//     const validationErrors = validateLogin(formData);
//     setErrors(validationErrors);
//     setIsButtonDisabled(!Object.keys(validationErrors).length);
//   }, [formData]);

//   const handleLoginSubmit = async (event) => {
//     event.preventDefault();
//     if (isSocialLogin) return; // Prevent local login logic if a social login is used

//     const validationErrors = validateLogin({ ...formData });
//     setErrors(validationErrors);
//     if (!Object.keys(validationErrors).length) {
//       try {
//         const token = await loginUser(formData);

//         localStorage.setItem("token", token);

//         dispatch(setInfoUserLogged(
//           localStorage.getItem("token") && parseJwt(localStorage.getItem("token"))
//         ));

//         Swal.fire({
//           icon: "success",
//           title: "Inicio de sesión exitoso",
//           text: "Bienvenido a la plataforma",
//           showConfirmButton: true,
//         });

//         dispatch(setIsLogged(
//           parseJwt(localStorage.getItem("token")).exp * 1000 > Date.now()
//         ));
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Error al iniciar sesión. Completa las credenciales correctamente",
//           showConfirmButton: true,
//         });
//       }
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Por favor, corrige e ingresa las credenciales correctas",
//         showConfirmButton: true,
//       });
//     }
//   };

//   const handleGoogleLogin = () => {
//     setIsSocialLogin(true);
//     loginWithRedirect({ connection: 'google-oauth2' });
//   };

//   const handleGitHubLogin = () => {
//     setIsSocialLogin(true);
//     loginWithRedirect({ connection: 'github' });
//   };

//   return (
//     <div className="content-loging w-full">
//       <form className="bg-gradient-to-r from-blue-400 to-blue-500 p-8 rounded-xl w-auto lg:w-[450px] items-center justify-center shadow-2xl shadow-blue-800 shadow-xl shadow-black py-3-"
//         onSubmit={handleLoginSubmit}
//       >
//         <button className="bg-blue-300 hover:bg-blue-700 text-gray-300 font-bold rounded-md shadow-lg uppercase m-2">
//           <Link to="/header">
//             <FaArrowLeft className="w-7 h-7 text-white" />
//           </Link>
//         </button>
//         <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
//           Iniciar <span className="text-primary">sesión</span>
//         </h1>

//         <div className="relative mb-4">
//           <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
//           <input
//             type="email"
//             name="email"
//             className="shadow-md shadow-black py-3 pl-8 pr-8 bg-secondary-900 w-full outline-none rounded-lg focus:border focus:border-primary"
//             placeholder="Correo electrónico"
//             value={formData.email}
//             onChange={handleChange}
//             autoComplete="username"
//           />
//           <IoMdClose
//             className="absolute top-1/2 -translate-y-1/2 right-2 text-primary hover:cursor-pointer"
//             onClick={() => setFormData({ ...formData, email: "" })}
//           />
//         </div>
//         {errors.email && <span className="flex items-center justify-center font-bold text-red-600 mb-4 w-full">{errors.email}</span>}

//         <div className="relative mb-8 flex items-center justify-center">
//           <RiLock2Line className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             className=" shadow-md shadow-black py-3 pl-8 pr-8 bg-secondary-900 w-full outline-none rounded-lg focus:border focus:border-primary shadow"
//             placeholder="Contraseña"
//             value={formData.password}
//             onChange={handleChange}
//             autoComplete="current-password"
//           />
//           {showPassword ? (
//             <LuEye
//               onClick={() => SetShowPassword(!showPassword)}
//               className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
//             />
//           ) : (
//             <LuEyeOff
//               onClick={() => SetShowPassword(!showPassword)}
//               className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
//             />
//           )}
//         </div>
//         {errors.password && <span className="flex items-center justify-center font-bold text-red-600 mb-6 ">{errors.password}</span>}

//         <div>
//           <input
//             type="submit"
//             className=" shadow-md shadow-black bg-s300 text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:text-gray-100 transition-colors"
//             value="Iniciar Sesion"
//             disabled={!isButtonDisabled }
//           />
//         </div>

//         <p className="text-black py-3 text-center">
//           O Ingresa con tu cuenta de Google o GitHub:
//         </p>
//         <div className="flex items-center justify-center">
//           <button
//             type="button" // Ensure button does not submit the form
//             className="bg-gray-300 flex items-center justify-center mx-4 gap-2 bg-secondary-900 w-14 h-14 rounded-full mb-5 text-gray-300 hover:bg-blue-900"
//             onClick={handleGoogleLogin}
//           >
//             <FcGoogle className="w-9 h-9" />
//           </button>
//           <button
//             type="button" // Ensure button does not submit the form
//             className="bg-gray-300 flex items-center justify-center mx-4 gap-2 bg-secondary-900 w-14 h-14 rounded-full mb-5  hover:bg-blue-900 hover:text-white"
//             onClick={handleGitHubLogin}
//           >
//             <FaGithub className="w-9 h-9" />
//           </button>
//         </div>

//         <div className="flex flex-col flex-gap-4 items-center">
//            <Link to="/auth/olvide-password" className="hover:text-primary transition-colors">
//              ¿Olvidaste tu contraseña?
//            </Link>
//            <span className="flex items-center gap-2">
//              ¿No tienes cuenta?
//              <Link to="/auth/registro" className="text-primary hover:text-gray-100 transition-colors">
//                Registrate
//              </Link>
//            </span>
//          </div>

//       </form>
//     </div>
//   );
// };

// export default Login;


import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

/* icons */
import { RiMailLine, RiLock2Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

/* services, helpers and actions */
import loginUser from "../../services/auth/requestLogin";
import parseJwt from "../../helpers/parseJwt";
import { validateLogin } from "../../utils/validateImputs";
import {
  setIsLogged,
  setInfoUserLogged
} from "../../redux/actions/index";

import "./Conten.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.isLogged);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [showPassword, SetShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSocialLogin, setIsSocialLogin] = useState(false); // Track if a social login is being used
  const [formData, setFormData] = useState({
    email: localStorage.getItem("email") || "",
    password: "",
  });

  const checkToken = () => {
    if (localStorage.getItem("token") && (isLogged || isAuthenticated)) {
      dispatch(setIsLogged(
        parseJwt(localStorage.getItem("token")).exp * 1000 > Date.now()
      ));
      navigate("dashboard");
    }
    if (localStorage.getItem("token") && !isLogged) {
      dispatch(setIsLogged(false));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const validationErrors = validateLogin({ ...formData, [name]: value });
    setErrors(validationErrors);
  };

  useEffect(() => {
    checkToken();
  }, [isLogged, isAuthenticated]);

  useEffect(() => {
    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);
    setIsButtonDisabled(!Object.keys(validationErrors).length);
  }, [formData]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (isSocialLogin) return; // Prevent local login logic if a social login is used

    const validationErrors = validateLogin({ ...formData });
    setErrors(validationErrors);
    if (!Object.keys(validationErrors).length) {
      try {
        const token = await loginUser(formData);

        localStorage.setItem("token", token);

        dispatch(setInfoUserLogged(
          localStorage.getItem("token") && parseJwt(localStorage.getItem("token"))
        ));

        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: "Bienvenido a la plataforma",
          showConfirmButton: true,
        });

        dispatch(setIsLogged(
          parseJwt(localStorage.getItem("token")).exp * 1000 > Date.now()
        ));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al iniciar sesión. Completa las credenciales correctamente",
          showConfirmButton: true,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, corrige e ingresa las credenciales correctas",
        showConfirmButton: true,
      });
    }
  };

  const handleGoogleLogin = () => {
    setIsSocialLogin(true);
    loginWithRedirect({ connection: 'google-oauth2' });
  };

  const handleGitHubLogin = () => {
    setIsSocialLogin(true);
    loginWithRedirect({ connection: 'github' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen content-loging w-full">
      <form className="bg-gradient-to-r from-blue-400 to-blue-500 p-8 rounded-xl w-full max-w-lg shadow-2xl"
        onSubmit={handleLoginSubmit}
      >
        <button className="bg-blue-300 hover:bg-blue-700 text-gray-300 font-bold rounded-md shadow-lg uppercase m-2">
          <Link to="/header">
            <FaArrowLeft className="w-7 h-7 text-white" />
          </Link>
        </button>
        <h1 className="text-3xl text-center uppercase font-bold tracking-widest text-white mb-8">
          Iniciar <span className="text-primary">sesión</span>
        </h1>

        <div className="relative mb-4">
          <RiMailLine className="absolute top-1/2 transform -translate-y-1/2 left-2 text-primary" />
          <input
            type="email"
            name="email"
            className="shadow-md py-3 pl-8 pr-8 bg-secondary-900 w-full outline-none rounded-lg focus:border focus:border-primary"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            autoComplete="username"
          />
          <IoMdClose
            className="absolute top-1/2 transform -translate-y-1/2 right-2 text-primary hover:cursor-pointer"
            onClick={() => setFormData({ ...formData, email: "" })}
          />
        </div>
        {errors.email && <span className="flex items-center justify-center font-bold text-red-600 mb-4 w-full">{errors.email}</span>}

        <div className="relative mb-8 flex items-center justify-center">
          <RiLock2Line className="absolute top-1/2 transform -translate-y-1/2 left-2 text-primary" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="shadow-md py-3 pl-8 pr-8 bg-secondary-900 w-full outline-none rounded-lg focus:border focus:border-primary"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {showPassword ? (
            <LuEye
              onClick={() => SetShowPassword(!showPassword)}
              className="absolute top-1/2 transform -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
            />
          ) : (
            <LuEyeOff
              onClick={() => SetShowPassword(!showPassword)}
              className="absolute top-1/2 transform -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
            />
          )}
        </div>
        {errors.password && <span className="flex items-center justify-center font-bold text-red-600 mb-6">{errors.password}</span>}

        <div>
          <input
            type="submit"
            className="bg-s300 text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:text-gray-100 transition-colors"
            value="Iniciar Sesion"
            disabled={!isButtonDisabled}
          />
        </div>

        <p className="text-black py-3 text-center">
          O Ingresa con tu cuenta de Google o GitHub:
        </p>
        <div className="flex items-center justify-center">
          <button
            type="button" // Ensure button does not submit the form
            className="bg-gray-300 flex items-center justify-center mx-4 gap-2 bg-secondary-900 w-14 h-14 rounded-full mb-5 text-gray-300 hover:bg-blue-900"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="w-9 h-9" />
          </button>
          <button
            type="button" // Ensure button does not submit the form
            className="bg-gray-300 flex items-center justify-center mx-4 gap-2 bg-secondary-900 w-14 h-14 rounded-full mb-5 hover:bg-blue-900 hover:text-white"
            onClick={handleGitHubLogin}
          >
            <FaGithub className="w-9 h-9" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <Link to="/auth/olvide-password" className="hover:text-primary transition-colors">
            ¿Olvidaste tu contraseña?
          </Link>
          <span className="flex items-center gap-2">
            ¿No tienes cuenta?
            <Link to="/auth/registro" className="text-primary hover:text-gray-100 transition-colors">
              Registrate
            </Link>
          </span>
        </div>

      </form>
    </div>
  );
};

export default Login;
