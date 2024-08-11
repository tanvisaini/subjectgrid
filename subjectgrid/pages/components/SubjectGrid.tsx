"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Select, Group, Modal, TextInput } from '@mantine/core';
import { DateInput, DatePickerInput } from '@mantine/dates';
import {useDisclosure} from '@mantine/hooks';
import {IconFilter, IconDeselect} from '@tabler/icons-react';
import {Subject} from '../types/types.tsx';


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
  const [gender, setGender] = useState<string | null>(null);
  const [date, setDate] = useState<date | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [opened, {open, close}] = useDisclosure(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams();
    if (gender) query.append('gender', gender);
    if (status) query.append('status', status);
    if (searchTerm) query.append('searchTerm', searchTerm);
    if (date) query.append('date', date.toISOString().split('T')[0]);
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
  }, [gender, date, sortBy, reset, searchTerm, status]);

  if (loading) return <div>loading...</div>;

  const rows = subjects.map((subject) => (
    <Table.Tr key={subject.id} >
      <Table.Td>{subject.id}</Table.Td>
      <Table.Td>{subject.name}</Table.Td>
      <Table.Td>{subject.age}</Table.Td>
      <Table.Td>{subject.gender}</Table.Td>
      <Table.Td>{subject.diagnosisDate}</Table.Td>
      <Table.Td>{subject.status}</Table.Td>
    </Table.Tr>
  ));

  const handleClear = () =>{
    setGender(null);
    setSortBy(null);
    setDate(null);
    setStatus(null);
    setSearchTerm('');
  }

  return (
    <div className="mx-5">
      <h1 className="text-3xl font-poppins p-2 flex justify-center"> </h1>
      <div class="flex m-2"> 
        <TextInput
            placeholder="Search by Name"
            variant="filled"
            radius="xl"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            className="mx-2 pt-6 w-2/3"
          />
        <Group className="pt-6">
          <Button leftSection={<IconFilter size={14} />} onClick={open}> All Filters </Button>
        </Group>
        <Button onClick={handleClear} className="mt-6 mx-2" > <IconDeselect size={14} /> </Button> 
        <Select className="mx-2" label="Sort By" 
                placeholder="pick value" 
                data={['Age', 'Diagnosis Date', 'Name']} 
                value={sortBy}
                onChange={(_value, option) => setSortBy(_value)} />
        <Modal opened={opened} onClose={close} closeOnClickOutside transitionProps={{ transition: 'rotate-left' }} centered title="Filter Subjects">
          <Select 
            label="Gender"
            placeholder="Select Gender Filter"
            value={gender}
            onChange={(_value, option) => setGender(_value)} 
            data={[{value:'', label: 'All'}, 'Female', 'Male', 'Unknown']} />
          <Select 
            label="Status"
            placeholder="Select Status Filter"
            value={status}
            onChange={(_value, option) => setStatus(_value)}
            data={[{value:'', label:'All'}, 'Screening', 'Enrolled', 'Active', 'Withdrawn', 'Discontinued', 'Randomized', 'Completed']} />
          <DatePickerInput clearable 
            label="Date"
            placeholder="Select Date Filter"
            valueFormat="YYYY-MM-DD"
            value={date}
            onChange={(value) => setDate(value)} />
        </Modal>
      </div>
      <div className="border rounded-lg">
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Subject Id </Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Age</Table.Th>
              <Table.Th>Gender</Table.Th>
              <Table.Th>Diagnosis Date</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default SubjectGrid;