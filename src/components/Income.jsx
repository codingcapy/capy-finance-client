

export default function Income(props) {

    return (
        <div>
            <p className="text-xl font-boldpx-5">{props.title}</p>
            <p>{props.content}</p>
            <p>Gross Annual Salary: ${Number(props.value).toFixed(2)}</p>
            <p>Gross Monthly Income: ${Number(props.value / 12).toFixed(2)}</p>
            <p className="font-bold">Net Monthly Income: ${Number((props.value - props.value * props.taxRate / 100) / 12).toFixed(2)}</p>
            <p>Start Date: {props.startDate.slice(0, 10)}</p>
            <p>End Date: {props.endDate && props.endDate.slice(0, 10)}</p>
            <br />
        </div>
    )
}