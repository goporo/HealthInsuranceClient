import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AuthWrapper from './AuthWrapper'
import authService from '../../services/authService'
import { ROUTES } from '../../routes/RouterConfig'
import api from '../../config/axios'
import UiSpinning from 'components/common/ui/UiSpinning/UiSpinning'
import ButtonZoomShadow from 'components/animation/ButtonZoomShadow'

const Login = () => {
  const [onLoadingSubmit, setOnLoadingSubmit] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const isAccessTokenValid = (accessToken) => {
  //   if (!accessToken) return false
  //   const decoded = jwtDecode(accessToken)
  //   const currentTime = Date.now() / 1000
  //   const expiresTime = decoded?.exp || 0

  //   if (expiresTime < currentTime) {
  //     return true
  //   }

  //   return true
  // }

  const onSubmit = async (data) => {
    try {
      if (onLoadingSubmit) return
      setOnLoadingSubmit(true)

      // Send login request to your backend API
      const response = await api.post('/authentication/login/customer', data)

      if (response.status !== 200) {
        throw new Error('Login failed')
      }

      const user = response.data
      const token = user.token

      if (token) {
        authService.handleLogin(dispatch, user, token)
        navigate(ROUTES.Home)
        setOnLoadingSubmit(false)
      }
    } catch (error) {
      console.error('Login failed', error)
      // Check if the error is from the backend response
      if (error.data) {
        // Update the state with the error message from the backend
        setErrorMessage(error.data || 'Login failed')
      } else {
        setErrorMessage('Invalid Username or Password!')
      }

    } finally {
      // This block will be executed whether an error occurred or not
      // will add error display later
      setOnLoadingSubmit(false)
    }
  }

  return (
    <AuthWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-xl w-[500px] h-[370px] border-gray-500 border-[1px] border-opacity-10"
      >
        <h2 className="text-2xl mb-6 font-semibold text-gray-800">Login</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register('username', {
              required: 'Username is required',
            })}
            className={`w-full px-3 py-2 border rounded ${errors.username ? 'border-red-500' : ''
              }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: 'Password is required',
            })}
            className={`w-full px-3 py-2 border rounded ${errors.password ? 'border-red-500' : ''
              }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex justify-center flex-row">
          {onLoadingSubmit ? (
            <UiSpinning></UiSpinning>
          ) : (
            <ButtonZoomShadow
              type="submit"
              className='mt-4'
            >
              Login
            </ButtonZoomShadow>
          )}
        </div>
        {errorMessage && (
          <div className="mt-4 text-red-500 text-sm text-center">{errorMessage}</div>
        )}
      </form>
    </AuthWrapper>
  )
}

export default Login
