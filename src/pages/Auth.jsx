import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";

export default function Auth() {
    const [registeration, setRegisteration] = useState(false);
    const { signUp, signIn } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmitSignIn = (data) => {
        const result = signIn(data.email, data.password);
        if (result.success) {
            setError(null);
            setSuccess(result.message);
            navigate("/");
            return result;
        }

        setSuccess(null);
        setError(result.error);
        return result;
    }

    const onSubmitSignUp = (data) => {
        const result = signUp(data.name, data.email, data.password);

        if (result.success) {
            setError(null);
            setSuccess(result.message);
            navigate("/");
            return result;
        }

        setSuccess(null);
        setError(result.error);
        return result;
    }
    const styleLoginCard = {
        marginTop: "6%",
        borderRadius: "10px",
        padding: "10px",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
    }
    return (
        <>
            <div className="container">
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {success && <div className="alert alert-success mt-3">{success}</div>}
                {!registeration ?
                    < div className="row  justify-content-center align-items-center">
                        <div className="col-md-6" style={styleLoginCard}>
                            <p className="text-center">Login</p>
                            <form onSubmit={handleSubmit(onSubmitSignIn)}>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="email" name="email" id="email" className="form-control" {...register("email",
                                        {
                                            required: "Email is required",
                                        }
                                    )} />
                                    <label className="form-label" htmlFor="email">Email address</label><br />
                                    <span className="text-danger">{errors.email && errors.email?.message}</span>

                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="password" name="password" id="password" className="form-control" {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: "Password must be at most 12 characters"
                                        }
                                    })} />
                                    <label className="form-label" htmlFor="password">Password</label><br />
                                    <span className="text-danger">{errors.password && errors.password?.message}</span>
                                </div>


                                <div className="text-center">
                                    <p>Not a member? <a href="#!" onClick={() => setRegisteration(true)}>Register</a></p>
                                </div>
                                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4 float-end">Sign in</button>
                            </form>

                        </div>
                    </div>
                    :
                    < div className="row  justify-content-center align-items-center">
                        <div className="col-md-6" style={styleLoginCard}>
                            <p className="text-center">Regisration</p>
                            <form onSubmit={handleSubmit(onSubmitSignUp)}>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label" htmlFor="name">Name</label>
                                    <input type="text" name="name" id="name" className="form-control" {...register("name", {
                                        required: "Name is required"
                                    })} />
                                    <span className="text-danger">{errors.name && errors.name?.message}</span>

                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form2Example1">Email address</label>
                                    <input type="email" name="email" id="form2Example1" className="form-control" {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                    })} />
                                    <span className="text-center">{errors.email && errors.email?.message}</span>
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form2Example2">Password</label>
                                    <input type="password" name="password" id="form2Example2" className="form-control" {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: "Password must be at most 12 characters"
                                        }
                                    })} />
                                    <span className="text-center">{errors.password && errors.password?.message}</span>
                                </div>


                                <div className="text-center">
                                    <p>Already a member? <a href="#!" onClick={() => setRegisteration(false)}>Login</a></p>
                                </div>
                                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4 float-end">Sign up</button>
                            </form>

                        </div>
                    </div>
                }

            </div >
        </>
    )
}