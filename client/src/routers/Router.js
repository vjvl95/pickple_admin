import React, { Fragment } from "react";
import Header from "../components/header/Header"
import { Switch, Route, BrowserRouter} from "react-router-dom";
import Navigator from '../components/layout/Navigator'
import { ThemeProvider } from "@material-ui/styles";
import theme from "../components/layout/theme"
import mainpage from "../pages/mainpage"
import tagpage from "../pages/tagpage"
import reportpage from "../pages/reportpage"
import userpage from "../pages/userpage"
import applypage from "../pages/applypage"
import profilepage from "../pages/profilepage"
import boardpage from "../pages/boardpage"
import userdetailpage from "../components/user/UserDetail"
import loginpage from "../pages/loginpage"
import PrivateRoute from "./privateRouter"
import boarddetailpage from "../components/board/boarddetail"
import profiledetailpage from "../components/profile/profiledetail"
const Router = () => {
    return (
      <Fragment>

          <ThemeProvider theme={theme}>
          <Header/>                              
          <Navigator  className="Navigator" PaperProps={{ style: { width: "20%"} }}/>
          <Route path="/" exact component={loginpage}/>                              
                            <Switch>
                                        <PrivateRoute path="/admin" exact component={mainpage} /> 
                                        <PrivateRoute path="/admin/tag" exact component={tagpage} />
                                        <PrivateRoute path="/admin/report" exact component={reportpage} />   
                                        <PrivateRoute path="/admin/user" exact component={userpage} />     
                                        <PrivateRoute path='/admin/user/:id' exact component={userdetailpage} />
     
                                        <PrivateRoute path="/admin/profile" exact component={profilepage} />     
                                        <PrivateRoute path="/admin/profile/:id" exact component={profiledetailpage} />

                                        <PrivateRoute path="/admin/apply" exact component={applypage} />
                                        <PrivateRoute path="/admin/board" exact component={boardpage} />
                                        <PrivateRoute path="/admin/board/:id" exact component={boarddetailpage} />
                            </Switch>
          </ThemeProvider>
    </Fragment>
    );
  }

  export default Router;