'use client';
import usePeopleApi from './hooks/usePeopleApi';

export default function Home() {
  const { user, activeIcon, setActiveIcon, Loading, error } = usePeopleApi();

  if (Loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center bg-white bg-opacity-100 p-8 rounded-lg shadow-md w-96 mx-auto mt-10">
      {user ? (
        <>
          <img
            src={user.results[0].picture.large}
            alt="User"
            className="w-48 h-48 rounded-full border-4 border-white shadow-lg"
          />

          <p className="mt-4 text-gray-600">
            {activeIcon === "user" && "Hi, My name is"}
            {activeIcon === "email" && "My email address is"}
            {activeIcon === "dob" && "My birth date is"}
            {activeIcon === "location" && "My address is"}
            {activeIcon === "phone" && "My phone number is"}
            {activeIcon === "password" && "My password is"}
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">
            {activeIcon === "user" &&
              `${user.results[0].name.first} ${user.results[0].name.last}`}
            {activeIcon === "email" && user.results[0].email}
            {activeIcon === "dob" && user.results[0].dob.date.split("T")[0]}
            {activeIcon === "location" &&
              `${user.results[0].location.city}, ${user.results[0].location.country}`}
            {activeIcon === "phone" && user.results[0].phone}
            {activeIcon === "password" && user.results[0].login.password}
          </h2>

          <div className="flex mt-6 space-x-6">
            {["user", "email", "dob", "location", "phone", "password"].map((icon) => (
              <img
                key={icon}
                src="/favicon.ico"
                alt={`${icon} Icon`}
                className={`w-6 h-6 ${activeIcon === icon ? "opacity-100" : "opacity-50"}`}
                onMouseEnter={() => setActiveIcon(icon)}
              />
            ))}
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
