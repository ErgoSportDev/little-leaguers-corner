
const Introduction = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Welcome to Ergo Sport</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Community</h3>
            <p className="text-gray-600">Building strong friendships and team spirit through sports activities.</p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Movement</h3>
            <p className="text-gray-600">Developing physical skills and healthy habits for life.</p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Play</h3>
            <p className="text-gray-600">Making sports fun and enjoyable for every child.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
