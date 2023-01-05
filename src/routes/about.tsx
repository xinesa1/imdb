const About: React.FC = () => {
  return (
    <div className="max-w-[1280px] mx-auto py-4 relative px-2">
      <h1 className="text-3xl text-center">Sayfa hakkında</h1>
      Bu sayfa {""}
      <mark>
        <a href="//remix.run">Remix.run</a>
      </mark>{" "}
      ile oluşturulmuştur.
      <br />
      <mark>
        <a href="//themoviedb.org">TheMovieDB</a>
      </mark>{" "}
      verileri kullanılmıştır.
      <br />
      <mark>
        <a href="//tailwindcss.com">TailwindCSS</a>
      </mark>{" "}
      ile tasarlanmıştır.
      <br />
    </div>
  );
};

export default About;
