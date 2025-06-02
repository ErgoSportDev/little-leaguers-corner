
const Apply = () => {

  return (
    <section className="py-36">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-red-100 via-red-400 to-red-700 flex items-center justify-center">
        <img src="/lovable-uploads/download.svg" />
      </div>

      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-[700] text-black dark:text-white">Jelentkezés</h2>
          <p className="font-light text-gray-100 sm:text-xl dark:text-gray-100">
            Az alábbi adatokat kitöltve jelentkezhetsz az Ergo Sportba.
          </p>
        </div>

        <div className="flex justify-center bg-white/90 backdrop-blur-sm rounded-[1rem] shadow-lg pt-[5rem] pb-[5rem]">
        <iframe
          className="mx-auto max-sm:h-[250rem]"
          src="https://docs.google.com/forms/d/e/1FAIpQLScYIL_TEAdpOyrPaT7NuN0La_X_R8RuggtY-_Bu0aFyMWMO9A/viewform?embedded=true"
          width="640"
          height="3375"
        >
          Betöltés…
        </iframe>
        </div>

      </div>
    </section>
  );
};

export default Apply;
