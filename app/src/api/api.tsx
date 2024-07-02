import axios from 'axios';

export const fetchStudents = async () => {
  const response = await axios.get('/sampleStdentData.json');
  return response.data;
};