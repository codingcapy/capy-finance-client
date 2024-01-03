

export default function PlanPage() {

    return (
        <div>
            <h1 className="text-3xl font-bold text-center py-5 ">Plan Title</h1>
            <p>Plan description</p>
            <p>Chart</p>
            <div>
                <div>Income</div>
                <div>Fixed Expenditure</div>
                <div>Variable Expenditure</div>
                <div>Assets</div>
                <div>Liabilities</div>
            </div>
            <p>Net Monthly Balance</p>
            <p>Net Worth</p>
        </div>
    )
}

// export async function planLoader({params}){
//     const res = await axios.get(`${DOMAIN}/api/v1/plan/:planId`)
// }