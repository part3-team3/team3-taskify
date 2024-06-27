import axios from '@/lib/axios';

const token ='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk3NywidGVhbUlkIjoiNi0zIiwiaWF0IjoxNzE5MjAyMzAxLCJpc3MiOiJzcC10YXNraWZ5In0.f3VkmboOJR0E4V8GsWakumcqKFy4v0osOOtOj1KVbEM';
export const getDashboard = async ({ page=1, size=5 }) => {
    try {
        const query=`page=${page}&size=${size}`;
        const res= await axios.get(`dashboards?navigationMethod=pagination&${query}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            }
        );
        return(res.data);
    } catch(err) {
        console.log(err)
    }
};