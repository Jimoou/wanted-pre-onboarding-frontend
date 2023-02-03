import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../../Config';

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pwError, setPwError] = useState('');
    const [mailError, setMailError] = useState('');


    //비밀번호 조건
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (event.target.value.length < 8) {
            setPwError('비밀번호는 8자리 이상이어야 합니다.');
        } else {
            setPwError('');
        }
    };

    //이메일 조건
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if (!event.target.value.includes('@')) {
            setMailError('이메일은 "@"를 포함하고 있어야 합니다.');
        } else {
            setMailError('');
        }
    }


    const navigate = useNavigate();
    const submit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API.signup}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                alert("회원가입 되었습니다.");
                navigate("/signin")
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            alert("회원가입에 실패했습니다.");
            console.error(error);
        }
    };



    return (
        <div className='formContainer'>
            <form>
                <div className="row mb-3">
                    <h4 className="header">회원가입</h4>
                    <hr />
                    <label htmlFor="inputEmail3" className="col-sm-4 col-form-label"><EmailIcon className="Icon" />이메일</label>
                    <div className="col-sm-8">
                        <input
                            type="email"
                            className="form-control"
                            email={email}
                            data-testid="email-input"
                            placeholder="이메일을 입력하세요."
                            onChange={handleEmailChange}></input>
                        {mailError && <p style={{ color: 'red' }}>{mailError}</p>}
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-4 col-form-label"><KeyIcon className="Icon" />패스워드</label>
                    <div className="col-sm-8">
                        <input
                            type="password"
                            className="form-control"
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
                    className="btn btn-primary"
                    data-testid="signin-button"
                    onClick={submit}
                    >회원가입</button>
            </form>
        </div>
    )
}
