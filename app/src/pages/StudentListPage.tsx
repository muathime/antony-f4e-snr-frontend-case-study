"use client"

import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Grid,
  TextField,
} from '@mui/material';
import { Student } from '../types/students';
import api from '../api/api';

const StudentListPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [gradeFilter, setGradeFilter] = useState<string>('');
  const [genderFilter, setGenderFilter] = useState<string>('');
  const [ageFilter, setAgeFilter] = useState<string>(''); // State for age filter input

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10); // Number of students per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchStudents();
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Student[] = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to calculate age from date of birth
  const calculateAge = (dob: string): number => {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    return age;
  };

  // Function to filter students based on filters
  const filteredStudents = students.filter((student) => {
    let isGradeMatch = true;
    let isGenderMatch = true;
    let isAgeMatch = true;

    if (gradeFilter && student.grade !== gradeFilter) {
      isGradeMatch = false;
    }
    if (genderFilter && student.gender !== genderFilter) {
      isGenderMatch = false;
    }
    if (ageFilter !== '') {
      const studentAge = calculateAge(student.dateOfBirth);
      if (studentAge.toString() !== ageFilter) {
        isAgeMatch = false;
      }
    }

    return isGradeMatch && isGenderMatch && isAgeMatch;
  });

  // Pagination logic
  const totalStudents = filteredStudents.length;
  const totalPages = Math.ceil(totalStudents / perPage);
  const indexOfLastStudent = currentPage * perPage;
  const indexOfFirstStudent = indexOfLastStudent - perPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Handlers for pagination
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCurrentPage(event.target.value as number);
  };

  const handleGradeFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGradeFilter(event.target.value as string);
  };

  const handleGenderFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGenderFilter(event.target.value as string);
  };

  const handleAgeFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgeFilter(event.target.value);
  };

  const handleViewDetails = (index: number) => {
    setSelectedStudent(currentStudents[index]);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div>
      <FormControl variant="outlined" style={{ minWidth: 200, marginBottom: 10 }}>
        <InputLabel id="grade-filter-label">Filter by Grade</InputLabel>
        <Select
          labelId="grade-filter-label"
          value={gradeFilter}
          onChange={handleGradeFilterChange}
          label="Filter by Grade"
          fullWidth
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="A">Grade A</MenuItem>
          <MenuItem value="B">Grade B</MenuItem>
          <MenuItem value="C">Grade C</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" style={{ minWidth: 200, marginBottom: 10, marginLeft: 5 }}>
        <InputLabel id="gender-filter-label">Filter by Gender</InputLabel>
        <Select
          labelId="gender-filter-label"
          value={genderFilter}
          onChange={handleGenderFilterChange}
          label="Filter by Gender"
          fullWidth
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" style={{ minWidth: 200, marginBottom: 10, marginLeft: 5 }}>
        <TextField
          type="number"
          label="Filter by Age"
          value={ageFilter}
          onChange={handleAgeFilterChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>

      {/* Student Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Image</Typography> </TableCell>
              <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Name</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Date of Birth</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Gender</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Grade</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Parent</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentStudents.map((student, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img
                    src={student.image}
                    alt={`${student.firstName} ${student.lastName}`}
                    style={{ width: 50, height: 50, borderRadius: '50%' }}
                  />
                </TableCell>
                <TableCell>{`${student.firstName} ${student.middleName} ${student.lastName}`}</TableCell>
                <TableCell>{student.dateOfBirth}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{`${student.parent.firstName} ${student.parent.middleName} ${student.parent.lastName}`}</TableCell>
                <TableCell>
                  <Button variant="contained" sx={{ backgroundColor: "#000" }} onClick={() => handleViewDetails(index)}>
                    <Typography sx={{ fontWeight: 'bold', color: "#EB9E27" }}>View Details</Typography>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box mt={2} display="flex" justifyContent="center">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Box mx={2}>
          Page
          <Select value={currentPage} onChange={handlePageChange}>
            {Array.from(Array(totalPages), (x, index) => (
              <MenuItem key={index} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
          of {totalPages}
        </Box>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Box>

      {/* Student Details Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="xs" PaperProps={{ style: { padding: '20px' } }}>
        <DialogTitle>Student Details</DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Grid container spacing={4}>
              <Grid item>
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <img
                    src={selectedStudent.image}
                    alt={`${selectedStudent.firstName} ${selectedStudent.lastName}`}
                    style={{ width: 100, height: 100, borderRadius: '50%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs>
                <Typography variant="h6">{`${selectedStudent.firstName} ${selectedStudent.middleName} ${selectedStudent.lastName}`}</Typography>
                <Typography variant="body1">
                  <strong>Date of Birth:</strong> {selectedStudent.dateOfBirth}
                </Typography>
                <Typography variant="body1">
                  <strong>Gender:</strong> {selectedStudent.gender}
                </Typography>
                <Typography variant="body1">
                  <strong>Grade:</strong> {selectedStudent.grade}
                </Typography>
                <Typography variant="body1">
                  <strong>Parent:</strong>{' '}
                  {`${selectedStudent.parent.firstName} ${selectedStudent.parent.middleName} ${selectedStudent.parent.lastName}`}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ fontWeight: 'bold', backgroundColor: "#000" }}>
            <Typography sx={{ fontWeight: 'bold', color: "#EB9E27" }}>Close</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StudentListPage;