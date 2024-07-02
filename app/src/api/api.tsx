const fetchStudents = async () => {
  const response = await fetch('/sampleStdentData.json');
  return response;
};

const fetchStudentsByIndex = async (index : string) => {
  const response = await fetch('/sampleStdentData.json');
  const data = await response.json();
  return data[index];
};

export default {fetchStudents, fetchStudentsByIndex}