import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { addUser } from '../Store/Slices/Userslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setemail] = useState('Email id');
    const [password, setpassword] = useState('Password');
    const [err, seterr] = useState();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const loginSubmit = async () => {
        try {
            let res = await axios.post("http://localhost:5000/login", { email, password }, {
                withCredentials: true
            })
            dispatch(addUser(res.data));
            navigate("/")
        } catch (err) {
            seterr(err?.response?.data || "some things is wrong");
        };
    }
    const navtosignup = () => {
        navigate("/SignUp")
    }
    return (
        <div className='flex justify-center mt-5'>
            <div className="card bg-neutral text-neutral-content w-96">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Login</h2>

                    <h3 className='ml-3.5 self-start text-left w-full'>Email Address</h3>
                    <label className="input flex items-center">
                        <svg className="h-[1em] opacity-50 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input className='text-black' type="email" placeholder={email} onChange={(e) => setemail(e.target.value)} />
                    </label>

                    <h3 className='ml-3.5 self-start text-left w-full'>Password</h3>
                    <label className="input flex items-center">
                        <svg className="h-[1em] opacity-50 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input className='text-black' type="password" placeholder={password} onChange={(e) => setpassword(e.target.value)} />
                    </label>
                    {err && <p className=' self-start ml-1 text-red-700'>{err}</p>}
                    <h4 className='self-end mr-2'>Forget password</h4>

                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={navtosignup}>Sign Up</button>
                        <button className="btn btn-ghost border-cyan-400" onClick={loginSubmit}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
