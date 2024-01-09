

export default function Goal(props) {

    return (
        <div>
            <p className="text-xl font-bold">{props.title} <span className="text-base font-normal rounded-xl py-2 px-2 bg-slate-600">edit</span></p>
            <p>{props.content}</p>
            <p className="font-bold">Goal value: ${Number(props.value).toFixed(2)}</p>
            <p>Start Date: {props.startDate.slice(0, 10)}</p>
            <p>End Date: </p>
            <br />
        </div>
    )
}