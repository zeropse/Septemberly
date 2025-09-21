const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <video
          src="/bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Home;
