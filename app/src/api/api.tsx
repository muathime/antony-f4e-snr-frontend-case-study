export const fetchStudents = async () => {
  const response = await fetch('/sampleStdentData.json');
  return response;
};