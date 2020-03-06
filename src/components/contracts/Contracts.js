import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, message } from 'antd'

import contractsActions from '../../redux/actions/contracts'
import ContractsModal from './contractsModal'
import ContractsTable from './contractsTable'

import styles from './Contracts.module.scss'

export default () => {
  const dispatch = useDispatch()
  const { contracts, contractors, provinces } = useSelector(state => ({
    contracts: state.contracts,
    contractors: state.contractors,
    provinces: state.provinces
  }))
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    dispatch(contractsActions.getContracts())
  }, [dispatch])
  useEffect(() => {
    if (contracts.error) {
      message.error(contracts.error, () => {
        dispatch(contractsActions.clearError())
      })
    }
  }, [dispatch, contracts.error])

  return (
    <div className={styles.container}>
      <ContractsModal
        isVisible={contracts.selected !== null || showModal}
        onCancel={() => {
          setShowModal(false)
          dispatch(contractsActions.clearContractBeingEdited())
        }}
        onSave={() => {
          setShowModal(false)
          dispatch(contractsActions.clearContractBeingEdited())
        }}
      />
      <div className={styles.addForm}>
        <Button
          type="primary"
          onClick={() => {
            setShowModal(true)
          }}>
          Agregar contrato
        </Button>
      </div>
      <ContractsTable
        contracts={contracts.items}
        contractors={contractors.items}
        provinces={provinces.items}
        onEdit={row => {
          dispatch(contractsActions.setContractBeingEdited(row))
        }}
        onDelete={id => {
          dispatch(contractsActions.deleteContract(id))
        }}
      />
    </div>
  )
}
