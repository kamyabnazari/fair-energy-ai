import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        // Full mock energy consumption data
        const data = {
            dailyConsumption: [
                { x: 'Day 1', y: 5 },
                { x: 'Day 2', y: 10 },
                { x: 'Day 3', y: 15 },
                { x: 'Day 4', y: 20 },
                { x: 'Day 5', y: 18 },
                { x: 'Day 6', y: 12 },
                { x: 'Day 7', y: 14 },
            ],
            monthlyConsumption: [
                { x: 'Jan', y: 100 },
                { x: 'Feb', y: 120 },
                { x: 'Mar', y: 110 },
                { x: 'Apr', y: 130 },
                { x: 'May', y: 125 },
                { x: 'Jun', y: 105 },
                { x: 'Jul', y: 115 },
                { x: 'Aug', y: 120 },
                { x: 'Sep', y: 110 },
                { x: 'Oct', y: 130 },
                { x: 'Nov', y: 125 },
                { x: 'Dec', y: 105 },
            ],
        };

        return json(data);
    } catch (e) {
        console.error(e);
        return json({ message: 'Internal Server Error' }, { status: 500 });
    }
}