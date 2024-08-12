import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { Subject } from '../../types/types'; 

export default async function handler(req: NextApiRequest,res: NextApiResponse){
    try {
        if (req.method !== "GET") { //invalid api call format error catching
            return res.status(405).json({ error: `Method ${req.method} Not Allowed!!` });
        }
        const {sortBy, sortOrder, gender, status, date, searchTerm, page, pageSize} = req.query;

        const jsonDirectory = path.join(process.cwd(), 'public', 'mockData');
        let fileContents;
        try {
            fileContents = await fs.readFile(jsonDirectory + '/subjects.json', 'utf8');
        } catch (error) {
            return res.status(404).json({ error: 'API not found' });
        }

        let subjects: Subject[] = JSON.parse(fileContents);

        //filtering json data
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
        if (sortBy) { //potential to add asc and desc customization
            subjects = subjects.sort((a: any, b: any) => {
            if (sortBy === 'Name') return a.name.localeCompare(b.name);
            if (sortBy === 'Age') return a.age - b.age;
            if (sortBy === 'Diagnosis Date')
                return new Date(a.diagnosisDate).getTime() - new Date(b.diagnosisDate).getTime();
            return 0;
            });
        }

        //pagination consts
        const totalCount = subjects.length;
        const pageNumber = parseInt(page as string) || 1;
        const itemsPerPage = parseInt(pageSize as string) || 10;
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedSubjects = subjects.slice(startIndex, endIndex);

        res.status(200).json({
        subjects: paginatedSubjects,
        totalCount,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalCount / itemsPerPage)
        });

    } catch (error) { 
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}