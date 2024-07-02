"use client"

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Student } from '../types/students';
import { fetchStudents } from '../api/api';

const StudentListPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);


    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchStudents()
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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Parent</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={index}>
              <TableCell>
                <img src={student.image} alt={`${student.firstName} ${student.lastName}`} style={{ width: 50, height: 50, borderRadius: '50%' }} />
              </TableCell>
              <TableCell>{`${student.firstName} ${student.middleName} ${student.lastName}`}</TableCell>
              <TableCell>{student.dateOfBirth}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>{`${student.parent.firstName} ${student.parent.middleName} ${student.parent.lastName}`}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => alert(`View details for ${student.firstName}`)}>View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentListPage;