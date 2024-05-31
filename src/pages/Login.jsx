import { useState } from "react"
// import find from "lodash/find"
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const users = [
        [
            {
                "id": "9b24d054-e4d4-4bc4-b84e-fdf14e40aaa1",
                "name": "Rogelio Satterfield",
                "email": "Lottie18@yahoo.com",
                "password": "OAOwy2ACGTn3sC6",
                "role": "admin"
            },
            {
                "id": "018928d1-2bcb-437a-b7a9-efaf334a49ac",
                "name": "Chester Hudson",
                "email": "Reymundo74@hotmail.com",
                "password": "Ua5XjgIi1f7ixaV",
                "role": "guest"
            },
            {
                "id": "053e332b-0ca5-4afc-8ece-3f1840bffa5d",
                "name": "Brittany Muller",
                "email": "Cristina93@yahoo.com",
                "password": "sboE8EUWa_70Ry2",
                "role": "admin"
            },
            {
                "id": "9e4a5a3c-2986-4caa-94b6-905a4df15336",
                "name": "Garrett Weissnat",
                "email": "Rowland_Bergnaum82@gmail.com",
                "password": "Hs6su_WbiCdm0P_",
                "role": "guest"
            }
        ]
    ]
    console.log(users);
    const signIn = () => {
        navigate("/");
        // console.log(email);
        // let user = find(users, function (obj) {
        //     console.log(obj.email);
        //     if (obj.email === email) {
        //         return true;
        //     }
        // });
        // console.log(user);
    }

    return (
        <div className="flex align-items-center justify-content-center h-screen">
            <div className="surface-card p-4 shadow-2 border-round w-25rem m-auto">
                <div className="text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Login to Dashboard</div>
                    <span className="text-600 font-medium line-height-3">Enter email and password</span>
                </div>

                <div>
                    <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                    <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                    <InputText id="password" type="password" placeholder="Password" className="w-full mb-3" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <a className="font-medium no-underline text-blue-500 text-right cursor-pointer">Forgot your password?</a>

                    <Button label="Sign In" icon="pi pi-user" className="w-full mt-4 mb-5" onClick={signIn} />

                    <div className="text-center">
                        <span className="text-600 font-medium line-height-3">Don't have an account? </span>
                        <a className="font-medium no-underline mb-5 text-blue-500 cursor-pointer">Create today!</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login