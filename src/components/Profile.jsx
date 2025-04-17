import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const user = useSelector((store) => store.User);
  const nav = useNavigate();
  const editpagenav = () => {
    nav('/EditProfile');
  };

  return (
    user && (
      <div className=" flex justify-center mt-2 bg-base-200">
        <div className="card bg-neutral text-neutral-content w-96">
          <div className="card-body items-center text-center">

            {/* Edit button */}
            <button
              onClick={editpagenav}
              className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition"
            >
              Edit
            </button>

            {/* Profile image */}
            <div className="flex justify-center mb-4">
              <img
                src={user.photo}
                alt="User Avatar"
                className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
              />
            </div>

            {/* Profile heading */}
            <h2 className="text-2xl font-bold mb-4">Profile</h2>

            {/* User Info - Vertical Stack */}
            <div className="space-y-2 text-left w-full">
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>About:</strong> {user.about}</p>
              <p><strong>Member Since:</strong> </p>
              <div>
                <strong>Skills:</strong>
                <ul className="list-disc ml-6 mt-1">
                {Array.isArray(user.skills) && user.skills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  );
};

export default Profile;

