import axios from 'axios';
import { useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const onSubmit = async (event) => {
        event.preventDefault();
        try {

            const resposne = await axios.post('/api/users/signup', {
                email, password
            })
            console.log(resposne)
        } catch (err) {
            setErrors(err.response.data.errors)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input value={email} className="form-control" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input value={password} type="password" className="form-control" onChange={e => setPassword(e.target.value)} />
            </div>
            {errors.length>0 && <div className='alert alert-danger'>
                <h4>Oooops.....</h4>
                <ul className='my-0'>

                    {errors.map(err => <li key={err.message}>{err.message}</li>)}
                </ul>
            </div>}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    )
}

export default Signup;