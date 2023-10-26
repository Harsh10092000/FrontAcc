import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div>
      <div className="bg-blue-400 h-screen w-screen">
    <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0 h-[500px]" >
        <div className="hidden md:block md:w-1/2 rounded-l-lg cover"></div>
            <div className="flex flex-col w-full md:w-1/2 p-4">
                <div className="flex flex-col flex-1 justify-center mb-8">
                    <h1 className="text-4xl text-center text-sky-800">Register</h1>
                    <div className="w-full mt-4">
                        <div className="form-horizontal w-3/4 mx-auto">
                        <div className="flex flex-col mt-4">
                                <input type="text" className="flex-grow h-8 px-2 border rounded border-grey-400" name="email" placeholder="Name"/>
                            </div>
                            <div className="flex flex-col mt-4">
                                <input type="text" className="flex-grow h-8 px-2 border rounded border-grey-400" name="email" placeholder="Phone Number"/>
                            </div>
                            <div className="flex flex-col mt-4">
                                <input type="text" className="flex-grow h-8 px-2 border rounded border-grey-400" name="email" placeholder="Email"/>
                            </div>
                            <div className="flex flex-col mt-4">
                                <input id="password" type="password" className="flex-grow h-8 px-2 rounded border border-grey-400" name="password" required placeholder="Password"/>
                            </div>
                            <div className="flex flex-col mt-8">
                                <Link to="/login">                                
                                <button  className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded w-full">
                                    Sign Up
                                </button>
                                </Link>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                        </div>
                        <div className='text-center mt-4'>
                          <Link to="/login">
                          <p className='no-underline hover:underline text-blue-dark text-xs'>
                            Already have an account ?
                          </p>
                          </Link>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</div>
    </div>
  )
}

export default Register