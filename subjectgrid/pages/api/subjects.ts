import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

interface Subject {
    id: number;
    name: string;
    age: number;
    gender: string;
    diagnosisDate: string;
    status: string;
}
  

export default async function handler(req: NextApiRequest,res: NextApiResponse){
    const {sortBy, sortOrder, gender, status} = req.query;

    const jsonDirectory = path.join(process.cwd(), 'public', 'mockData');
    const fileContents = await fs.readFile(jsonDirectory + '/subjects.json', 'utf8');

    let subjects: Subject[] = JSON.parse(fileContents);

    if (gender) {
        subjects = subjects.filter((subject) => subject.gender === gender);
    }
    if (status) {
    subjects = subjects.filter((subject) => subject.status === status);
    }
    if (sortBy) {
        subjects = subjects.sort((a: any, b: any) => {
          if (sortBy === 'Name') return a.name.localeCompare(b.name);
          if (sortBy === 'Age') return a.age - b.age;
          if (sortBy === 'Diagnosis Date')
            return new Date(a.diagnosisDate).getTime() - new Date(b.diagnosisDate).getTime();
          return 0;
        });
    }

    res.status(200).json(subjects);
}