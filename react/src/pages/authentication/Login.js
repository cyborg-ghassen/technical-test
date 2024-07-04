import {Fragment, useState} from "react";
import {Button, Form} from "react-bootstrap";
import CSRFToken from "../../helpers/CSRFToken";
import {api} from "../../utils/api";
import {useAppContext} from "../../helpers/utils";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import FormError from "../errors/FormError";

const Login = () => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const { setConfig } = useAppContext();
    const navigate = useNavigate()

    const handleFieldChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        api
            .post('/account/login/', formData)
            .then(res => {
                setConfig('isAuthenticated', true);
                toast.success(`Successfully logged in as ${res?.data?.user?.username}`, {
                    theme: 'colored'
                });
                navigate("/")
            })
            .catch(err => {
                setErrors(err?.response?.data);
                toast.error(`An error has occurred ${err.toString()}`, {
                    theme: 'colored'
                });
            });
    };


    return (
        <Fragment>
            <h5 className={"text-center"}>Login</h5>
            <Form onSubmit={handleSubmit}>
                <CSRFToken/>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleFieldChange}
                        value={formData.username}
                    />
                    <FormError error={errors?.username} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleFieldChange}
                        value={formData.password}
                    />
                    <FormError error={errors?.password} />
                </Form.Group>
                <Button type="submit" color="primary" className="mt-3 w-100">
                    Login
                </Button>
                <FormError error={errors?.non_field_errors} />
            </Form>
        </Fragment>
    )
}

export default Login