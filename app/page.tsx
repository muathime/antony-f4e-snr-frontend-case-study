import StudentListPage from "./src/pages/StudentListPage";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Student Listing</h1>
      <StudentListPage />
    </div>
  );
};

export default Home;
