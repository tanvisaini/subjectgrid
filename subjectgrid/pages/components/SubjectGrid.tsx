"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Select, Group, Modal, TextInput, Pagination } from '@mantine/core';
import { DateInput, DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconPencilMinus } from '@tabler/icons-react';
import { Subject } from '../../types/types';

const SubjectGrid = () => {
  // query and other var consts
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [gender, setGender] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [opened, {open, close}] = useDisclosure(false);
  const [currentPage, setCurrentPage] = useState(1);
  const[finalSearch, setFinalSearch] = useState<string>('');
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  //mocked api call
  useEffect(() => {
    const fetchSubjects = async () => {
      const query = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: pageSize.toString()
      });
      //appending query filters based on user's interaction
      if (gender) query.append('gender', gender);
      if (status) query.append('status', status);
      if (finalSearch) query.append('searchTerm', finalSearch);
      if (date) query.append('date', date.toISOString().split('T')[0]);
      if (sortBy) query.append('sortBy', sortBy);

      try {
        const response = await axios.get(`/api/subjects?${query.toString()}`);
        setSubjects(response.data.subjects);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [gender, date, sortBy, finalSearch, status, currentPage]);

  if (loading) return <div>loading...</div>;

  //rerendering and fetching api call only if user finished typing searchTerm by entering
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key == 'Enter'){
      setCurrentPage(1);
      setFinalSearch(searchTerm);
    }; 
  };

  //subjectgrid setup
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

  //shorthand clear to erase all filters user clicked on
  const handleClear = () =>{
    setGender(null);
    setSortBy(null);
    setDate(null);
    setStatus(null);
    setSearchTerm('');
    setFinalSearch('');
    setCurrentPage(1);
  };

  return (
    <div className="mx-24 ">
      {/* interactive filtering buttons */}
      <Group className="m-2" justify="space-between" preventGrowOverflow={false} grow wrap="nowrap" >
        <TextInput
            placeholder="Search by Name"
            variant="filled"
            radius="xl"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            onKeyPress={handleKeyPress}
            className="pt-6 w-2/4"
          />
        <Select className=""  label="Sort By"
              placeholder="Sort by Category" 
              searchable
              nothingFoundMessage="Nothing found..."
              data={['Age', 'Diagnosis Date', 'Name']} 
              value={sortBy}
              onChange={(_value, option) => setSortBy(_value)} /> 
        <Button className="mt-6" leftSection={<IconFilter size={13} />} onClick={open}> All Filters </Button>
        <Button leftSection={<IconPencilMinus size={13} />} onClick={handleClear} className="mt-6 " >  Clear </Button> 
      </Group>
        <Modal opened={opened} onClose={close} closeOnClickOutside transitionProps={{ transition: 'rotate-left' }} centered title="Filter Subjects">
          <Select 
            label="Gender"
            placeholder="Select Gender Filter"
            value={gender}
            searchable
            nothingFoundMessage="Nothing found..."
            onChange={(_value, option) => setGender(_value)} 
            data={[{value:'', label: 'All'}, 'Female', 'Male', 'Unknown']} />
          <Select 
            label="Status"
            placeholder="Select Status Filter"
            value={status}
            searchable
            nothingFoundMessage="Nothing found..."
            onChange={(_value, option) => setStatus(_value)}
            data={[
              {value:'', label:'All'}, 
              'Screening', 'Enrolled', 'Active', 
              'Withdrawn', 'Discontinued', 'Randomized', 'Completed']} />
          <DatePickerInput clearable 
            label="Date"
            placeholder="Select Date Filter"
            valueFormat="YYYY-MM-DD"
            value={date}
            onChange={(value) => setDate(value)} />
        </Modal>
      {/* subject grid display and pagination */}
      <div className="flex border mb-5 rounded-lg">
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
      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={setCurrentPage}
        className="mt-4"
      />
    </div>
  );
};

export default SubjectGrid;