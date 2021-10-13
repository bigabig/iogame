import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from 'axios';

export type Person = {
    person_name: string,
    person_position: string,
    person_level: string,
}

export default function Create() {
    const [state, setState] = useState<Person>({
        person_name: "",
        person_position: "",
        person_level: "",
    });

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

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // When post request is sent to the create url, axios will add a new record(newperson) to the database.
        const newperson = {
            person_name: state.person_name,
            person_position: state.person_position,
            person_level: state.person_level,
        };

        axios
            .post("http://localhost:5000/record/add", newperson)
            .then((res) => console.log(res.data));

        // We will empty the state after posting the data to the database
        setState({
            person_name: "",
            person_position: "",
            person_level: "",
        });
    }

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Create New Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Name of the person: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={state.person_name}
                        onChange={onChangePersonName}
                    />
                </div>
                <div className="form-group">
                    <label>Person's position: </label>
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
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create person"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}