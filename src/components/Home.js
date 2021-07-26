import PROFILE from '../assets/PHOTO_PROFIL.png';

export default function Home() {
  return (
    <div className="flex">
      <img
        src={PROFILE}
        alt="Profile"
        className="w-1/3 rounded-full mt-40 ml-40"
      />
      <div className="flex flex-col ml-96 mt-80">
        <h1 className="text-white text-9xl font-bold">Brandon</h1>
        <h1 className="text-white text-9xl m-10 font-bold">Monge</h1>
      </div>
    </div>
  );
}
