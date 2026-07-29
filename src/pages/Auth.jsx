import { Link } from "react-router-dom";
import {useState } from "react";
export default function Auth() {
    const [registeration, setRegisteration] = useState(false)
    return (
        <>
            <p className="text-center">Login</p>
            <div className="container">
                {!registeration ?
                    < div className="row  justify-content-center align-items-center">
                        <div className="col-md-6" >
                            <form>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="email" id="form2Example1" className="form-control" />
                                    <label className="form-label" htmlFor="form2Example1">Email address</label>
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="password" id="form2Example2" className="form-control" />
                                    <label className="form-label" htmlFor="form2Example2">Password</label>
                                </div>


                                <div className="text-center">
                                    <p>Not a member? <a href="#!" onClick={() => setRegisteration(true)}>Register</a></p>
                                </div>
                                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Sign in</button>
                            </form>

                        </div>
                    </div>
                    :
                    <p>Regisration</p>
                }

            </div >
        </>
    )
}