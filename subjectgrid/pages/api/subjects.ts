import path from 'path';
import { promises as fs } from 'fs';

interface Subject {
    id: number;
    name: string;
    age: number;
    gender: string;
    diagnosisDate: string;
    status: string;
}
  

export default async function handler(req,res){
    const {sortField, sortOrder, gender, status} = req.query;

    const jsonDirectory = path.join(process.cwd(), 'public', 'mockData');
    const fileContents = await fs.readFile(jsonDirectory + '/subjects.json', 'utf8');
    
    let subjects: Subject[] = JSON.parse(fileContents);

    if (gender) {
        subjects = subjects.filter((subject) => subject.gender === gender);
    }
    if (status) {
    subjects = subjects.filter((subject) => subject.status === status);
    }

    res.status(200).json(JSON.parse(fileContents));
}