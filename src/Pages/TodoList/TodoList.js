import { useEffect, useState } from "react";
import API from '../../Config';
import { SpinnerLoading } from "../../Util/SpinnerLoading";
import {Todo} from "./Todo";

export const TodoList = () => {
    const accessToken = localStorage.getItem("JWT");
    const [data, setData] = useState([]);
    const [todo, setTodo] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);


    //GET
    useEffect(() => {
        const fetchTODOs = async () => {
            try {
                const response = await fetch(`${API.getTodos}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                if (!response.ok) { throw new Error("API 호출 실패"); }

                const responseJson = await response.json();

                setData(responseJson.map(todoData => ({
                    id: todoData.id,
                    todo: todoData.todo,
                    isCompleted: todoData.isCompleted,
                    userId: todoData.userId
                })));

                setLoading(false);

            } catch (error) {
                setLoading(false);
                setHttpError(error.message);
            }
        };
        fetchTODOs();
    }, [submitting]);

    //CREATE TODO
    const createTodo = async (event) => {
        if (todo === "") {
            return alert("내용을 입력하세요.");
        }

        event.preventDefault();
        try {
            const response = await fetch(`${API.createTodo}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({
                    todo: todo
                })
            });

            alert("추가되었습니다.");
            setSubmitting(submitting ? false : true);

        } catch (error) {
            alert("실패했습니다.")
        }
    };

    const handleIsComplete = async (event, id, todo) => {
        try {
            const response = await fetch(`${API.updateTodo}/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({
                    todo: todo,
                    isCompleted: event.target.checked
                })
            });
            setSubmitting(submitting ? false : true);
        } catch (error) {
            console.log(error);
            alert("실패했습니다.")
        }
    }

    if (isLoading) {
        return <SpinnerLoading />;
    }
    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className="todoList">
            <h2>TODO</h2>

            <div className="input-group">
                <input className="form-control" placeholder="내용을 입력하세요." data-testid="new-todo-input" onChange={(event) => setTodo(event.target.value)} />
                <button className="btn btn-outline-secondary" data-testid="new-todo-add-button" type="submit" onClick={createTodo}>추가</button>
            </div>
            <div>
                <hr />
                <ul className="list-group list-group-flush" >
                    {data.map((item) => (
                        <li className="list-group-item" key={item.id}>
                            <div className="form-check" >
                                <input
                                    id={item.id}
                                    className="form-check-input mt-2"
                                    type="checkbox"
                                    checked={item.isCompleted}
                                    onChange={(event) => {
                                        handleIsComplete(event, item.id, item.todo);
                                    }} />
                                <Todo todo={item}/>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}