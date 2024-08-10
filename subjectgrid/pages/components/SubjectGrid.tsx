"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Select } from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';

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
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [checked, {toggle}] = useDisclosure(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams();
    if (gender) query.append('gender', gender);
    if (sortBy) query.append('sortBy' , sortBy);
    fetch(`/api/subjects?${query.toString()}`)
    .then((response) => response.json())
    .then((data) => {
      setSubjects(data);
      setLoading(false);
      setReset(false);
    })
    .catch((error) => {
      console.error('error fetching subjects:', error);
      setLoading(false);
    })
  }, [gender, sortBy, reset]);

  if (loading) return <div>loading...</div>;

  const rows = subjects.map((subject) => (
    <Table.Tr key={subject.id} >
      <Table.Td>{subject.name}</Table.Td>
      <Table.Td>{subject.age}</Table.Td>
      <Table.Td>{subject.diagnosisDate}</Table.Td>
      <Table.Td>{subject.status}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <h1 className="text-3xl font-poppins p-2 flex justify-center"> Subject List </h1>
      <div class="flex justify-end"> 
        <Button className="mx-2" onClick={() => {setGender("Female")}}> Female </Button>
        <Button className="mx-2" onClick={() => {setGender("Male")}}> Male </Button>
        <Select className="mx-2" label="sort by" 
                placeholder="pick value" 
                data={['Age', 'Diagnosis Date']} 
                value={sortBy ? sortBy.value : null}
                onChange={(_value, option) => setSortBy(_value)} />
      </div>
      <Table verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Age</Table.Th>
            <Table.Th>Diagnosis Date</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default SubjectGrid;