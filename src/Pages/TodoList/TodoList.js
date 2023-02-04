import { useEffect, useState } from "react";
import API from '../../Config';
import { SpinnerLoading } from "../../Util/SpinnerLoading";
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
            if (!response.ok) {
                throw new Error("오류오류");
            }
            alert("추가되었습니다.");
            setSubmitting(submitting ? false : true);

        } catch (error) {
            alert("실패했습니다.")
            setHttpError(error.message);
        }
    };

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
        <div>
            <form onSubmit={createTodo}>
                <input data-testid="new-todo-input" onChange={(e) => setTodo(e.target.value)} />
                <button data-testid="new-todo-add-button" type="submit">추가</button>
            </form>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <label>
                            {item.isCompleted ? <input type="checkbox" checked /> : <input type="checkbox" />}
                            <span>{item.todo}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}