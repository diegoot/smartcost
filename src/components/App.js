import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Contracts from './contracts'
import contractorsActions from '../redux/actions/contractors'
import provincesActions from '../redux/actions/provinces'

import 'antd/dist/antd.css'

export default () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(contractorsActions.getContractors())
    dispatch(provincesActions.getProvinces())
  }, [dispatch])

  return (
    <div>
      <Contracts />
    </div>
  )
}
