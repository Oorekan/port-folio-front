export default function ProjectImage({ imageUrl, alt }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img
        className="w-1/2 h-auto filter drop-shadow-xl object-cover cursor-pointer"
        src={
          imageUrl ||
          'https://lesoscarsdelassurancevie.com/images/joomlart/demo/default.jpg'
        }
        alt={alt}
      />
    </div>
  );
}
