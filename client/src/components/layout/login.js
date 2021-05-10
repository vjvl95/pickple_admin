import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "reactstrap"
import { LOGIN_REQUEST } from "../../actions/loginAction";
import "./login.css"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const Login = () =>{
    const [form,setValues]= useState({id:"",password:""})
    const [id,setId]=  useState("") 
    const [password,setPassword]=  useState("") 
    const dispatch=useDispatch()

    const {errorMsg} =useSelector((state)=>state.login)
    
    const onChange= (e) =>{
        setValues({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = (id,password) => {
        console.log(id)
        console.log(password)

        try{
        dispatch({
            type:LOGIN_REQUEST,
            payload:{idString:id}
        })
    }
    catch(e){
        console.log(e.response)
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