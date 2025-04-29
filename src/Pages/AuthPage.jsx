import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

export default function AuthPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [authToken, setAuthToken] = useLocalStorage('authToken', '')
    const BASE_URL = "https://ppp-taskmanager.replit.app";

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const response = await axios.post(`${BASE_URL}/login`, { username, password })
            if (response.data && response.data.auth === true && response.data.token) {
                setAuthToken(response.data.token)
                alert('login successful:', response.data)
            }
            else {
                setError('Invalid login response from server')
            }

        }
        catch (err) {
            setError(err, 'Inavlid username or password,try again')
        }
        finally {
            setLoading(false)
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const response = await axios.post(`${BASE_URL}/signup`, { username, password })
            alert('successful sign up:', response.data)
            setIsSignup(false)
        }
        catch (err) {
            setError(err.message || 'sign up failed, try again')

        }
        finally {
            setLoading(false)
        }


    }

    const handleSubmit = (e) => {
        if (isSignup) {
            return handleSignUp(e)
        }
        return handleLogin(e)
    }
    useEffect(() => {
        if (authToken) {
            navigate('/home')
        }
    }, [authToken, navigate])



    return (
        <>
            <Container style={{ maxWidth: '400px' }} className="mt-5">
                <h2 className="text-center mb-4">{isSignup ? "Sign Up" : "Login"} to TaskSphere</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit} >
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={username} autoComplete="email" type="email" onChange={(e) => setUsername(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Button type="submit" className="mt-3" disabled={loading}>
                        {loading ? 'processing...' : isSignup ? "Sign Up" : "Login"}
                    </Button>
                    <Button variant="link" onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? "Already have an account? Login" : "Need an account? Sign Up"}
                    </Button>
                </Form>
            </Container>
            <footer className="w-full text-center py-4">
                <p className="text-center text-gray-500 text-sm">
                    TaskSphere © {new Date().getFullYear()} - Manage your tasks with ease
                </p>
            </footer>
        </>

    )
}
