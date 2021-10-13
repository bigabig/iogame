import {useEffect, useState} from "react";
import axios from "axios";
import Record, {RecordType} from "./record";

export default function RecordList() {
    const [state, setState] = useState<RecordType[]>([]);

    // This method will get the data from the database.
    useEffect( () => {
        axios
            .get("http://localhost:5000/record/")
            .then((response) => {
                console.log(response);
                setState(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    // This method will delete a record based on the method
    const deleteRecord = (id: number) => {
        axios.delete("http://localhost:5000/" + id).then((response) => {
            console.log(response.data);
        });

        setState(state.filter((el) => el.id !== id));
    }

    // This method will map out the users on the table
    const recordList = () => {
        return state.map((currentrecord) => {
            return (
                <Record person_name={currentrecord.person_name}
                        person_position={currentrecord.person_position}
                        person_level={currentrecord.person_level}
                        id={currentrecord.id}
                        deleteRecord={deleteRecord} />
            );
        });
    }

    // This following section will display the table with the records of individuals.
    return (
        <div>
            <h3>Record List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Level</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}