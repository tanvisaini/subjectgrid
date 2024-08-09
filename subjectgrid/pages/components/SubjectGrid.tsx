"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Th, Td, Tr, Thead, Tbody, Select } from '@mantine/core';

interface Subject {
  id: number;
  name: string;
  age: number;
  gender: string;
  diagnosisDate: string;
  status: string;
}

const SubjectGrid = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/subjects')
    .then((response) => response.json())
    .then((data) => {
      setSubjects(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error('error fetching subjects:', error);
      setLoading(false);
    })
  }, []);

  if (loading) return <div> loading.. </div>;

  return (
    <div> 
      <h1> subjects: </h1>
    {subjects.map(subject => (
      <h1 key={subject.id}>{subject.name}</h1>
    ))}
    </div>

  );

};

export default SubjectGrid;