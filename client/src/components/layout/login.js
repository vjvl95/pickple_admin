import React,{ useState} from "react";
import { useDispatch } from "react-redux";
import {} from "reactstrap"
import { LOGIN_REQUEST } from "../../actions/loginAction";
import "./login.css"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const Login = () =>{
    const [id,setId]=  useState("") 
    const [password,setPassword]=  useState("") 
    const dispatch=useDispatch()

    const onSubmit = (id,password) => {

        try{
        dispatch({
            type:LOGIN_REQUEST,
            payload:{idString:id}
        })
    }
    catch(e){
    }
    }
    return(
        <div className="LoginWapper">

                <div className="loginform">
                    <h1 className="LoginTitle">PICKPLE 관리자 로그인</h1>
                    <div className="ID">
                    <TextField  id="standard-basic" label="ID" onChange={(e) => {setId(e.target.value)}} value={id} />
                    </div>
                    <div className="password">
                    <TextField  id="standard-basic" label="PassWord" onChange={(e) => {setPassword(e.target.value)}} value={password} />
                    </div>
                    <div className="submit"> 
                     <Button  variant="contained" color="primary" onClick={()=>onSubmit(id,password)}>
                     로그인
                    </Button>
                    </div>
                </div>
        </div>
    )
};


export default Login;