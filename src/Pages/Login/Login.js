import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../../Config';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pwError, setPwError] = useState('');
    const [mailError, setMailError] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (event.target.value.length < 8) {
            setPwError('비밀번호는 8자리 이상이어야 합니다.');
        } else {
            setPwError('');
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if (!event.target.value.includes('@')) {
            setMailError('이메일은 "@"를 포함하고 있어야 합니다.');
        } else {
            setMailError('');
        }
    }

    const navigate = useNavigate();
    const submit = (event) => {
        event.preventDefault();
        fetch(`${API.signin}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                email: email,
                password: password,
            },
        }).then((response) => {
            alert("로그인되었습니다.");
            navigate('/todo');
        }).catch((error) => {
            console.log(error);
        })
    };

    return (
        <div className='container'>
            <form>
                <div class="row mb-3">
                    <h4 className="header">로그인</h4>
                    <hr />
                    <label for="inputEmail3" class="col-sm-4 col-form-label"><EmailIcon className="Icon" />이메일</label>
                    <div class="col-sm-8">
                        <input
                            type="email"
                            class="form-control"
                            email={email}
                            data-testid="email-input"
                            placeholder="이메일을 입력하세요."
                            onChange={handleEmailChange}></input>
                        {mailError && <p style={{ color: 'red' }}>{mailError}</p>}
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="inputPassword3" class="col-sm-4 col-form-label"><KeyIcon className="Icon" />패스워드</label>
                    <div class="col-sm-8">
                        <input
                            type="password"
                            class="form-control"
                            value={password}
                            data-testid="password-input"
                            placeholder="패스워드를 입력하세요."
                            onChange={handlePasswordChange}>
                        </input>
                        {pwError && <p style={{ color: 'red' }}>{pwError}</p>}
                    </div>
                </div>
                <button
                    disabled={pwError || mailError || (email === "") || (password === "")}
                    type="submit" class="btn btn-primary"
                    data-testid="signin-button"
                    onClick={submit}>로그인</button>
            </form>
        </div>
    )
}
