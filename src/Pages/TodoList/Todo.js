import { useState } from "react";

export const Todo = (props) => {
    const [modify, setModify] = useState(true);
    const [text, setText] = useState(props.todo.todo);

    return (
        <>
            {modify ?
                (<>
                    <div className="input-group">
                        <div className="form-control2">{props.todo.todo}</div>
                        <button className="btn btn-outline-secondary" onClick={() => { setModify(false); }}>수정</button>
                        <button className="btn btn-outline-danger">삭제</button>
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
                        <button className="btn btn-outline-success" data-testid="submit-button">제출</button>
                        <button className="btn btn-outline-secondary" data-testid="cancel-button" onClick={() => { setText(props.todo.todo); setModify(true) }}>취소</button>
                    </div>
                </>)
            }
        </>
    );
}