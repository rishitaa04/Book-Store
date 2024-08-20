import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const LogIn = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  }

  const handleSubmit = async () => {
    try {
      if (Values.username === "" || Values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post("http://localhost:1000/api/v1/login", Values);

        dispatch(authActions.Login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='min-h-screen flex flex-col bg-zinc-900'>
      <div className='flex-grow flex items-center justify-center'>
        <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
          <p className='text-zinc-200 text-xl'>Log input</p>
          <div className='mt-4'>
            <div>
              <label htmlFor='' className='text-zinc-400'>
                Username
              </label>
              <input
                type='text'
                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                placeholder='username'
                name='username'
                required
                onChange={change}
                value={Values.username}
              />
            </div>
            <div className='mt-4'>
              <label htmlFor='' className='text-zinc-400'>
                Password
              </label>
              <input
                type='password'
                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                placeholder='password'
                name='password'
                required
                onChange={change}
                value={Values.password}
              />
            </div>

            <div className='mt-4'>
              <button
                className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
            <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
              Or
            </p>
            <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
              Don't have an account? &nbsp;
              <Link to="/SignUp" className='hover:text-blue-500'>
                <u>Sign Up</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
