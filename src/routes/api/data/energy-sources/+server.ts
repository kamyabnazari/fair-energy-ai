import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        // Mock data for energy resource distribution
        const energyResourceDistribution = [
            { label: 'Solar', value: 40 },
            { label: 'Wind', value: 30 },
            { label: 'Hydro', value: 15 },
            { label: 'Fossil Fuels', value: 10 },
            { label: 'Nuclear', value: 5 }
        ];

        // Transforming data to match PieChart component's expected format
        const data = {
            labels: energyResourceDistribution.map(item => item.label),
            values: energyResourceDistribution.map(item => item.value)
        };

        return json(data);
    } catch (e) {
        console.error(e);
        return json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
