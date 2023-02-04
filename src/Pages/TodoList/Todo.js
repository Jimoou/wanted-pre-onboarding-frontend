import { useState } from "react";
import API from '../../Config';

export const Todo = (props) => {
    const accessToken = localStorage.getItem("JWT");
    const [modify, setModify] = useState(true);
    const [text, setText] = useState(props.todo.todo);

    const updateTodo = async () => {
        try {
            const response = await fetch(`${API.updateTodo}/${props.todo.id}`, {
                method:'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({
                    todo: text,
                    isCompleted: props.todo.isCompleted,
                })
            });
            alert("수정되었습니다.");
            props.fetchTodo();
            setModify(true);
            
        } catch (error){
            alert("수정에 실패했습니다.")
            console.log(error.message);
        }
    };
    const deleteTodo = async () => {
        try {
            const response = await fetch(`${API.deleteTodo}/${props.todo.id}`, {
                method:'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            alert("삭제되었습니다.");
            props.fetchTodo();

        } catch(error) {
            alert("삭제되지 않았습니다.")
            console.log(error.message);
        }
    }

    return (
        <>
            {modify ?
                (<>
                    <div className="input-group">
                        <div className="form-control2">{props.todo.todo}</div>
                        
                        <button className="btn btn-outline-secondary" data-testid="modify-button"onClick={() => { setModify(false); }}>수정</button>
                        <button className="btn btn-outline-danger" data-testid="delete-button"onClick={deleteTodo}>삭제</button>
                    </div>

                </>)
                :
                (<>
                    <div className="input-group mb-3">
                        <input
                            id={props.todo.id}
                            className="form-control"
                            placeholder={text}
                            value={text}
                            onChange={(event) => {
                                setText(event.target.value);
                            }}
                            data-testid="modify-input" />
                        <button className="btn btn-outline-success" data-testid="submit-button" onClick={updateTodo}>제출</button>
                        <button className="btn btn-outline-secondary" data-testid="cancel-button" onClick={() => { setText(props.todo.todo); setModify(true) }}>취소</button>
                    </div>
                </>)
            }
        </>
    );
}