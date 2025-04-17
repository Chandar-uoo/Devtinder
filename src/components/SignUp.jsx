import axios from 'axios';
import React, { useState } from 'react';
import { BaseURL } from '../utils/Constants';
import { addUser } from '../Store/Slices/Userslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [firstName, setFirstName] = useState('hemsrinia');
    const [lastName, setLastName] = useState('chandru');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [photo, setphoto] = useState('');
    const [gender, setGender] = useState('');
    const [about, setAbout] = useState('');
    const [skills, setSkills] = useState('lovely cook, drawing'); // comma-separated skills
    const [error, setError] = useState('');
    const signup = async () => {
        const skillArray = skills.split(',').map(skill => skill.trim());

        try {
            const res = await axios.post(
                BaseURL + "/signup",
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    age,
                    photo,
                    gender,
                    about,
                    skills: skillArray,
                },
                { withCredentials: true }
            );
            dispatch(addUser(res.data));
            nav("/")
        } catch (err) {
            console.log(err)
           setError(err.message);
            setTimeout(() => {
                setError('')
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-base-200 p-8 rounded-xl shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-6 text-center">Create Account</h2>

                {/* First Name */}
                <label className="form-control w-full mb-4">
                    <span className="label-text">First Name</span>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Last Name */}
                <label className="form-control w-full mb-4">
                    <span className="label-text">Last Name</span>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Email */}
                <label className="form-control w-full mb-4">
                    <span className="label-text">Email</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Password */}
                <label className="form-control w-full mb-4">
                    <span className="label-text">Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Age */}
                <label className="form-control w-full mb-4">
                    <span className="label-text">Age</span>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </label>
                {/* Password */}
                <label className="form-control w-full mb-4">
                    <span className="label-text">Photo URL</span>
                    <input
                        type="text"
                        value={photo}
                        onChange={(e) => setphoto(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </label>
                {/* Gender */}
                <label className="form-control w-full mb-4">
                    <span className="label-text">Gender</span>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="select select-bordered w-full"
                    >
                        <option disabled value="">Select Gender</option>
                        <option value="female">female</option>
                        <option value="male">male</option>
                        <option value="other">Other</option>
                    </select>
                </label>

                {/* About */}
                <label className="form-control w-full mb-4">
                    <span className="label-text">About You</span>
                    <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className="textarea textarea-bordered w-full"
                        rows="3"
                        placeholder="Tell us something about yourself"
                    />
                </label>

                {/* Skills */}
                <label className="form-control w-full mb-6">
                    <span className="label-text">Skills (comma-separated)</span>
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="e.g. cooking, drawing"
                    />
                </label>
                {error && <p className='text-red-500'>{error}</p>}
                <button onClick={signup} className="btn btn-primary w-full">
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default SignUp;
