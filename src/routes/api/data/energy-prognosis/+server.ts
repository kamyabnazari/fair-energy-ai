import { json } from '@sveltejs/kit';

export async function GET() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const producedData = months.map(() => Math.floor(Math.random() * 100));
    const consumedData = months.map(() => Math.floor(Math.random() * 100));

    return json({
        labels: months,
        datasets: [
            {
                label: 'Energy Produced',
                data: producedData,
                fill: false,
                borderColor: 'rgb(75, 162, 192)',
                tension: 0.1
            },
            {
                label: 'Energy Consumed',
                data: consumedData,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }
        ]
    });
}
