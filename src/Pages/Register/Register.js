import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';

export const Register = () => {
    return (
        <div className='container'>
            <form>
                <div class="row mb-3">
                    <h4 className="header">회원가입</h4>
                    <hr/>
                    <label for="inputEmail3" class="col-sm-4 col-form-label"><EmailIcon className="Icon"/>이메일</label>
                    <div class="col-sm-8">
                        <input type="email" class="form-control" data-testid="email-input" placeholder="패스워드를 입력하세요."></input>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="inputPassword3" class="col-sm-4 col-form-label"><KeyIcon className="Icon"/>패스워드</label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" data-testid="password-input" placeholder="이메일을 입력하세요."></input>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" data-testid="signup-button">회원가입</button>
            </form>
        </div>
    )
}
