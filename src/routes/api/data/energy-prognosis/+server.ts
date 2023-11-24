import { json } from '@sveltejs/kit';

export async function GET() {
    let baseValue: number = 5000000;

    const fluctuationPercentage = 15; // Fluctuates by up to ±5%
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const fluctuateValue = (base: number) => {
        let fluctuation = base * (fluctuationPercentage / 100);
        return Math.floor(base + fluctuation * (Math.random() - 0.5));
    };

    const producedData = months.map(() => fluctuateValue(baseValue));
    const consumedData = months.map(() => fluctuateValue(baseValue));

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
