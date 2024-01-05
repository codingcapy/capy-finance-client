


export default function Liability(props) {

    return (
        <div>
            <p className="text-xl font-boldpx-5">{props.title}</p>
            <p>{props.content}</p>
            <p>Balance: ${Number(props.value).toFixed(2)}</p>
            <p>Start Date: {props.startDate.slice(0, 10)}</p>
            <p>End Date: {props.endDate && props.endDate.slice(0, 10)}</p>
            <br />
        </div>
    )
}