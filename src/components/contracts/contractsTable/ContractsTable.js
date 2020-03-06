import React from 'react'
import moment from 'moment'
import { Table, Popconfirm, Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

import { CONTRACT_STATUS_LABELS, DATE_FORMAT } from '../../../constants'

const ContractsTable = props => {
  const { contracts, contractors, provinces, onEdit, onDelete } = props

  const columns = [
    {
      title: 'Número',
      dataIndex: 'nroContrato',
      fixed: 'left',
      width: 100
    },
    {
      title: 'Inicio',
      dataIndex: 'fechaInicio',
      render: text => {
        return moment(text).format(DATE_FORMAT)
      },
      width: 100
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      render: text => {
        return CONTRACT_STATUS_LABELS[text]
      },
      width: 100
    },
    {
      title: 'Monto base',
      dataIndex: 'montoBase',
      width: 100
    },
    {
      title: 'Contratista',
      dataIndex: 'contratistaId',
      render: text => {
        const contractor = contractors.find(c => c.id === text)
        return (contractor && contractor.razonSocial) || text
      },
      ellipsis: true,
      width: 100
    },
    {
      title: 'Provincia',
      dataIndex: 'provinciaId',
      render: text => {
        const province = provinces.find(c => c.id === text)
        return (province && province.nombre) || text
      },
      width: 100
    },
    {
      render: (text, record) => {
        return contracts.length >= 1 ? (
          <div>
            <Popconfirm
              title="¿Seguro de borrar?"
              onConfirm={() => onDelete(record.id)}>
              <Button shape="circle" icon={<DeleteOutlined />} />
            </Popconfirm>
            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </div>
        ) : null
      },
      width: 100
    }
  ]

  return (
    <Table
      dataSource={contracts}
      columns={columns}
      rowKey="id"
      pagination={{ size: 'small' }}
    />
  )
}

ContractsTable.propTypes = {
  contracts: PropTypes.array.isRequired,
  contractors: PropTypes.array.isRequired,
  provinces: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default ContractsTable
