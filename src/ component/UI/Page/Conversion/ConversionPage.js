import React, {useEffect} from 'react';
import classNames from "classnames";
import UserInfomation from "../../login_info/User_Infomation";
import Login_modal_Button from "../../button/login_modal_btn/Login_modal_Button";
import './ConversionPage.scss';
import Input from '@mui/joy/Input';



const ConversionPage = ({isForward, LoginHandler, loginInfo, LoginCheck, logoutHandler}) => {

    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    // const[token, setToken] = useState(getCurrentLoginUser().token);
    const renderUserInfo = () => {
        if (loginInfo !== undefined) {
            return <UserInfomation loginInfo={loginInfo} logoutHandler={logoutHandler}/>;
        } else {
            return <Login_modal_Button isLogin={LoginHandler} LoginCheck={LoginCheck}/>;
        }
    }

    useEffect(() => {
        LoginCheck();
    }, []);


//{`mainContainer ${setAnimation}`}
    return (
        <div className='conversion-page'>
            <form className="form">
                <Input className="youtube-link"
                       placeholder="유튜브 링크를 적어주세요!!"
                       size="lg"
                       color="danger"
                       variant="outlined"
                       sx={{color:'error.main'}}/>
            </form>
        </div>
    );
};

export default ConversionPage;