import { Link } from "react-router-dom";

export type RecordType = {
    person_name: string,
    person_position: string,
    person_level: string,
    id: number,
    deleteRecord: (arg0: number) => void,
}

export default function Record(props: RecordType) {
    return (
        <tr>
            <td>{props.person_name}</td>
            <td>{props.person_position}</td>
            <td>{props.person_level}</td>
            <td>
                <Link to={"/edit/" + props.id}>Edit</Link> |
                <a
                    href="/"
                    onClick={() => {
                        props.deleteRecord(props.id);
                    }}
                >
                    Delete
                </a>
            </td>
        </tr>
    );
}