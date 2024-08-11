import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import {Subject} from '../../types/types'; 

export default async function handler(req: NextApiRequest,res: NextApiResponse){
    try {
        if (req.method !== "GET") {
            return res.status(405).json({ error: `Method ${req.method} Not Allowed!!` });
        }
        const {sortBy, sortOrder, gender, status, date, searchTerm} = req.query;

        const jsonDirectory = path.join(process.cwd(), 'public', 'mockData');
        let fileContents;
        try {
            fileContents = await fs.readFile(jsonDirectory + '/subjects.json', 'utf8');
        } catch (error) {
            return res.status(404).json({ error: 'API not found' });
        }

        let subjects: Subject[] = JSON.parse(fileContents);

        if (gender) {
            subjects = subjects.filter((subject) => subject.gender === gender);
        }
        if (status) {
        subjects = subjects.filter((subject) => subject.status === status);
        }
        if (date) {
            subjects = subjects.filter((subject) => subject.diagnosisDate == date);
        }
        if (searchTerm) {
            subjects = subjects.filter((subject) =>
                subject.name.toLowerCase().includes((searchTerm as string).toLowerCase())
            );
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
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}