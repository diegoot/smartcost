import React from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

import ContractsForm from './contractsForm'

const ContractsModal = props => {
  console.log('Modal props ', props)
  return (
    <Modal
      title="Contrato"
      visible={props.isVisible}
      onCancel={props.onCancel}
      footer={null}>
      <ContractsForm onSave={props.onSave} />
    </Modal>
  )
}

ContractsModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default ContractsModal
