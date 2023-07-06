import { LoginContext, LoginProvider } from '@/contexts/LoginContext';
import { withProviders } from '@/utils/withProviders';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import Textinput from '../ui/Textinput';

const LoginForm = () => {

    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const {
        action: { loginUser },
        data: { isLoading },
    } = useContext(LoginContext);

    const submitLogin = (e: FormEvent) => {
        e.preventDefault();
        loginUser(form)
    }

    return (
        <form className="space-y-4 text-left" onSubmit={submitLogin}>
            <Textinput
                name="username"
                label="username"
                type="text"
                placeholder="Enter username"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setForm({
                        ...form,
                        username: e.currentTarget.value
                    })
                }}
            />
            <Textinput
                name="password"
                label="password"
                type="password"
                placeholder="Enter password"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setForm({
                        ...form,
                        password: e.currentTarget.value
                    })
                }}
            />
            <button className="btn btn-dark block w-full text-center" disabled={isLoading}>Sign in</button>
        </form>
    )
}

export default withProviders(LoginProvider)(LoginForm);