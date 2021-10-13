import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from 'axios';
import {useHistory, useParams} from "react-router-dom";

type Person = {
    person_name: string,
    person_position: string,
    person_level: string,
    records: string[],
}

type EditRoutParams = {
    id: string,
}

export default function Edit() {
    const history = useHistory();
    let { id } = useParams<EditRoutParams>();
    const [state, setState] = useState<Person>({
        person_name: "",
        person_position: "",
        person_level: "",
        records: [],
    });

    // This will get the record based on the id from the database.
    // This effect only runs once!
    useEffect(() => {
        axios
            .get("http://localhost:5000/record/" + id)
            .then((response) => {
                setState({
                    person_name: response.data.person_name,
                    person_position: response.data.person_position,
                    person_level: response.data.person_level,
                    records: [],
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const onChangePersonName = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            person_name: e.currentTarget.value,
        });
    }

    const onChangePersonPosition = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            person_position: e.target.value,
        });
    }

    const onChangePersonLevel = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            person_level: e.target.value,
        });
    }

    // This function will handle the submission.
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newEditedperson = {
            person_name: state.person_name,
            person_position: state.person_position,
            person_level: state.person_level,
        };
        console.log(newEditedperson);

        // This will send a post request to update the data in the database.
        axios
            .post(
                "http://localhost:5000/update/" + id,
                newEditedperson
            )
            .then((res) => console.log(res.data));

        history.push("/");
    }

    // This following section will display the update-form that takes the input from the user to update the data.
    return (
        <div>
            <h3>Update Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Person's Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={state.person_name}
                        onChange={onChangePersonName}
                    />
                </div>
                <div className="form-group">
                    <label>Position: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={state.person_position}
                        onChange={onChangePersonPosition}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityLow"
                            value="Intern"
                            checked={state.person_level === "Intern"}
                            onChange={onChangePersonLevel}
                        />
                        <label className="form-check-label">Intern</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityMedium"
                            value="Junior"
                            checked={state.person_level === "Junior"}
                            onChange={onChangePersonLevel}
                        />
                        <label className="form-check-label">Junior</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityHigh"
                            value="Senior"
                            checked={state.person_level === "Senior"}
                            onChange={onChangePersonLevel}
                        />
                        <label className="form-check-label">Senior</label>
                    </div>
                </div>
                <br />

                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Record"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}